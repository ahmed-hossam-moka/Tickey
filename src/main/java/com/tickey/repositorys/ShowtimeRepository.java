package com.tickey.repositorys;


import com.tickey.entites.Showtime;
import com.tickey.entites.Movie;
import com.tickey.entites.Hall;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface ShowtimeRepository extends JpaRepository<Showtime, Long> {
    List<Showtime> findByMovie(Movie movie);
    List<Showtime> findByHall(Hall hall);
    List<Showtime> findByShowDate(LocalDate showDate);
    List<Showtime> findByMovieAndShowDate(Movie movie, LocalDate showDate);
    List<Showtime> findByHallAndShowDate(Hall hall, LocalDate showDate);
}