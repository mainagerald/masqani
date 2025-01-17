package com.masqani.masqani.listing.repository;

import com.masqani.masqani.listing.model.enums.PropertyCategory;
import com.masqani.masqani.listing.model.Listing;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ListingRepository extends JpaRepository<Listing, Long> {
    @Query("SELECT listing FROM Listing listing " +
            "LEFT JOIN FETCH listing.pictures picture " +
            "WHERE picture.isCover = true AND listing.landlordPublicId = :landlordPublicId ORDER BY listing.createdAt DESC")
    List<Listing> findAllByLandlordPublicIdFetchCoverPicture(UUID landlordPublicId);

    @Query("SELECT listing from Listing listing where listing.landlordPublicId = :landlordPublicId")
    List<Listing> findAllByLandlordPublicId(UUID landlordPublicId);


    @Query("SELECT l FROM Listing l LEFT JOIN FETCH l.pictures WHERE l.publicId = :publicId")
    Optional<Listing> findByPublicIdWithPictures(@Param("publicId") UUID publicId);

    long deleteByPublicIdAndLandlordPublicId(UUID publicId, UUID landlordPublicId);

    @Query("SELECT listing from Listing listing LEFT JOIN FETCH listing.pictures picture" +
            " WHERE picture.isCover = true AND listing.propertyCategory = :propertyCategory")
    Page<Listing> findAllByPropertyCategoryWithCoverOnly(Pageable pageable, PropertyCategory propertyCategory);

    @Query("SELECT listing from Listing listing LEFT JOIN FETCH listing.pictures picture" +
            " WHERE picture.isCover = true")
    Page<Listing> findAllWithCoverOnly(Pageable pageable);

    Optional<Listing> findByPublicId(UUID publicId);

    List<Listing> findAllByPublicIdIn(List<UUID> allListingPublicIDs);

    Optional<Listing> findOneByPublicIdAndLandlordPublicId(UUID listingPublicId, UUID landlordPublicId);

    Page<Listing> findAllByLocationAndBathroomsAndBedrooms(
            Pageable pageable, String location, int bathrooms, int bedrooms
    );
}
