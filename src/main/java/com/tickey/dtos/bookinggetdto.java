package com.tickey.dtos;

import com.tickey.entites.enums.BookingStatus;
import java.time.LocalDateTime;
import java.util.List;

public class bookinggetdto {
    private Long id;
    
    // User info
    private Long userId;
    private String userName;
    private String userEmail;
    
    // Showtime info
    private Long showtimeId;
    private String movieTitle;
    private String hallName;
    private String showDate;
    private String showTime;
    
    private Double totalPrice;
    private BookingStatus status;
    private LocalDateTime bookingDate;
    private LocalDateTime cancelledAt;
    
    // List of booked seat IDs instead of full objects
    private List<BookedSeatInfo> bookedSeats;
    
    public bookinggetdto() {
    }
    
    // Inner class for booked seat info
    public static class BookedSeatInfo {
        private Long seatId;
        private Integer rowNo;
        private Integer seatNumber;
        private String seatType;
        
        public BookedSeatInfo() {
        }

        public Long getSeatId() {
            return seatId;
        }

        public void setSeatId(Long seatId) {
            this.seatId = seatId;
        }

        public Integer getRowNo() {
            return rowNo;
        }

        public void setRowNo(Integer rowNo) {
            this.rowNo = rowNo;
        }

        public Integer getSeatNumber() {
            return seatNumber;
        }

        public void setSeatNumber(Integer seatNumber) {
            this. seatNumber = seatNumber;
        }

        public String getSeatType() {
            return seatType;
        }

        public void setSeatType(String seatType) {
            this. seatType = seatType;
        }
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public Long getShowtimeId() {
        return showtimeId;
    }

    public void setShowtimeId(Long showtimeId) {
        this.showtimeId = showtimeId;
    }

    public String getMovieTitle() {
        return movieTitle;
    }

    public void setMovieTitle(String movieTitle) {
        this.movieTitle = movieTitle;
    }

    public String getHallName() {
        return hallName;
    }

    public void setHallName(String hallName) {
        this.hallName = hallName;
    }

    public String getShowDate() {
        return showDate;
    }

    public void setShowDate(String showDate) {
        this.showDate = showDate;
    }

    public String getShowTime() {
        return showTime;
    }

    public void setShowTime(String showTime) {
        this.showTime = showTime;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public BookingStatus getStatus() {
        return status;
    }

    public void setStatus(BookingStatus status) {
        this.status = status;
    }

    public LocalDateTime getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(LocalDateTime bookingDate) {
        this.bookingDate = bookingDate;
    }

    public LocalDateTime getCancelledAt() {
        return cancelledAt;
    }

    public void setCancelledAt(LocalDateTime cancelledAt) {
        this.cancelledAt = cancelledAt;
    }

    public List<BookedSeatInfo> getBookedSeats() {
        return bookedSeats;
    }

    public void setBookedSeats(List<BookedSeatInfo> bookedSeats) {
        this.bookedSeats = bookedSeats;
    }
}