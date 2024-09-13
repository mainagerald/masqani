package com.masqani.masqani.valueObjects;

import jakarta.validation.constraints.NotNull;

public record BathroomsVo(@NotNull(message = "Specify number of bathrooms") int value) {
}
