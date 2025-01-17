package com.masqani.masqani.listing.service.dto.sub;


import com.masqani.masqani.listing.service.dto.vo.DescriptionVO;
import com.masqani.masqani.listing.service.dto.vo.TitleVO;
import jakarta.validation.constraints.NotNull;

public record DescriptionDTO(
        @NotNull TitleVO title,
        @NotNull DescriptionVO description
        ) {
}
