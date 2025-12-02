package com.tickey.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tickey.entites.Movie;
import com.tickey.entites.enums.MovieStatus;
import com.tickey.repositorys.MovieRepository;

@Service
public class MovieService {
    @Autowired
    private MovieRepository MovieRepo;
    
    public Movie createMovie(Movie movie){
        return MovieRepo.save(movie);
    }

        public Movie updateMovie(long id ,Movie movie) {

            Movie existing = MovieRepo.findById( id )
                    .orElseThrow(() -> new RuntimeException("Movie not found"));
        
            existing.setTitle(movie.getTitle());
            existing.setDescription(movie.getDescription());
            existing.setDuration(movie.getDuration());
            existing.setStatus(movie.getStatus());
            existing.setPosterUrl(movie.getPosterUrl());
            existing.setGenre(movie.getGenre());
            existing.setReleaseDate(movie.getReleaseDate());
            existing.setRating(movie.getRating());
        
            return MovieRepo.save(existing);
        }
    
    public void deleteMovie(long id){
         MovieRepo.deleteById(id);
    }

    public Optional<Movie> findMovieById( Long id){
        return MovieRepo.findById(id);
    }

    public List<Movie> findByStatus(MovieStatus status){
      return MovieRepo.findByStatus(status);
    }

    public List<Movie> findByTitleContainingIgnoreCase(String title){
        return MovieRepo.findByTitleContainingIgnoreCase(title);
    }
    
    public List<Movie> findByGenre(String genre){
        return MovieRepo.findByGenre(genre);
    }

    public List<Movie> findAllMovies(){
        return MovieRepo.findAll();
    }
     
    
}
