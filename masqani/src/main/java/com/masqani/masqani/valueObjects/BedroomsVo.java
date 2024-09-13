package com.masqani.masqani.valueObjects;

import jakarta.validation.constraints.NotNull;

public record BedroomsVo(@NotNull(message = "Specify number of bedrooms") int value) {
}
