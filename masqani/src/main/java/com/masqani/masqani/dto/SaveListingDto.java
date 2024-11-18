//package com.masqani.masqani.dto;
//
//import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
//import com.masqani.masqani.dto.listingInfoDto.ListingPictureDto;
//import com.masqani.masqani.dto.listingInfoDto.RentalDescriptionDto;
//import com.masqani.masqani.dto.listingInfoDto.RentalInfoDto;
//import com.masqani.masqani.enums.RentalCategory;
//import com.masqani.masqani.valueObjects.PriceVo;
//import jakarta.validation.Valid;
//import jakarta.validation.constraints.NotNull;
//import lombok.Data;
//
//import javax.xml.transform.Source;
//import java.util.List;
//
//@Data
//@JsonIgnoreProperties(ignoreUnknown = true)
//public class SaveListingDto {
//    @NotNull
//    RentalCategory category;
//    @NotNull
//    String location;
//    @NotNull @Valid
//    RentalInfoDto info;
//    @NotNull @Valid
//    RentalDescriptionDto description;
//    @NotNull @Valid
//    PriceVo price;
//    @NotNull
//    List<ListingPictureDto> pictures;
//}
