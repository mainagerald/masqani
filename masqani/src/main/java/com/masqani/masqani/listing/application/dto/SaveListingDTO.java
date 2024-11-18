package com.masqani.masqani.listing.application.dto;


import com.masqani.masqani.listing.application.dto.sub.DescriptionDTO;
import com.masqani.masqani.listing.application.dto.sub.ListingInfoDTO;
import com.masqani.masqani.listing.application.dto.sub.PictureDTO;
import com.masqani.masqani.listing.application.dto.vo.PriceVO;
import com.masqani.masqani.listing.domain.BookingCategory;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SaveListingDTO {

    @NotNull
    BookingCategory category;

    @NotNull String location;

    @NotNull @Valid
    ListingInfoDTO infos;

    @NotNull @Valid
    DescriptionDTO description;

    @NotNull @Valid
    PriceVO price;

    @NotNull
    List<PictureDTO> pictures;

}
