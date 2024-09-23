package com.masqani.masqani.service;

import com.masqani.masqani.dto.CreatedListingResponseDto;
import com.masqani.masqani.dto.SaveListingDto;
import com.masqani.masqani.dto.UserDto;
import com.masqani.masqani.model.Listing;
import com.masqani.masqani.repository.ListingRepository;
import com.masqani.masqani.util.mappers.ListingMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LandlordService {
    private final ListingRepository listingRepository;
    private final ListingMapper listingMapper;
    private final Auth0Service auth0Service;
    private final UserService userService;
    private final ListingPictureService listingPictureService;

    public CreatedListingResponseDto create (SaveListingDto saveListingDto){
        Listing newListing = listingMapper.saveListingDtoToListing(saveListingDto);
        UserDto currentUser = userService.getAuthenticatedUserFromSecurityContext();
        newListing.setLandlordPublicId(currentUser.getPublicId());
        Listing savedListing = listingRepository.saveAndFlush(newListing);
        listingPictureService.saveAll(saveListingDto.getPictures(), savedListing);
        auth0Service.addLandlordRoleToUser(currentUser);
        return listingMapper.listingToCreatedResponseDto(savedListing);
    }
}