package com.masqani.masqani.booking.mapper;

import com.masqani.masqani.booking.application.dto.BookedDateDTO;
import com.masqani.masqani.booking.application.dto.NewBookingDTO;
import com.masqani.masqani.booking.domain.Booking;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BookingMapper {

    Booking newBookingToBooking(NewBookingDTO newBookingDTO);

    BookedDateDTO bookingToCheckAvailability(Booking booking);
}
