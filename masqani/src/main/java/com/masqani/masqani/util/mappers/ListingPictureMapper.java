package com.masqani.masqani.util.mappers;

import com.masqani.masqani.dto.listingInfoDto.ListingPictureDto;
import com.masqani.masqani.model.ListingPicture;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;
import java.util.Set;

@Mapper(componentModel = "spring")
public interface ListingPictureMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "listing", ignore = true)
    Set<ListingPicture> listingPictureDtoToListingPicture(List<ListingPictureDto> listingPictureDto);
    List<ListingPictureDto> listingPictureToListingPictureDto(List<ListingPicture> listingPictures);
    @Mapping(target = "isCover", source = "cover")
    ListingPictureDto convertToPictureDto(ListingPicture listingPicture);

    @Named("extract-cover")
    default ListingPictureDto extractCover(Set<ListingPicture> pictures){
        return pictures.stream().findFirst().map(this::convertToPictureDto).orElseThrow();
    }
}