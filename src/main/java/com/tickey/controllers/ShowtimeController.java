package com.tickey.controllers;

import com.tickey.entites.Hall;
import com.tickey.entites.Movie;
import com.tickey.entites.Showtime;
import com.tickey.services.ShowtimeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/showtimes")
@CrossOrigin("*")
public class ShowtimeController {

    @Autowired
    private ShowtimeService showtimeService;

    @PostMapping
    public Showtime createShowtime(@RequestBody Showtime showtime) {
        return showtimeService.createShowtime(showtime);
    }


    @PutMapping("/{id}")
    public Showtime updateShowtime( @PathVariable long id , @RequestBody Showtime showtime) {
        return showtimeService.updateShowtime(id,showtime);
    }

    @DeleteMapping("/{id}")
    public void deleteShowtime(@PathVariable long id){
        showtimeService.deleteShowtime(id);
    }

    @GetMapping("/{id}")
    public Optional<Showtime> findShowtime(@PathVariable Long id){
        return showtimeService.findShowtime(id);
    }
    
   // @GetMapping
    //public List<Showtime> findAllShowtimes(){
      //  return showtimeService.findAllShowtimes();
    //}

    @PostMapping("/movie")
    public List<Showtime> findByMovie(@RequestBody Movie movie){
        return showtimeService.findByMovie(movie);
    }

    @PostMapping("/hall")
    public List<Showtime> findByHall(@RequestBody Hall hall){
        return showtimeService.findByHall(hall);
    }

    @GetMapping("/date/{date}")
    public List<Showtime> findByShowDate(@PathVariable String date){
        LocalDate localDate = LocalDate.parse(date);
        return showtimeService.findByShowDate(localDate);
    }

    @PostMapping("/movie/date/{date}")
    public List<Showtime> findByMovieAndShowDate( @RequestBody Movie movie,@PathVariable String date) {
        LocalDate localDate = LocalDate.parse(date);
        return showtimeService.findByMovieAndShowDate(movie, localDate);
    }

    @PostMapping("/hall/date/{date}")
    public List<Showtime> findByHallAndShowDate( @RequestBody Hall hall, @PathVariable String date) {
        LocalDate localDate = LocalDate.parse(date);
        return showtimeService.findByHallAndShowDate(hall, localDate);
    }
}

