package com.masqani.masqani.listing.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class IdempotencyRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "idm_key", unique = true)
    private String key;

    @OneToOne
    @JoinColumn(name = "listing_id", nullable = false, referencedColumnName = "id")
    Listing listing;
}
