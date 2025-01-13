package com.masqani.masqani.listing.repository;

import com.masqani.masqani.listing.model.ListingPicture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ListingPictureRepository extends JpaRepository<ListingPicture, Long> {

    @Query("SELECT lp from ListingPicture lp where lp.listing = :id")
    List<ListingPicture> findByListingId(Long id);
}
