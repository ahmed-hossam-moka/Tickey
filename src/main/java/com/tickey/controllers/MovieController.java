package com.tickey.controllers;

import com.tickey.entites.Movie;
import com.tickey.entites.enums.MovieStatus;
import com.tickey.services.MovieService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/movies")
@CrossOrigin("*")
public class MovieController {

    @Autowired
    private MovieService movieService;

    @PostMapping
    public Movie createMovie(@RequestBody Movie movie) {
        return movieService.createMovie(movie);
    }

    @PutMapping("/{id}")
    public Movie updateMovie(@PathVariable long id ,@RequestBody Movie movie) {
        return movieService.updateMovie(id,movie);
    }

    @DeleteMapping("/{id}")
    public void deleteMovie(@PathVariable long id){
        movieService.deleteMovie(id);
    }

    @GetMapping("/{id}")
    public Optional<Movie> findMovieById(@PathVariable Long id){
        return movieService.findMovieById(id);
    }

    @GetMapping("/status/{status}")
    public List<Movie> findByStatus(@PathVariable MovieStatus status){
        return movieService.findByStatus(status);
    }

    @GetMapping("/search/title/{title}")
    public List<Movie> findByTitle(@PathVariable String title){
        return movieService.findByTitleContainingIgnoreCase(title);
    }

    @GetMapping("/genre/{genre}")
    public List<Movie> findByGenre(@PathVariable String genre){
        return movieService.findByGenre(genre);
    }

    @GetMapping
    public List<Movie> findAllMovies(){
        return movieService.findAllMovies();
    }
}