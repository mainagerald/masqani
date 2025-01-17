package com.masqani.masqani.listing.service;

import com.masqani.masqani.listing.service.dto.ListingPictureDTO;
import com.masqani.masqani.listing.service.dto.sub.PictureDTO;
import com.masqani.masqani.listing.model.Listing;
import com.masqani.masqani.listing.model.ListingPicture;
import com.masqani.masqani.listing.mapper.ListingPictureMapper;
import com.masqani.masqani.listing.repository.ListingPictureRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class PictureService {
    private final ListingPictureRepository listingPictureRepository;
    private final ListingPictureMapper listingPictureMapper;

    @Transactional
    public List<PictureDTO> saveAll(List<PictureDTO> pictureDTOs, Listing listing) {
        List<ListingPicture> pictures = new ArrayList<>();

        for (int i = 0; i < pictureDTOs.size(); i++) {
            PictureDTO pictureDTO = pictureDTOs.get(i);

            ListingPicture listingPicture = listingPictureMapper.pictureDTOToListingPicture(pictureDTO);
            listingPicture.setListing(listing);

            listingPicture.setCover(i == 0);

            ListingPicture saved = listingPictureRepository.save(listingPicture);
            pictures.add(saved);
        }

        return pictures.stream()
                .map(listingPictureMapper::convertToPictureDTO)
                .toList();
    }

    @Transactional
    public void deletePicture(Long pictureId) {
        listingPictureRepository.findById(pictureId).ifPresent(picture -> {
            try {
                listingPictureRepository.delete(picture);
            } catch (Exception e) {
                log.error("Error deleting picture with id: {}", pictureId, e);
                throw new RuntimeException("Failed to delete picture", e);
            }
        });
    }

    @Transactional(readOnly = true)
    public List<ListingPictureDTO> getListingPictures(Long listingId) {
        return listingPictureRepository.findByListingId(listingId)
                .stream()
                .map(picture -> new ListingPictureDTO(
                        picture.getId(),
                        picture.getFileUrl(),
                        picture.getFileName(),
                        picture.getFileContentType(),
                        picture.isCover()))
                .toList();
    }

    @Transactional(readOnly = true)
    public List<ListingPictureDTO> getListingPicturesByListing(Listing listing) {
        return listingPictureRepository.findByListing(listing)
                .stream()
                .map(picture -> new ListingPictureDTO(
                        picture.getId(),
                        picture.getFileUrl(),
                        picture.getFileName(),
                        picture.getFileContentType(),
                        picture.isCover()))
                .toList();
    }
}