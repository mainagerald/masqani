package com.masqani.masqani.listing.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.masqani.masqani.exceptions.StorageException;
import com.masqani.masqani.listing.application.AwsStorageService;
import com.masqani.masqani.listing.application.dto.ImageUploadResponseDto;
import com.masqani.masqani.user.dto.ReadUserDTO;
import com.masqani.masqani.exceptions.UserException;
import com.masqani.masqani.listing.application.LandlordService;
import com.masqani.masqani.listing.application.dto.CreatedListingDTO;
import com.masqani.masqani.listing.application.dto.DisplayCardListingDTO;
import com.masqani.masqani.listing.application.dto.SaveListingDTO;
import com.masqani.masqani.listing.application.dto.sub.PictureDTO;

import com.masqani.masqani.user.exceptions.UnauthorizedException;
import com.masqani.masqani.user.service.UserService;
import com.masqani.masqani.util.shared.State;
import com.masqani.masqani.util.shared.StatusNotification;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ValidationException;
import jakarta.validation.Validator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.DigestUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.IOException;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/api/landlord-listing")
@RequiredArgsConstructor
public class LandlordResource {

    private final LandlordService landlordService;
    private final AwsStorageService awsStorageService;
    private final Validator validator;
    private final UserService userService;
    private final ObjectMapper objectMapper;

    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<CreatedListingDTO> create(
            @RequestPart(value = "files") List<MultipartFile> files,
            @RequestPart(value = "dto") String saveListingDTOString
    ) {
        try {
            // First validate the files
            validateFiles(files);

            // Parse and validate the listing DTO
            SaveListingDTO saveListingDTO = parseAndValidateListingDTO(saveListingDTOString);
            String idempotencyKey = generateIdempotencyKey(saveListingDTO);

            // Check for existing listing
            Optional<CreatedListingDTO> existingListing = landlordService.findByIdempotencyKey(idempotencyKey);
            if (existingListing.isPresent()) {
                return ResponseEntity.ok(existingListing.get());
            }

            // Upload files and create listing
            List<PictureDTO> pictures = landlordService.uploadFilesAndCreatePictureDTOs(files);

            CreatedListingDTO response = landlordService.create(saveListingDTO, pictures, idempotencyKey);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (UnauthorizedException e) {
            log.error("Unauthorized access attempt", e);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch (ValidationException e) {
            log.error("Validation error", e);
            return ResponseEntity.badRequest().build();
        } catch (StorageException e) {
            log.error("Storage error", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        } catch (Exception e) {
            log.error("Unexpected error during listing creation", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping(value = "/get-all")
    @PreAuthorize("hasAnyRole('ROLE_LANDLORD')")
    public ResponseEntity<List<DisplayCardListingDTO>> getAll() {
        ReadUserDTO connectedUser = userService.getAuthenticatedUser();
        List<DisplayCardListingDTO> allProperties = landlordService.getAllProperties(connectedUser);
        return ResponseEntity.ok(allProperties);
    }

    @DeleteMapping("/delete")
    @PreAuthorize("hasAnyRole('ROLE_LANDLORD')")
    public ResponseEntity<UUID> delete(@RequestParam UUID publicId) {
        ReadUserDTO connectedUser = userService.getAuthenticatedUser();
        State<UUID, String> deleteState = landlordService.delete(publicId, connectedUser);

        return switch (deleteState.getStatus()) {
            case OK -> ResponseEntity.ok(deleteState.getValue());
            case UNAUTHORIZED -> ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            default -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        };
    }

    @DeleteMapping("/delete-image")
    @PreAuthorize("hasAnyRole('ROLE_LANDLORD')")
    public ResponseEntity<Void> deleteImage(@RequestParam("fileName") String fileName) {
        try {
            awsStorageService.deleteFile(fileName);
            return ResponseEntity.ok().build();
        } catch (StorageException e) {
            log.error("Error deleting file from S3", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    private void validateFiles(List<MultipartFile> files) throws ValidationException {
        if (files == null || files.isEmpty()) {
            throw new ValidationException("At least one image file is required");
        }

        for (MultipartFile file : files) {
            if (file.isEmpty()) {
                throw new ValidationException("Empty file detected");
            }
            if (!isValidImageContentType(file.getContentType())) {
                throw new ValidationException("Invalid file type: " + file.getContentType());
            }
        }
    }

    private boolean isValidImageContentType(String contentType) {
        return contentType != null && (
                contentType.equals(MediaType.IMAGE_JPEG_VALUE) ||
                        contentType.equals(MediaType.IMAGE_PNG_VALUE) ||
                        contentType.equals("image/jpg")
        );
    }

    private SaveListingDTO parseAndValidateListingDTO(String saveListingDTOString)
            throws IOException, ValidationException {
        SaveListingDTO saveListingDTO = objectMapper.readValue(saveListingDTOString, SaveListingDTO.class);

        Set<ConstraintViolation<SaveListingDTO>> violations = validator.validate(saveListingDTO);
        if (!violations.isEmpty()) {
            String violationsJoined = violations.stream()
                    .map(violation -> violation.getPropertyPath() + " " + violation.getMessage())
                    .collect(Collectors.joining("; "));
            throw new ValidationException(violationsJoined);
        }

        return saveListingDTO;
    }


    private String generateIdempotencyKey(SaveListingDTO dto) {
        return UUID.randomUUID().toString();
    }
}