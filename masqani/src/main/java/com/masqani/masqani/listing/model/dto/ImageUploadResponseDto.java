package com.masqani.masqani.listing.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ImageUploadResponseDto {
    private String fileUrl;
    private String fileName;
    private String contentType;
    private long size;
    private boolean error;
    private String errorMessage;

//    public ImageUploadResponseDto(){}
//    // for successful upload
//    public ImageUploadResponseDto(String fileUrl, String fileName) {
//        this.fileUrl = fileUrl;
//        this.fileName = fileName;
//        this.error = false;
//    }
//
//    // for error case
//    public ImageUploadResponseDto(String errorMessage) {
//        this.error = true;
//        this.errorMessage = errorMessage;
//    }
}