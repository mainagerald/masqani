package com.masqani.masqani.listing.application.dto.sub;


import com.masqani.masqani.listing.application.dto.vo.BathsVO;
import com.masqani.masqani.listing.application.dto.vo.BedroomsVO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

public record ListingInfoDTO(
        @NotNull @Valid BedroomsVO bedrooms,
        @NotNull @Valid BathsVO baths) {
}
