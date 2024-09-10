package com.masqani.masqani.resource;

import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {ListingPictureMapper.class})
public interface ListingMapper {
}
