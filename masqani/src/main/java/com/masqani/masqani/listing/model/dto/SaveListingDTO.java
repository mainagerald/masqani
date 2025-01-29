package com.masqani.masqani.listing.model.dto;


import com.masqani.masqani.listing.model.dto.sub.DescriptionDTO;
import com.masqani.masqani.listing.model.dto.sub.ListingInfoDTO;
import com.masqani.masqani.listing.model.dto.vo.PriceVO;
import com.masqani.masqani.listing.model.enums.PropertyCategory;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

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
    BigDecimal rentAmount;
}
