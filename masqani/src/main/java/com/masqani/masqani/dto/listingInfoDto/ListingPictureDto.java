//package com.masqani.masqani.dto.listingInfoDto;
//
//import jakarta.validation.constraints.NotNull;
//import lombok.Data;
//
//import java.util.Arrays;
//import java.util.Objects;
//
//@Data
//public class ListingPictureDto {
//    @NotNull byte[] file;
//    @NotNull String fileContentType;
//    @NotNull boolean isCover;
//
//    public ListingPictureDto(byte[] file, String contentType, boolean isCover) {
//        this.file=file;
//        this.fileContentType=contentType;
//        this.isCover=isCover;
//    }
//
//    @Override
//    public boolean equals(Object o) {
//        if (this == o) return true;
//        if (o == null || getClass() != o.getClass()) return false;
//        ListingPictureDto that = (ListingPictureDto) o;
//        return isCover == that.isCover && Objects.deepEquals(file, that.file) && Objects.equals(fileContentType, that.fileContentType);
//    }
//
//    @Override
//    public int hashCode() {
//        return Objects.hash(Arrays.hashCode(file), fileContentType, isCover);
//    }
//}
