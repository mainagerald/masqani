//package com.masqani.masqani.service;
//
//import com.masqani.masqani.dto.listingInfoDto.ListingPictureDto;
//import com.masqani.masqani.model.Listing;
//import com.masqani.masqani.model.ListingPicture;
//import com.masqani.masqani.repository.ListingPictureRepository;
//import com.masqani.masqani.util.mappers.ListingPictureMapper;
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.Set;
//
//@Service
//@RequiredArgsConstructor
//public class ListingPictureService {
//    private final ListingPictureRepository listingPictureRepository;
//    @Autowired
//    private ListingPictureMapper listingPictureMapper;
//
//    public List<ListingPictureDto> saveAll(List<ListingPictureDto> listingPictures, Listing listing){
//        Set<ListingPicture> pictures = listingPictureMapper.listingPictureDtoToListingPicture(listingPictures);
//        boolean isFirst= true;
//        for (ListingPicture picture: pictures){
//            picture.setCover(isFirst);
//            picture.setListing(listing);
//            isFirst=false;
//        }
//        listingPictureRepository.saveAll(pictures);
//        return listingPictureMapper.listingPictureToListingPictureDto(pictures.stream().toList());
//    }
//}
