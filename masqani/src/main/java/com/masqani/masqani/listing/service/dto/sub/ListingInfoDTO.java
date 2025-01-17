package com.masqani.masqani.listing.service.dto.sub;


import com.masqani.masqani.listing.service.dto.vo.BathsVO;
import com.masqani.masqani.listing.service.dto.vo.BedroomsVO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

public record ListingInfoDTO(
        @NotNull @Valid BedroomsVO bedrooms,
        @NotNull @Valid BathsVO baths) {
}
