package com.masqani.masqani.listing.application.dto;

import com.masqani.masqani.listing.application.dto.sub.DescriptionDTO;
import com.masqani.masqani.listing.application.dto.sub.LandlordListingDTO;
import com.masqani.masqani.listing.application.dto.sub.ListingInfoDTO;
import com.masqani.masqani.listing.application.dto.sub.PictureDTO;
import com.masqani.masqani.listing.application.dto.vo.PriceVO;
import com.masqani.masqani.listing.domain.enums.PropertyCategory;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class DisplayListingDTO {

    private DescriptionDTO description;
    private List<PictureDTO> pictures;
    private ListingInfoDTO infos;
    private PriceVO price;
    private PropertyCategory category;
    private String location;
    private LandlordListingDTO landlord;

}
