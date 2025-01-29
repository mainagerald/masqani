package com.masqani.masqani.listing.model.dto;

import com.masqani.masqani.listing.model.dto.sub.DescriptionDTO;
import com.masqani.masqani.listing.model.dto.sub.LandlordListingDTO;
import com.masqani.masqani.listing.model.dto.sub.ListingInfoDTO;
import com.masqani.masqani.listing.model.dto.sub.PictureDTO;
import com.masqani.masqani.listing.model.dto.vo.PriceVO;
import com.masqani.masqani.listing.model.enums.PropertyCategory;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
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
    private Instant createdAt;

}
