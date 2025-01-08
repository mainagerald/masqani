package com.masqani.masqani.listing.application.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ImageUploadResponseDto {
    private String imageUrl;
    private String fileName;
    private String contentType;
    private long size;
    private boolean error;
    private String errorMessage;

    // for successful upload
    public ImageUploadResponseDto(String imageUrl, String fileName) {
        this.imageUrl = imageUrl;
        this.fileName = fileName;
        this.error = false;
    }

    // for error case
    public ImageUploadResponseDto(String errorMessage) {
        this.error = true;
        this.errorMessage = errorMessage;
    }
}