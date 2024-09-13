package com.masqani.masqani.dto.listingInfoDto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Arrays;
import java.util.Objects;

@Data
public class RentalPictureDto {
    @NotNull byte[] file;
    @NotNull String fileContentType;
    @NotNull boolean isCover;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RentalPictureDto that = (RentalPictureDto) o;
        return isCover == that.isCover && Objects.deepEquals(file, that.file) && Objects.equals(fileContentType, that.fileContentType);
    }

    @Override
    public int hashCode() {
        return Objects.hash(Arrays.hashCode(file), fileContentType, isCover);
    }
}
