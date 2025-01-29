package com.masqani.masqani.listing.model.dto.sub;


import com.masqani.masqani.listing.model.dto.vo.BathsVO;
import com.masqani.masqani.listing.model.dto.vo.BedroomsVO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

public record ListingInfoDTO(
        @NotNull @Valid BedroomsVO bedrooms,
        @NotNull @Valid BathsVO baths) {
}
