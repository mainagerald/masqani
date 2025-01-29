package com.masqani.masqani.listing.model.dto;


import com.masqani.masqani.listing.model.dto.vo.PriceVO;

import java.util.UUID;

public record ListingCreateBookingDTO(
        UUID listingPublicId, PriceVO price) {
}
