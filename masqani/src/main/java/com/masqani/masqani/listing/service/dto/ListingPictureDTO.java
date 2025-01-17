package com.masqani.masqani.listing.service.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ListingPictureDTO {
    private Long id;
    private String fileUrl;
    private String fileName;
    private String fileContentType;
    private boolean isCover;
}
