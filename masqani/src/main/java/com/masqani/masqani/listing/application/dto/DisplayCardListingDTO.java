package com.masqani.masqani.listing.application.dto;

import com.masqani.masqani.listing.application.dto.sub.PictureDTO;
import com.masqani.masqani.listing.application.dto.vo.PriceVO;
import com.masqani.masqani.listing.domain.BookingCategory;

import java.util.UUID;

public record DisplayCardListingDTO(PriceVO price,
                                    String location,
                                    PictureDTO cover,
                                    BookingCategory bookingCategory,
                                    UUID publicId) {
}
