package com.masqani.masqani.listing.service.dto;


import com.masqani.masqani.listing.service.dto.vo.PriceVO;

import java.util.UUID;

public record ListingCreateBookingDTO(
        UUID listingPublicId, PriceVO price) {
}
