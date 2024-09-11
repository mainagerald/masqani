package com.masqani.masqani.util.mappers;

import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {ListingPictureMapper.class})
public interface ListingMapper {
}
