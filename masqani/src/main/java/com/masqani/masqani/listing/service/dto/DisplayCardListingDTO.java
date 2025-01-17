package com.masqani.masqani.listing.service.dto;

import com.masqani.masqani.listing.service.dto.sub.PictureDTO;
import com.masqani.masqani.listing.service.dto.vo.PriceVO;
import com.masqani.masqani.listing.model.enums.PropertyCategory;

import java.time.Instant;
import java.util.UUID;

public record DisplayCardListingDTO(PriceVO price,
                                    String location,
                                    PictureDTO cover,
                                    String title,
                                    PropertyCategory propertyCategory,
                                    UUID publicId,
                                    Instant createdAt) {
}
