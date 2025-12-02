package com.tickey.controllers;

import com.tickey.entites.Booking;
import com.tickey.entites.Seat;
import com.tickey.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/bookings")
// @CrossOrigin(origins = "http://localhost:3000")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    // Create a new booking
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Booking createBooking(@RequestBody Map<String, Object> request) {
        try {
            Long userId = Long.valueOf(request.get("userId").toString());
            Long showtimeId = Long.valueOf(request.get("showtimeId").toString());
            
            @SuppressWarnings("unchecked")
            List<Integer> seatIdsInt = (List<Integer>) request.get("seatIds");
            List<Long> seatIds = seatIdsInt.stream()
                    .map(Integer::longValue)
                    .toList();

            return bookingService.createBooking(userId, showtimeId, seatIds);
            
        } catch (NumberFormatException e) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST, 
                e.getMessage()
            );
        }
    }

    // Get user's bookings
    @GetMapping("/user/{userId}")
    public List<Booking> getUserBookings(@PathVariable Long userId) {
        return bookingService.getUserBookings(userId);
    }

    // Get booking by ID
    @GetMapping("/{id}")
    public Booking getBookingById(@PathVariable Long id) {
        return bookingService.getBookingById(id)
                .orElseThrow(() -> new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Booking not found"));
    }

    // Get available seats for a showtime
    @GetMapping("/showtime/{showtimeId}/available-seats")
    public List<Seat> getAvailableSeats(@PathVariable Long showtimeId) {
        try {
            return bookingService.getAvailableSeats(showtimeId);
        } catch (Exception e) {
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, 
                e.getMessage()
            );
        }
    }

    // Get booked seats for a showtime
    @GetMapping("/showtime/{showtimeId}/booked-seats")
    public List<Seat> getBookedSeats(@PathVariable Long showtimeId) {
        try {
            return bookingService.getBookedSeats(showtimeId);
        } catch (Exception e) {
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, 
                e.getMessage()
            );
        }
    }

    // Cancel booking
    @PutMapping("/{id}/cancel")
    public Booking cancelBooking(@PathVariable Long id) {
        try {
            return bookingService.cancelBooking(id);
        } catch (Exception e) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST, 
                e.getMessage()
            );
        }
    }

    // Confirm booking (after payment)
    @PutMapping("/{id}/confirm")
    public Booking confirmBooking(@PathVariable Long id) {
        try {
            return bookingService.confirmBooking(id);
        } catch (Exception e) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST, 
                e.getMessage()
            );
        }
    }

    // Get all bookings (admin)
    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }
}