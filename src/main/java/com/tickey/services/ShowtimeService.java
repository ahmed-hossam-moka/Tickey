package com.tickey.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tickey.dtos.showtimegetdto;
import com.tickey.entites.Hall;
import com.tickey.entites.Movie;
import com.tickey.entites.Showtime;
import com.tickey.repositorys.ShowtimeRepository;

@Service
public class ShowtimeService {
    @Autowired
    private ShowtimeRepository ShowtimeRepo;
    
    // Convert Showtime entity to showtimegetdto
    private showtimegetdto convertToDto(Showtime showtime) {
        showtimegetdto dto = new showtimegetdto();
        dto.setId(showtime.getId());
        
        // Movie info
        if (showtime.getMovie() != null) {
            dto.setMovieId(showtime.getMovie().getId());
            dto.setMovieTitle(showtime.getMovie().getTitle());
            dto.setMoviePosterUrl(showtime.getMovie().getPosterUrl());
            dto.setMovieGenre(showtime.getMovie().getGenre());
            dto.setMovieDuration(showtime.getMovie().getDuration());
        }
        
        // Hall info
        if (showtime.getHall() != null) {
            dto.setHallId(showtime.getHall().getId());
            dto.setHallName(showtime.getHall().getName());
        }
        
        dto.setShowDate(showtime.getShowDate());
        dto.setShowTime(showtime.getShowTime());
        dto.setAvailableSeats(showtime.getAvailableSeats());
        dto.setCreatedAt(showtime.getCreatedAt());
        return dto;
    }

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
    
    // DTO methods for GET operations
    public Optional<showtimegetdto> findShowtimeAsDto(Long id) {
        return ShowtimeRepo.findById(id).map(this::convertToDto);
    }
   
    public List<Showtime> findAllShowtimes(){
        return ShowtimeRepo.findAll();
    }
    
    public List<showtimegetdto> findAllShowtimesAsDto() {
        return ShowtimeRepo.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

     public List<Showtime> findByMovie(Movie movie){
        return ShowtimeRepo.findByMovie(movie);
     }
     
     public List<showtimegetdto> findByMovieAsDto(long  id) {
         return ShowtimeRepo.findById(id).stream()
                 .map(this::convertToDto)
                 .collect(Collectors.toList());
     }

     public List<Showtime> findByHall(Hall hall){
        return ShowtimeRepo.findByHall(hall);
      }
      
      public List<showtimegetdto> findByHallAsDto(Hall hall) {
          return ShowtimeRepo.findByHall(hall).stream()
                  .map(this::convertToDto)
                  .collect(Collectors.toList());
      }

      public List<Showtime> findByShowDate(LocalDate showDate){
        return ShowtimeRepo.findByShowDate(showDate);
      }
      
      public List<showtimegetdto> findByShowDateAsDto(LocalDate showDate) {
          return ShowtimeRepo.findByShowDate(showDate).stream()
                  .map(this::convertToDto)
                  .collect(Collectors.toList());
      }

     public List<Showtime> findByMovieAndShowDate(Movie movie, LocalDate showDate){
        return ShowtimeRepo.findByMovieAndShowDate(movie, showDate);
     }
     
     public List<showtimegetdto> findByMovieAndShowDateAsDto(Movie movie, LocalDate showDate) {
         return ShowtimeRepo.findByMovieAndShowDate(movie, showDate).stream()
                 .map(this::convertToDto)
                 .collect(Collectors.toList());
     }

     public List<Showtime> findByHallAndShowDate(Hall hall, LocalDate showDate){
        return ShowtimeRepo.findByHallAndShowDate(hall, showDate);
     }
     
     public List<showtimegetdto> findByHallAndShowDateAsDto(Hall hall, LocalDate showDate) {
         return ShowtimeRepo.findByHallAndShowDate(hall, showDate).stream()
                 .map(this::convertToDto)
                 .collect(Collectors.toList());
     }


    }

