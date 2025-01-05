package com.masqani.masqani.listing.model.objects;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Embeddable
public class Coordinates {
    private double latitude;
    private double longitude;
}
