package com.masqani.masqani.listing.application.dto;

import com.masqani.masqani.listing.application.dto.sub.PictureDTO;
import com.masqani.masqani.listing.application.dto.vo.PriceVO;
import com.masqani.masqani.listing.domain.enums.PropertyCategory;

import java.util.UUID;

public record DisplayCardListingDTO(PriceVO price,
                                    String location,
                                    PictureDTO cover,
                                    PropertyCategory propertyCategory,
                                    UUID publicId) {
}
