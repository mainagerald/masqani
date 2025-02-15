package com.masqani.masqani.listing.model.dto.vo;

import jakarta.validation.constraints.NotNull;

public record TitleVO(
        @NotNull(message = "Title value must be present")
        String value)
{}
