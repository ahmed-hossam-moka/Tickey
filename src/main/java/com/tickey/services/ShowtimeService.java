package com.tickey.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tickey.entites.Hall;
import com.tickey.entites.Movie;
import com.tickey.entites.Showtime;
import com.tickey.repositorys.ShowtimeRepository;

@Service
public class ShowtimeService {
    @Autowired
    private ShowtimeRepository ShowtimeRepo;

    public Showtime createShowtime(Showtime showtime){
        return ShowtimeRepo.save(showtime);
    }

    public Showtime updateShowtime(Long id, Showtime showtime){
        Showtime existing = ShowtimeRepo.findById(id)
        .orElseThrow(() -> new RuntimeException("Showtime not found"));

       existing.setMovie(showtime.getMovie());
       existing.setHall(showtime.getHall());

      existing.setShowDate(showtime.getShowDate());
      existing.setShowTime(showtime.getShowTime());
      existing.setAvailableSeats(showtime.getAvailableSeats());

      return ShowtimeRepo.save(existing);
}
    

    public void deleteShowtime(long id){
        ShowtimeRepo.deleteById(id);
    }

    public Optional<Showtime> findShowtime(Long id){
        return ShowtimeRepo.findById(id);
    }
   
    public List<Showtime> findAllShowtimes(){
        return ShowtimeRepo.findAll();
    }

     public List<Showtime> findByMovie(Movie movie){
        return ShowtimeRepo.findByMovie(movie);
     }

     public List<Showtime> findByHall(Hall hall){
        return ShowtimeRepo.findByHall(hall);
      }

      public List<Showtime> findByShowDate(LocalDate showDate){
        return ShowtimeRepo.findByShowDate(showDate);
      }

     public List<Showtime> findByMovieAndShowDate(Movie movie, LocalDate showDate){
        return ShowtimeRepo.findByMovieAndShowDate(movie, showDate);
     }

     public List<Showtime> findByHallAndShowDate(Hall hall, LocalDate showDate){
        return ShowtimeRepo.findByHallAndShowDate(hall, showDate);
     }


    }

