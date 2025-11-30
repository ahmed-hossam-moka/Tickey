package com.tickey.services;

import com.tickey.entites.*;
import com.tickey.entites.enums.BookingStatus;
import com.tickey.repositorys.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private BookingSeatRepository bookingSeatRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ShowtimeRepository showtimeRepository;

    @Autowired
    private SeatRepository seatRepository;

    // Create a new booking
    @Transactional
    public Booking createBooking(Long userId, Long showtimeId, List<Long> seatIds) {
        // 1. Get user
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 2. Get showtime
        Showtime showtime = showtimeRepository.findById(showtimeId)
                .orElseThrow(() -> new RuntimeException("Showtime not found"));

        // 3. Get seats
        List<Seat> seats = seatRepository.findAllById(seatIds);
        if (seats.size() != seatIds.size()) {
            throw new RuntimeException("Some seats not found");
        }

        // 4. Check if all seats belong to the showtime's hall
        for (Seat seat : seats) {
            if (!seat.getHall().getId().equals(showtime.getHall().getId())) {
                throw new RuntimeException("Seat " + seat.getId() + " is not in this hall");
            }
        }

        // 5. Check if seats are already booked for this showtime
        List<BookingSeat> existingBookings = bookingSeatRepository.findByShowtime(showtime);
        List<Long> bookedSeatIds = existingBookings.stream()
                .map(bs -> bs.getSeat().getId())
                .collect(Collectors.toList());

        for (Long seatId : seatIds) {
            if (bookedSeatIds.contains(seatId)) {
                throw new RuntimeException("Seat " + seatId + " is already booked");
            }
        }

        // 6. Calculate total price (assuming $10 per seat for now)
        double totalPrice = seats.size() * 10.0;

        // 7. Create booking
        Booking booking = new Booking();
        booking.setUser(user);
        booking.setShowtime(showtime);
        booking.setTotalPrice(totalPrice);
        booking.setStatus(BookingStatus.PENDING);
        
        Booking savedBooking = bookingRepository.save(booking);

        // 8. Create BookingSeat records
        List<BookingSeat> bookingSeats = new ArrayList<>();
        for (Seat seat : seats) {
            BookingSeat bookingSeat = new BookingSeat();
            bookingSeat.setBooking(savedBooking);
            bookingSeat.setSeat(seat);
            bookingSeat.setShowtime(showtime);
            bookingSeats.add(bookingSeat);
        }
        bookingSeatRepository.saveAll(bookingSeats);

        // 9. Update available seats count
        int newAvailableSeats = showtime.getAvailableSeats() - seats.size();
        showtime.setAvailableSeats(newAvailableSeats);
        showtimeRepository.save(showtime);

        savedBooking.setBookingSeats(bookingSeats);
        return savedBooking;
    }

    // Get all bookings for a user
    public List<Booking> getUserBookings(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return bookingRepository.findByUser(user);
    }

    // Get booking by ID
    public Optional<Booking> getBookingById(Long bookingId) {
        return bookingRepository.findById(bookingId);
    }

    // Get available seats for a showtime
    public List<Seat> getAvailableSeats(Long showtimeId) {
        Showtime showtime = showtimeRepository.findById(showtimeId)
                .orElseThrow(() -> new RuntimeException("Showtime not found"));

        Hall hall = showtime.getHall();
        List<Seat> allSeats = seatRepository.findByHall(hall);

        // Get booked seats for this showtime
        List<BookingSeat> bookingSeats = bookingSeatRepository.findByShowtime(showtime);
        List<Long> bookedSeatIds = bookingSeats.stream()
                .map(bs -> bs.getSeat().getId())
                .collect(Collectors.toList());

        // Filter out booked seats
        return allSeats.stream()
                .filter(seat -> !bookedSeatIds.contains(seat.getId()))
                .collect(Collectors.toList());
    }

    // Get booked seats for a showtime
    public List<Seat> getBookedSeats(Long showtimeId) {
        Showtime showtime = showtimeRepository.findById(showtimeId)
                .orElseThrow(() -> new RuntimeException("Showtime not found"));

        List<BookingSeat> bookingSeats = bookingSeatRepository.findByShowtime(showtime);
        return bookingSeats.stream()
                .map(BookingSeat::getSeat)
                .collect(Collectors.toList());
    }

    // Cancel booking
    @Transactional
    public Booking cancelBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (booking.getStatus() == BookingStatus.CANCELLED) {
            throw new RuntimeException("Booking already cancelled");
        }

        // Update booking status
        booking.setStatus(BookingStatus.CANCELLED);
        booking.setCancelledAt(LocalDateTime.now());

        // Return seats to available pool
        Showtime showtime = booking.getShowtime();
        int seatsToReturn = booking.getBookingSeats().size();
        showtime.setAvailableSeats(showtime.getAvailableSeats() + seatsToReturn);
        showtimeRepository.save(showtime);

        return bookingRepository.save(booking);
    }

    // Confirm booking (after payment)
    @Transactional
    public Booking confirmBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (booking.getStatus() == BookingStatus.CANCELLED) {
            throw new RuntimeException("Cannot confirm cancelled booking");
        }

        booking.setStatus(BookingStatus.CONFIRMED);
        return bookingRepository.save(booking);
    }

    // Get all bookings (admin)
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    // Check if booking exists
    public boolean bookingExists(Long bookingId) {
        return bookingRepository.existsById(bookingId);
    }
}