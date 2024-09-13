package com.masqani.masqani.util.mappers;

import com.masqani.masqani.dto.CreatedListingResponseDto;
import com.masqani.masqani.dto.SaveListingDto;
import com.masqani.masqani.model.Listing;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {ListingPictureMapper.class})
public interface ListingMapper {
    @Mapping(target = "landlordPublicId", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "publicId", ignore = true)
    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "listingPictures", ignore = true)
    @Mapping(target = "title", source = "description.title.value")
    @Mapping(target = "description", source = "description.description.value")
    @Mapping(target = "bedrooms", source = "info.bedrooms.value")
    @Mapping(target = "bathrooms", source = "info.bathrooms.value")
    @Mapping(target = "category", source = "category")
    @Mapping(target = "price", source = "price.value")
    Listing saveListingDtoToListing(SaveListingDto saveListingDto);

    CreatedListingResponseDto listingToCreatedResponseDto(Listing listing);
}
