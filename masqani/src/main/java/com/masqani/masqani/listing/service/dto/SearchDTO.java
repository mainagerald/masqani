package com.masqani.masqani.listing.service.dto;


import com.masqani.masqani.booking.application.dto.BookedDateDTO;
import com.masqani.masqani.listing.service.dto.sub.ListingInfoDTO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;

public record SearchDTO(@Valid BookedDateDTO dates,
                        @Valid ListingInfoDTO infos,
                        @NotEmpty String location) {
}
