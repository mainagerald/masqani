package com.masqani.masqani.listing.application.dto;


import com.masqani.masqani.listing.application.dto.sub.DescriptionDTO;
import com.masqani.masqani.listing.application.dto.sub.ListingInfoDTO;
import com.masqani.masqani.listing.application.dto.sub.PictureDTO;
import com.masqani.masqani.listing.application.dto.vo.PriceVO;
import com.masqani.masqani.listing.model.enums.PropertyCategory;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

//@Getter
//@Setter
//public class SaveListingDTO {
//    @NotNull
//    PropertyCategory category;
//    @NotNull String location;
//    @NotNull @Valid
//    ListingInfoDTO infos;
//    @NotNull @Valid
//    DescriptionDTO description;
//    @NotNull @Valid
//    PriceVO price;
//    @NotNull
//    List<PictureDTO> pictures;
//    CoordinatesDTO coordinates;
//}
@Data
public class SaveListingDTO {
    @NotNull PropertyCategory category;
    @NotNull String location;
    @NotNull @Valid ListingInfoDTO infos;
    @NotNull @Valid DescriptionDTO description;
    @NotNull @Valid PriceVO price;
    CoordinatesDTO coordinates;
}
