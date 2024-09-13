package com.masqani.masqani.valueObjects;

import jakarta.validation.constraints.NotNull;

public record DescriptionVo(@NotNull(message = "Provide description") String value) {
}
