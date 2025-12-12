package com.tickey.controllers;

import com.tickey.dtos.moviegetdto;
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
    public Optional<moviegetdto> findMovieById(@PathVariable Long id){
        return movieService.findMovieByIdAsDto(id);
    }

    @GetMapping("/status/{status}")
    public List<moviegetdto> findByStatus(@PathVariable MovieStatus status){
        return movieService.findByStatusAsDto(status);
    }

    @GetMapping("/search/title/{title}")
    public List<moviegetdto> findByTitle(@PathVariable String title){
        return movieService.findByTitleContainingIgnoreCaseAsDto(title);
    }

    @GetMapping("/genre/{genre}")
    public List<moviegetdto> findByGenre(@PathVariable String genre){
        return movieService.findByGenreAsDto(genre);
    }

    @GetMapping
    public List<moviegetdto> findAllMovies(){
        return movieService.findAllMoviesAsDto();
    }
}