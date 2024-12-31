package com.masqani.masqani.listing.domain;

import com.masqani.masqani.listing.domain.enums.PropertyCategory;
import com.masqani.masqani.util.AuditingEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.UuidGenerator;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "listing")
@Data
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

    @Column(name = "landlord_public_id")
    private UUID landlordPublicId;

    @OneToMany(mappedBy = "listing", cascade = CascadeType.REMOVE)
    private Set<ListingPicture> pictures = new HashSet<>();

    @Override
    public Long getId() {
        return id;
    }


    @Override
    public String toString() {
        return "Listing{" +
                "title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", bedrooms=" + bedrooms +
                ", bathrooms=" + bathrooms +
                ", price=" + price +
                ",rentAmount="+rentAmount+
                ", bookingCategory=" + propertyCategory +
                ", location='" + location + '\'' +
                ", landlordPublicId=" + landlordPublicId +
                '}';
    }
}
