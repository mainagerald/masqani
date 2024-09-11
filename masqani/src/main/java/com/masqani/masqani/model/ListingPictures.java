package com.masqani.masqani.model;

import com.masqani.masqani.util.AuditingEntity;
import jakarta.persistence.*;
import lombok.Data;
import java.util.Arrays;
import java.util.Objects;

@Entity
@Data
public class ListingPictures extends AuditingEntity<Long> {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "listingSequenceGenerator")
    @SequenceGenerator(name = "listingSequenceGenerator",sequenceName = "listing_generator", allocationSize = 1)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "listing_fk", referencedColumnName = "id")
    private Listing listing;
    @Lob
    @Column(name = "file", nullable = false)
    private byte[] file;
    @Column(name = "file_content_type")
    private String fileContentType;
    @Column(name = "is_cover")
    private boolean isCover;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        ListingPictures that = (ListingPictures) o;
        return isCover == that.isCover && Objects.deepEquals(file, that.file) && Objects.equals(fileContentType, that.fileContentType);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), Arrays.hashCode(file), fileContentType, isCover);
    }
}
