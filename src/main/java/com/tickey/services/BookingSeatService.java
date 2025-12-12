package com.tickey.services;

import com.tickey. entites.*;
import com.tickey.repositorys.*;
import org.springframework.beans. factory.annotation.Autowired;
import org.springframework.stereotype. Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream. Collectors;

@Service
public class BookingSeatService {

    @Autowired
    private BookingSeatRepository bookingSeatRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private SeatRepository seatRepository;

    @Autowired
    private ShowtimeRepository showtimeRepository;

    // Get all booking seats
    public List<BookingSeat> getAllBookingSeats() {
        return bookingSeatRepository.findAll();
    }

    // Get booking seat by composite ID
    public Optional<BookingSeat> getBookingSeatById(BookingSeatId id) {
        return bookingSeatRepository.findById(id);
    }

    // Get booking seats by showtime
    public List<BookingSeat> getBookingSeatsByShowtime(Long showtimeId) {
        Showtime showtime = showtimeRepository.findById(showtimeId)
                .orElseThrow(() -> new RuntimeException("Showtime not found"));
        return bookingSeatRepository.findByShowtime(showtime);
    }

    // Get booking seats by booking ID
    public List<BookingSeat> getBookingSeatsByBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        return booking.getBookingSeats();
    }

    // Get all seats for a specific showtime (grouped by booking)
    public List<Seat> getSeatsByShowtime(Long showtimeId) {
        Showtime showtime = showtimeRepository.findById(showtimeId)
                . orElseThrow(() -> new RuntimeException("Showtime not found"));
        List<BookingSeat> bookingSeats = bookingSeatRepository. findByShowtime(showtime);
        return bookingSeats. stream()
                .map(BookingSeat::getSeat)
                .collect(Collectors.toList());
    }

    // Create a new booking seat
    @Transactional
    public BookingSeat createBookingSeat(Long bookingId, Long seatId, Long showtimeId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        Seat seat = seatRepository.findById(seatId)
                . orElseThrow(() -> new RuntimeException("Seat not found"));

        Showtime showtime = showtimeRepository.findById(showtimeId)
                . orElseThrow(() -> new RuntimeException("Showtime not found"));

        // Check if seat belongs to showtime's hall
        if (!seat.getHall().getId().equals(showtime.getHall().getId())) {
            throw new RuntimeException("Seat does not belong to this showtime's hall");
        }

        // Check if booking's showtime matches
        if (!booking.getShowtime().getId().equals(showtimeId)) {
            throw new RuntimeException("Booking's showtime does not match the provided showtime");
        }

        // Check if seat is already booked for this showtime
        List<BookingSeat> existingBookingSeats = bookingSeatRepository.findByShowtime(showtime);
        boolean isSeatBooked = existingBookingSeats.stream()
                .anyMatch(bs -> bs. getSeat().getId().equals(seatId));

        if (isSeatBooked) {
            throw new RuntimeException("Seat is already booked for this showtime");
        }

        BookingSeat bookingSeat = new BookingSeat();
        bookingSeat.setBooking(booking);
        bookingSeat.setSeat(seat);
        bookingSeat.setShowtime(showtime);

        return bookingSeatRepository.save(bookingSeat);
    }

    // Delete a booking seat
    @Transactional
    public void deleteBookingSeat(BookingSeatId id) {
        BookingSeat bookingSeat = bookingSeatRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("BookingSeat not found"));
        bookingSeatRepository.delete(bookingSeat);
    }

    // Check if a seat is booked for a specific showtime
    public boolean isSeatBookedForShowtime(Long seatId, Long showtimeId) {
        Showtime showtime = showtimeRepository.findById(showtimeId)
                .orElseThrow(() -> new RuntimeException("Showtime not found"));

        List<BookingSeat> bookingSeats = bookingSeatRepository.findByShowtime(showtime);
        return bookingSeats.stream()
                .anyMatch(bs -> bs.getSeat(). getId().equals(seatId));
    }

    // Count booked seats for a showtime
    public long countBookedSeatsForShowtime(Long showtimeId) {
        Showtime showtime = showtimeRepository. findById(showtimeId)
                .orElseThrow(() -> new RuntimeException("Showtime not found"));
        return bookingSeatRepository.findByShowtime(showtime).size();
    }
}