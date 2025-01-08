package com.masqani.masqani.listing.controller;

import com.backblaze.b2.client.exceptions.B2Exception;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.masqani.masqani.listing.application.BackBlazeService;
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

    private final BackBlazeService b2Service;

    private final Validator validator;

    private final UserService userService;

    private ObjectMapper objectMapper = new ObjectMapper();


    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<CreatedListingDTO> create(
            MultipartHttpServletRequest request,
            @RequestPart(name = "dto") String saveListingDTOString
    ) {
        try {
            SaveListingDTO saveListingDTO = parseAndValidateRequest(request, saveListingDTOString);
            String idempotencyKey = generateIdempotencyKey(saveListingDTO);

            Optional<CreatedListingDTO> existingListing = landlordService.findByIdempotencyKey(idempotencyKey);
            if (existingListing.isPresent()) {
                return ResponseEntity.ok(existingListing.get());
            }

            CreatedListingDTO response = landlordService.create(saveListingDTO, idempotencyKey);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (UnauthorizedException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(null);
        } catch (ValidationException e) {
            ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(
                    HttpStatus.BAD_REQUEST,
                    e.getMessage()
            );
            return ResponseEntity.badRequest()
                    .body(null);
        } catch (IOException e) {
            log.error("Error processing request", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

    private SaveListingDTO parseAndValidateRequest(
            MultipartHttpServletRequest request,
            String saveListingDTOString
    ) throws IOException, ValidationException {

        List<PictureDTO> pictures = request.getFileMap()
                .values()
                .stream()
                .map(mapMultipartFileToPictureDTO())
                .toList();

        SaveListingDTO saveListingDTO = objectMapper.readValue(saveListingDTOString, SaveListingDTO.class);
        saveListingDTO.setPictures(pictures);

        Set<ConstraintViolation<SaveListingDTO>> violations = validator.validate(saveListingDTO);
        if (!violations.isEmpty()) {
            String violationsJoined = violations.stream()
                    .map(violation -> violation.getPropertyPath() + " " + violation.getMessage())
                    .collect(Collectors.joining("; "));
            throw new ValidationException(violationsJoined);
        }
        return saveListingDTO;
    }

    private static Function<MultipartFile, PictureDTO> mapMultipartFileToPictureDTO() {
        return multipartFile -> {
            try {
                return new PictureDTO(multipartFile.getBytes(), multipartFile.getContentType(), false);
            } catch (IOException ioe) {
                throw new UserException(String.format("Cannot parse multipart file: %s", multipartFile.getOriginalFilename()));
            }
        };
    }

    @GetMapping(value = "/get-all")
    @PreAuthorize("hasAnyRole('ROLE_LANDLORD')")
    public ResponseEntity<List<DisplayCardListingDTO>> getAll() {
        ReadUserDTO connectedUser = userService.getAuthenticatedUser();
        log.info("connected user-----> {}", connectedUser);
        List<DisplayCardListingDTO> allProperties = landlordService.getAllProperties(connectedUser);
        return ResponseEntity.ok(allProperties);
    }

    @DeleteMapping("/delete")
    @PreAuthorize("hasAnyRole('ROLE_LANDLORD')")
    public ResponseEntity<UUID> delete(@RequestParam UUID publicId) {
        ReadUserDTO connectedUser = userService.getAuthenticatedUser();
        State<UUID, String> deleteState = landlordService.delete(publicId, connectedUser);
        if (deleteState.getStatus().equals(StatusNotification.OK)) {
            return ResponseEntity.ok(deleteState.getValue());
        } else if (deleteState.getStatus().equals(StatusNotification.UNAUTHORIZED)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    @PostMapping("/upload")
    @PreAuthorize("hasAnyRole('ROLE_LANDLORD')")
    public ResponseEntity<ImageUploadResponseDto> uploadImage(
            @RequestParam("file") MultipartFile file) {
        try {
            ImageUploadResponseDto response = b2Service.uploadFile(file);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error uploading file to B2", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/delete-image")
    @PreAuthorize("hasAnyRole('ROLE_LANDLORD')")
    public ResponseEntity<Void> deleteImage(@RequestParam("key") String key) {
        try {
            b2Service.deleteFile(key);
            return ResponseEntity.ok().build();
        } catch (B2Exception e) {
            log.error("Error deleting file from B2", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    private String generateIdempotencyKey(SaveListingDTO dto) {
        return UUID.randomUUID().toString();
    }
}
