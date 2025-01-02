package com.masqani.masqani.shared.idm;

import com.masqani.masqani.listing.model.Listing;
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
    @Column(name = "idm_listing")
    Listing listing;
}
