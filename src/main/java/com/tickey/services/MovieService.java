package com.tickey.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tickey.dtos.moviegetdto;
import com.tickey.entites.Movie;
import com.tickey.entites.enums.MovieStatus;
import com.tickey.repositorys.MovieRepository;

@Service
public class MovieService {
    @Autowired
    private MovieRepository MovieRepo;
    
    // Convert Movie entity to moviegetdto
    private moviegetdto convertToDto(Movie movie) {
        moviegetdto dto = new moviegetdto();
        dto.setId(movie.getId());
        dto.setCardName("movie-card");
        dto.setBadge("New"); // You can customize this logic
        dto.setImage(movie.getPosterUrl());
        dto.setAlt(movie.getTitle());
        dto.setTitle(movie.getTitle());
        dto.setDescription(movie.getDescription());
        dto.setDuration(moviegetdto.formatDuration(movie.getDuration()));
        dto.setRating(moviegetdto.formatRating(movie.getRating()));
        dto.setGenre(movie.getGenre());
        dto.setStatus(movie.getStatus());
        dto.setReleaseDate(movie.getReleaseDate());
        return dto;
    }
    
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
    
    // DTO methods for GET operations
    public Optional<moviegetdto> findMovieByIdAsDto(Long id) {
        return MovieRepo.findById(id).map(this::convertToDto);
    }

    public List<moviegetdto> findByStatusAsDto(MovieStatus status){
        return MovieRepo.findByStatus(status).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<moviegetdto> findByTitleContainingIgnoreCaseAsDto(String title){
        return MovieRepo.findByTitleContainingIgnoreCase(title).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public List<moviegetdto> findByGenreAsDto(String genre){
        return MovieRepo.findByGenre(genre).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<moviegetdto> findAllMoviesAsDto(){
        return MovieRepo.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    // Keep original methods for non-GET operations
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
