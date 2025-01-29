package com.masqani.masqani.listing.service;

import com.masqani.masqani.exceptions.StorageException;
import com.masqani.masqani.listing.model.dto.*;
import com.masqani.masqani.listing.model.dto.sub.PictureDTO;
import com.masqani.masqani.listing.model.Listing;
import com.masqani.masqani.listing.mapper.ListingMapper;
import com.masqani.masqani.listing.repository.IdmKeyRepository;
import com.masqani.masqani.listing.repository.ListingRepository;
import com.masqani.masqani.user.dto.ReadUserDTO;
import com.masqani.masqani.user.service.AuthService;
import com.masqani.masqani.user.service.UserService;
import com.masqani.masqani.util.shared.State;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class LandlordService {

    private final ListingRepository listingRepository;
    private final IdmKeyRepository idmKeyRepository;
    private final ListingMapper listingMapper;
    private final UserService userService;
    private final AuthService authService;
    private final PictureService pictureService;
    private final AwsStorageService awsStorageService;

    @Transactional
    public CreatedListingDTO create(SaveListingDTO saveListingDTO, List<PictureDTO> pictures) {
        try {
            // Create and save the listing
            Listing newListing = listingMapper.saveListingDTOToListing(saveListingDTO);
            ReadUserDTO userConnected = userService.getAuthenticatedUser();
            newListing.setLandlordPublicId(userConnected.getPublicId());
            newListing.setPublicId(UUID.randomUUID());
            Listing savedListing = listingRepository.saveAndFlush(newListing);


            // Save the pictures
            pictureService.saveAll(pictures, savedListing);

            authService.promoteToLandlord(userConnected.getEmail());

//            IdempotencyRecord record = new IdempotencyRecord();
//            record.setKey(idempotencyKey);
//            record.setListing(savedListing);
//            idmKeyRepository.save(record);

            return listingMapper.listingToCreatedListingDTO(savedListing);
        } catch (Exception e) {
            log.error("Error creating listing", e);
            throw new RuntimeException("Failed to create listing", e);
        }
    }

    public Optional<CreatedListingDTO> findByIdempotencyKey(String key) {
        return idmKeyRepository.findByKey(key)
                .map(record -> listingMapper.listingToCreatedListingDTO(record.getListing()));
    }

    @Transactional(readOnly = true)
    public List<DisplayCardListingDTO> getAllProperties(ReadUserDTO landlord) {
        List<Listing> properties = listingRepository.findAllByLandlordPublicIdFetchCoverPicture(landlord.getPublicId());
        log.info("---db res properties------{}",properties);
        return listingMapper.listingToDisplayCardListingDTOs(properties);
    }

    @Transactional
    public State<UUID, String> delete(UUID publicId, ReadUserDTO landlord) {
        log.info("reached delete transaction int with pub id---{}", publicId);
        Optional<Listing> listing = listingRepository.findByPublicId(publicId);
        if (listing.isEmpty()) {
            log.info("no listing found");
            return State.<UUID, String>builder().forError("Listing not found.");
        }
        log.info("listing landlord id ---- {} [[[[[[[[VS]]]]]]] the logged in landlord pub id---{}",listing.get().getLandlordPublicId(), landlord.getPublicId());
        if(!String.valueOf(listing.get().getLandlordPublicId()).equals(String.valueOf(landlord.getPublicId()))){
            log.info("user cannot delete");
            return State.<UUID, String>builder().forUnauthorized("User not authorized to delete this listing");
        }
        log.info("deleting listing with pub id------- {}",listing.get().getPublicId());
        try{
            log.info("inside aws delete pictures try");
                List<ListingPictureDTO> listingPictures = pictureService.getListingPicturesByListing(listing.get());
                listingPictures.forEach(picture->{
                    awsStorageService.deleteFile(picture.getFileName());
                });

        }catch (Exception e){
                log.info("Error fetching listing pictures for deletion {}", e.getMessage());
        }

        long deletedSuccessfully = listingRepository.deleteByPublicIdAndLandlordPublicId(publicId, landlord.getPublicId());
        log.info("deleted response from repo ??? ------{}", deletedSuccessfully);
        if (deletedSuccessfully > 0) {
            return State.<UUID, String>builder().forSuccess(publicId);
        } else {
            return State.<UUID, String>builder().forUnauthorized("User not authorized to delete this listing");
        }
    }

    public Optional<ListingCreateBookingDTO> getByListingPublicId(UUID publicId) {
        return listingRepository.findByPublicId(publicId).map(listingMapper::mapListingToListingCreateBookingDTO);
    }

    public List<DisplayCardListingDTO> getCardDisplayByListingPublicId(List<UUID> allListingPublicIDs) {
        return listingRepository.findAllByPublicIdIn(allListingPublicIDs)
                .stream()
                .map(listingMapper::listingToDisplayCardListingDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public Optional<DisplayCardListingDTO> getByPublicIdAndLandlordPublicId(UUID listingPublicId, UUID landlordPublicId) {
        return listingRepository.findOneByPublicIdAndLandlordPublicId(listingPublicId, landlordPublicId)
                .map(listingMapper::listingToDisplayCardListingDTO);
    }

    @Transactional
    public List<PictureDTO> uploadFilesAndCreatePictureDTOs(List<MultipartFile> files) {
        List<PictureDTO> pictures = new ArrayList<>();

        for (int i = 0; i < files.size(); i++) {
            MultipartFile file = files.get(i);
            try {
                ImageUploadResponseDto uploadResponse = awsStorageService.uploadFile(file);

                PictureDTO pictureDTO = new PictureDTO(
                        uploadResponse.getFileUrl(),
                        uploadResponse.getFileName(),
                        uploadResponse.getContentType(),
                        i == 0  // First image is cover
                );

                pictures.add(pictureDTO);
            } catch (Exception e) {
                // If upload fails, clean up any previously uploaded files
                pictures.forEach(pic -> {
                    try {
                        awsStorageService.deleteFile(pic.fileName());
                    } catch (Exception ex) {
                        log.error("Error cleaning up file: {}", pic.fileName(), ex);
                    }
                });
                throw new StorageException("Failed to upload file: " + file.getOriginalFilename(), e);
            }
        }

        return pictures;
    }
}
