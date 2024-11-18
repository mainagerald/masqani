package com.masqani.masqani.listing.application.dto;


import com.masqani.masqani.listing.application.dto.vo.PriceVO;

import java.util.UUID;

public record ListingCreateBookingDTO(
        UUID listingPublicId, PriceVO price) {
}
