// src/Pages/AllMovies.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Components/Card";
import useMovieStore from "../store/movieStore";
import "../styles/allMovies.css";

const AllMovies = () => {
  const navigate = useNavigate();
  const { movies, loading, error, fetchMovies } = useMovieStore();

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleBookNow = (movie) => {
    navigate('/movie-details', { state: { movie } });
  };

  if (loading) {
    return (
      <div className="all-movies-page">
        <div className="container text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="all-movies-page">
        <div className="container text-center py-5">
          <div className="alert alert-danger" role="alert">
            Error loading movies: {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="all-movies-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">All Movies</h1>
          <p className="page-subtitle">Browse our complete collection of amazing films</p>
        </div>

        <div className="movies-grid">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-item">
              <Card
                cardName={movie.cardName}
                badge={movie.badge}
                image={movie.image}
                alt={movie.alt}
                title={movie.title}
                description={movie.description}
                duration={movie.duration}
                rating={movie.rating}
                onBookNow={() => handleBookNow(movie)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllMovies;