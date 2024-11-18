package com.masqani.masqani.listing.application.dto.sub;


import com.masqani.masqani.listing.application.dto.vo.DescriptionVO;
import com.masqani.masqani.listing.application.dto.vo.TitleVO;
import jakarta.validation.constraints.NotNull;

public record DescriptionDTO(
        @NotNull TitleVO title,
        @NotNull DescriptionVO description
        ) {
}
