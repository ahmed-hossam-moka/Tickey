package com.tickey.repositorys;


import com.tickey.entites.Booking;
import com.tickey.entites.User;
import com.tickey.entites.enums.BookingStatus;
import com.tickey.entites.Showtime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUser(User user);
    List<Booking> findByUserAndStatus(User user, BookingStatus status);
    List<Booking> findByShowtime(Showtime showtime);
    List<Booking> findByStatus(BookingStatus status);
}