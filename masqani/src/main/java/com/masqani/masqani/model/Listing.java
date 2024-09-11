package com.masqani.masqani.model;

import com.masqani.masqani.enums.RentalCategory;
import com.masqani.masqani.util.AuditingEntity;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.UuidGenerator;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;

@Entity
@Data
public class Listing extends AuditingEntity<Long> {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "listingSequenceGenerator")
    @SequenceGenerator(name = "listingSequenceGenerator",sequenceName = "listing_generator", allocationSize = 1)
    private Long id;
    @UuidGenerator
    @Column(name = "public_id")
    private UUID publicId;
    @Column(name = "description")
    private String description;
    @Column(name = "size")
    private int size;
    @Column(name = "bedrooms")
    private int bedrooms;
    @Column(name = "bathrooms")
    private int bathrooms;
    @Column(name = "price")
    private Long price;
    @Column(name = "viewingFee")
    private int viewingReservationFee;
    @Column(name = "category")
    private RentalCategory category;
    @Column(name = "location")
    private String location;
    @Column(name = "landlord_public_id")
    private UUID landlordPublicId;
    @OneToMany(mappedBy = "listing", cascade = CascadeType.REMOVE)
    private Set<ListingPictures> listingPictures = new HashSet<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        Listing listing = (Listing) o;
        return size == listing.size && bedrooms == listing.bedrooms && bathrooms == listing.bathrooms && viewingReservationFee == listing.viewingReservationFee && Objects.equals(description, listing.description) && Objects.equals(price, listing.price) && category == listing.category && Objects.equals(location, listing.location) && Objects.equals(landlordPublicId, listing.landlordPublicId) && Objects.equals(listingPictures, listing.listingPictures);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), description, size, bedrooms, bathrooms, price, viewingReservationFee, category, location, landlordPublicId, listingPictures);
    }
}
