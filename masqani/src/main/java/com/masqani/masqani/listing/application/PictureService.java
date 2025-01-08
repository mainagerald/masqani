package com.masqani.masqani.listing.application;


import com.masqani.masqani.listing.application.dto.sub.PictureDTO;
import com.masqani.masqani.listing.model.Listing;
import com.masqani.masqani.listing.model.ListingPicture;
import com.masqani.masqani.listing.mapper.ListingPictureMapper;
import com.masqani.masqani.listing.repository.ListingPictureRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class PictureService {

    private final ListingPictureRepository listingPictureRepository;

    private final ListingPictureMapper listingPictureMapper;

    public PictureService(ListingPictureRepository listingPictureRepository, ListingPictureMapper listingPictureMapper) {
        this.listingPictureRepository = listingPictureRepository;
        this.listingPictureMapper = listingPictureMapper;
    }

    public List<PictureDTO> saveAll(List<PictureDTO> pictures, Listing listing) {
        Set<ListingPicture> listingPictures = listingPictureMapper.pictureDTOsToListingPictures(pictures);

        boolean isFirst = true;

        for (ListingPicture listingPicture : listingPictures) {
            listingPicture.setCover(isFirst);
            listingPicture.setListing(listing);
            isFirst = false;
        }

        listingPictureRepository.saveAll(listingPictures);
        return listingPictureMapper.listingPictureToPictureDTO(listingPictures.stream().toList());
    }
}
//
//public class ListingPictureService {
//    private final ListingPictureRepository listingPictureRepository;
//    private final BackBlazeService backBlazeService;
//
//    public ListingPicture saveListingPicture(ImageUploadResponseDTO uploadResponse, Listing listing, boolean isCover) {
//        ListingPicture picture = new ListingPicture();
//        picture.setListing(listing);
//        picture.setFileName(uploadResponse.getFileName());
//        picture.setFileUrl(uploadResponse.getImageUrl());
//        picture.setFileContentType(uploadResponse.getContentType());
//        picture.setCover(isCover);
//
//        return listingPictureRepository.save(picture);
//    }
//
//    public List<ListingPictureDTO> getListingPictures(Long listingId) {
//        List<ListingPicture> pictures = listingPictureRepository.findByListingId(listingId);
//
//        // Refresh URLs for all pictures
//        Map<String, String> refreshedUrls = pictures.stream()
//                .map(ListingPicture::getFileName)
//                .distinct()
//                .collect(Collectors.toMap(
//                        fileName -> fileName,
//                        fileName -> {
//                            try {
//                                return backBlazeService.refreshImageUrl(fileName);
//                            } catch (B2Exception e) {
//                                log.error("Error refreshing URL for file: {}", fileName, e);
//                                return null;
//                            }
//                        }
//                ));
//
//        return pictures.stream()
//                .map(picture -> new ListingPictureDTO(
//                        picture.getId(),
//                        refreshedUrls.getOrDefault(picture.getFileName(), picture.getFileUrl()),
//                        picture.getFileName(),
//                        picture.getFileContentType(),
//                        picture.isCover()
//                ))
//                .collect(Collectors.toList());
//    }
//
//    public void deletePicture(Long pictureId) {
//        listingPictureRepository.findById(pictureId).ifPresent(picture -> {
//            try {
//                backBlazeService.deleteFile(picture.getFileName());
//                listingPictureRepository.delete(picture);
//            } catch (B2Exception e) {
//                log.error("Error deleting file from storage: {}", picture.getFileName(), e);
//                // Still delete from database if storage deletion fails
//                listingPictureRepository.delete(picture);
//            }
//        });
//    }
//}
