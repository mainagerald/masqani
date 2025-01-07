package com.masqani.masqani.listing.model.objects;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Embeddable
public class Coordinates {
    @Column(name = "map_coordinates_latitude")
    private double latitude;
    @Column(name = "map_coordinates_longitude")
    private double longitude;
}
