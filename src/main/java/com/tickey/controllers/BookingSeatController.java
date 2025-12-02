package com.tickey. controllers;

import com.tickey.entites. BookingSeat;
import com. tickey.entites.BookingSeatId;
import com.tickey.entites.Seat;
import com.tickey.services.BookingSeatService;
import org.springframework.beans.factory. annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/booking-seats")
public class BookingSeatController {

    @Autowired
    private BookingSeatService bookingSeatService;

    // Get all booking seats
    @GetMapping
    public List<BookingSeat> getAllBookingSeats() {
        return bookingSeatService.getAllBookingSeats();
    }

    // Get booking seat by composite ID
    @GetMapping("/{bookingId}/{seatId}/{showtimeId}")
    public BookingSeat getBookingSeatById(
            @PathVariable Long bookingId,
            @PathVariable Long seatId,
            @PathVariable Long showtimeId) {
        BookingSeatId id = new BookingSeatId();
        id.setBooking(bookingId);
        id.setSeat(seatId);
        id.setShowtime(showtimeId);

        return bookingSeatService.getBookingSeatById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "BookingSeat not found"));
    }

    // Get booking seats by showtime
    @GetMapping("/showtime/{showtimeId}")
    public List<BookingSeat> getBookingSeatsByShowtime(@PathVariable Long showtimeId) {
        try {
            return bookingSeatService.getBookingSeatsByShowtime(showtimeId);
        } catch (Exception e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    e.getMessage());
        }
    }

    // Get booking seats by booking ID
    @GetMapping("/booking/{bookingId}")
    public List<BookingSeat> getBookingSeatsByBooking(@PathVariable Long bookingId) {
        try {
            return bookingSeatService.getBookingSeatsByBooking(bookingId);
        } catch (Exception e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    e. getMessage());
        }
    }

    // Get all seats for a showtime
    @GetMapping("/showtime/{showtimeId}/seats")
    public List<Seat> getSeatsByShowtime(@PathVariable Long showtimeId) {
        try {
            return bookingSeatService.getSeatsByShowtime(showtimeId);
        } catch (Exception e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    e.getMessage());
        }
    }

    // Create a new booking seat
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public BookingSeat createBookingSeat(@RequestBody Map<String, Object> request) {
        try {
            Long bookingId = Long.valueOf(request.get("bookingId").toString());
            Long seatId = Long.valueOf(request.get("seatId"). toString());
            Long showtimeId = Long.valueOf(request. get("showtimeId").toString());

            return bookingSeatService.createBookingSeat(bookingId, seatId, showtimeId);

        } catch (NumberFormatException e) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Invalid ID format");
        } catch (RuntimeException e) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    e.getMessage());
        }
    }

    // Delete a booking seat
    @DeleteMapping("/{bookingId}/{seatId}/{showtimeId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteBookingSeat(
            @PathVariable Long bookingId,
            @PathVariable Long seatId,
            @PathVariable Long showtimeId) {
        try {
            BookingSeatId id = new BookingSeatId();
            id.setBooking(bookingId);
            id.setSeat(seatId);
            id.setShowtime(showtimeId);

            bookingSeatService.deleteBookingSeat(id);
        } catch (RuntimeException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    e.getMessage());
        }
    }

    // Check if a seat is booked for a specific showtime
    @GetMapping("/check/{seatId}/{showtimeId}")
    public Map<String, Boolean> isSeatBooked(
            @PathVariable Long seatId,
            @PathVariable Long showtimeId) {
        try {
            boolean isBooked = bookingSeatService. isSeatBookedForShowtime(seatId, showtimeId);
            return Map.of("isBooked", isBooked);
        } catch (Exception e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    e.getMessage());
        }
    }

    // Count booked seats for a showtime
    @GetMapping("/showtime/{showtimeId}/count")
    public Map<String, Long> countBookedSeats(@PathVariable Long showtimeId) {
        try {
            long count = bookingSeatService. countBookedSeatsForShowtime(showtimeId);
            return Map.of("bookedSeatsCount", count);
        } catch (Exception e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    e.getMessage());
        }
    }
}