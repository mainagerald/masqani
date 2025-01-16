package com.masqani.masqani.listing.model;

import com.masqani.masqani.listing.model.enums.PropertyCategory;
import com.masqani.masqani.listing.model.objects.Coordinates;
import com.masqani.masqani.util.AuditingEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.hibernate.annotations.UuidGenerator;

import java.math.BigDecimal;
import java.util.*;


@Entity
@Table(name = "listing")
@Data
@EqualsAndHashCode(callSuper = true, exclude = {"pictures"})
@ToString(exclude = "pictures")
public class Listing extends AuditingEntity<Long> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @UuidGenerator
    @Column(name = "public_id", nullable = false)
    private UUID publicId;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "bedrooms")
    private int bedrooms;
    @Column(name = "bathrooms")
    private int bathrooms;

    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "rent_amount")
    private BigDecimal rentAmount;

    @Enumerated(EnumType.STRING)
    @Column(name = "category")
    private PropertyCategory propertyCategory;

    @Column(name = "location")
    private String location;


    @Embedded
    private Coordinates coordinates;

    @Column(name = "landlord_public_id")
    private UUID landlordPublicId;

    @OneToMany(mappedBy = "listing", cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    private List<ListingPicture> pictures = new ArrayList<>();


}
