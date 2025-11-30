package com.tickey.entites;

import java.io.Serializable;
import java.util.Objects;

public class BookingSeatId implements Serializable {

    private static final long serialVersionUID = 1L;
    private Long booking;
    private Long seat;
    private Long showtime;

    public BookingSeatId() {
    }

    public Long getBooking() {
        return booking;
    }

    public void setBooking(Long booking) {
        this.booking = booking;
    }

    public Long getSeat() {
        return seat;
    }

    public void setSeat(Long seat) {
        this.seat = seat;
    }

    public Long getShowtime() {
        return showtime;
    }

    public void setShowtime(Long showtime) {
        this.showtime = showtime;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        BookingSeatId that = (BookingSeatId) o;
        return Objects.equals(booking, that.booking) &&
                Objects.equals(seat, that.seat) &&
                Objects.equals(showtime, that.showtime);
    }

    @Override
    public int hashCode() {
        return Objects.hash(booking, seat, showtime);
    }

}