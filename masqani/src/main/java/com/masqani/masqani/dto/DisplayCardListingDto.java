package com.masqani.masqani.dto;

import com.masqani.masqani.dto.listingInfoDto.ListingPictureDto;
import com.masqani.masqani.valueObjects.PriceVo;

import java.util.UUID;

public record DisplayCardListingDTO(PriceVo price,
                                    String location,
                                    ListingPictureDto cover,
                                    BookingCategory bookingCategory,
                                    UUID publicId) {
}