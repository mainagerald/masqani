//package com.masqani.masqani.controller;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.masqani.masqani.dto.CreatedListingResponseDto;
//import com.masqani.masqani.dto.SaveListingDto;
//import com.masqani.masqani.dto.listingInfoDto.ListingPictureDto;
//import com.masqani.masqani.exceptions.UserException;
//import com.masqani.masqani.service.LandlordService;
//import com.masqani.masqani.service.UserService;
//import jakarta.validation.ConstraintViolation;
//import jakarta.validation.Validator;
//import lombok.RequiredArgsConstructor;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ProblemDetail;
//import org.springframework.http.ResponseEntity;
//import org.springframework.validation.annotation.Validated;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.multipart.MultipartFile;
//import org.springframework.web.multipart.MultipartHttpServletRequest;
//
//import java.io.IOException;
//import java.util.List;
//import java.util.Set;
//import java.util.function.Function;
//import java.util.stream.Collectors;
//
//@RestController
//@RequiredArgsConstructor
//@RequestMapping("api/landlord-listing")
//public class LandlordController {
//    private static final Logger log = LoggerFactory.getLogger(LandlordController.class);
//    private final LandlordService landlordService;
//    private final UserService userService;
//    @Autowired
//    private Validator validator;
//    private final ObjectMapper objectMapper = new ObjectMapper();
//
//    @PostMapping("create-listing")
//    public ResponseEntity<CreatedListingResponseDto> create(
//            MultipartHttpServletRequest request, @RequestParam(name = "dto") String saveListingDtoString
//    ) throws IOException {
//
//        // Map files to DTOs
//        List<ListingPictureDto> pictures = request.getFileMap().values()
//                .stream().map(mapMultipartFileToListingPictureDto()).toList();
//
//        // Deserialize the DTO
//        SaveListingDto saveListingDto = objectMapper.readValue(saveListingDtoString, SaveListingDto.class);
//        saveListingDto.setPictures(pictures);
//
//        // Validate and log violations
//        Set<ConstraintViolation<SaveListingDto>> constraintViolations = validator.validate(saveListingDto);
//        if (!constraintViolations.isEmpty()) {
//            String violations = constraintViolations
//                    .stream()
//                    .map(violation -> violation.getPropertyPath() + " " + violation.getMessage())
//                    .collect(Collectors.joining(", "));
//            log.warn("Validation violations: {}", violations);
//
//            ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, violations);
//            return ResponseEntity.of(problemDetail).build();
//        }
//        return ResponseEntity.ok(landlordService.create(saveListingDto));
//    }
//
//
//    private static Function<MultipartFile, ListingPictureDto> mapMultipartFileToListingPictureDto() {
//        return multipartFile -> {
//            try{
//                return new ListingPictureDto(multipartFile.getBytes(), multipartFile.getContentType(), false);
//            }catch (IOException ioException){
//                throw new UserException(String.format("Cannot parse multipart file: %s", multipartFile.getName()));
//            }
//        };
//    }
//}
