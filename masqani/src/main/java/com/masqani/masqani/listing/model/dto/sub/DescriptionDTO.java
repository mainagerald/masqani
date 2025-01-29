package com.masqani.masqani.listing.model.dto.sub;


import com.masqani.masqani.listing.model.dto.vo.DescriptionVO;
import com.masqani.masqani.listing.model.dto.vo.TitleVO;
import jakarta.validation.constraints.NotNull;

public record DescriptionDTO(
        @NotNull TitleVO title,
        @NotNull DescriptionVO description
        ) {
}
