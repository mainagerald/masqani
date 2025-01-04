package com.masqani.masqani.listing.model;

import jakarta.persistence.Entity;
import lombok.Data;

@Data
public class Coordinates {
    private double latitude;
    private double long;
}
