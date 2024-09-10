package com.masqani.masqani.model;

import com.masqani.masqani.resource.AuditingEntity;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.UuidGenerator;

import java.time.OffsetDateTime;
import java.util.Objects;
import java.util.UUID;

@Entity
@Data
public class Renting extends AuditingEntity<Long> {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "rentingSequenceGenerator")
    @SequenceGenerator(name = "rentingSequenceGenerator",sequenceName = "renting_generator", allocationSize = 1)
    private Long id;
    @UuidGenerator
    @Column(name = "public_id")
    private UUID publicId;
    @Column(name = "start_date")
    private OffsetDateTime startDate;
    @Column(name = "price")
    private int Price;
    @Column(name = "tenant-fk", nullable = false)
    private UUID fkTenant;
    @Column(name = "listing_fk", nullable = false)
    private UUID fkListing;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        Renting renting = (Renting) o;
        return Price == renting.Price && Objects.equals(startDate, renting.startDate) && Objects.equals(fkTenant, renting.fkTenant) && Objects.equals(fkListing, renting.fkListing);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), startDate, Price, fkTenant, fkListing);
    }
}
