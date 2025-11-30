package com.tickey.repositorys;


import com.tickey.entites.BookingSeat;
import com.tickey.entites.BookingSeatId;
import com.tickey.entites.Showtime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BookingSeatRepository extends JpaRepository<BookingSeat, BookingSeatId> {
    List<BookingSeat> findByShowtime(Showtime showtime);
}