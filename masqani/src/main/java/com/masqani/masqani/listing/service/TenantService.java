package com.masqani.masqani.listing.service;


import com.masqani.masqani.booking.application.BookingService;
import com.masqani.masqani.listing.model.dto.DisplayCardListingDTO;
import com.masqani.masqani.listing.model.dto.DisplayListingDTO;
import com.masqani.masqani.listing.model.dto.SearchDTO;
import com.masqani.masqani.listing.model.dto.sub.LandlordListingDTO;
import com.masqani.masqani.listing.model.enums.PropertyCategory;
import com.masqani.masqani.listing.model.Listing;
import com.masqani.masqani.listing.mapper.ListingMapper;
import com.masqani.masqani.listing.repository.ListingRepository;
import com.masqani.masqani.user.dto.ReadUserDTO;
import com.masqani.masqani.user.service.UserService;
import com.masqani.masqani.util.shared.State;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TenantService {

    private final ListingRepository listingRepository;

    private final ListingMapper listingMapper;

    private final UserService userService;
    private final BookingService bookingService;


    public TenantService(ListingRepository listingRepository, ListingMapper listingMapper, UserService userService, BookingService bookingService) {
        this.listingRepository = listingRepository;
        this.listingMapper = listingMapper;
        this.userService = userService;
        this.bookingService = bookingService;
    }

    public Page<DisplayCardListingDTO> getAllByCategory(Pageable pageable, PropertyCategory category) {
        Page<Listing> allOrPropertyCategory;
        if (category == PropertyCategory.ALL) {
            allOrPropertyCategory = listingRepository.findAllWithCoverOnly(pageable);
        } else {
            allOrPropertyCategory = listingRepository.findAllByPropertyCategoryWithCoverOnly(pageable, category);
        }

        return allOrPropertyCategory.map(listingMapper::listingToDisplayCardListingDTO);
    }

    @Transactional(readOnly = true)
    public State<DisplayListingDTO, String> getOne(UUID publicId) {
        Optional<Listing> listingByPublicIdOpt = listingRepository.findByPublicId(publicId);

        if (listingByPublicIdOpt.isEmpty()) {
            return State.<DisplayListingDTO, String>builder()
                    .forError(String.format("Listing doesn't exist for publicId: %s", publicId));
        }

        DisplayListingDTO displayListingDTO = listingMapper.listingToDisplayListingDTO(listingByPublicIdOpt.get());

        ReadUserDTO readUserDTO = userService.getByPublicId(String.valueOf(listingByPublicIdOpt.get().getLandlordPublicId()));
        LandlordListingDTO landlordListingDTO = new LandlordListingDTO(readUserDTO.getEmail());
        displayListingDTO.setLandlord(landlordListingDTO);

        return State.<DisplayListingDTO, String>builder().forSuccess(displayListingDTO);
    }


    @Transactional(readOnly = true)
    public Page<DisplayCardListingDTO> search(Pageable pageable, SearchDTO newSearch) {

        Page<Listing> allMatchedListings = listingRepository.findAllByLocationAndBathroomsAndBedrooms(pageable, newSearch.location(),
                newSearch.infos().baths().value(),
                newSearch.infos().bedrooms().value());

        List<UUID> listingUUIDs = allMatchedListings.stream().map(Listing::getPublicId).toList();

        List<UUID> bookingUUIDs = bookingService.getBookingMatchByListingIdsAndBookedDate(listingUUIDs, newSearch.dates());

        List<DisplayCardListingDTO> listingsNotBooked = allMatchedListings.stream().filter(listing -> !bookingUUIDs.contains(listing.getPublicId()))
                .map(listingMapper::listingToDisplayCardListingDTO)
                .toList();

        return new PageImpl<>(listingsNotBooked, pageable, listingsNotBooked.size());
    }
}
