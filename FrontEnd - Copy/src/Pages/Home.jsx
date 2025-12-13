// src/Pages/Home.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router";
import Slider from "../Features/Slider";
import Trending from "../Features/Trending";
import Card from "../Components/Card";
import useMovieStore from "../store/movieStore";

const Home = () => {
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
      <div className="container text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container text-center py-5">
        <div className="alert alert-danger" role="alert">
          Error loading movies: {error}
        </div>
      </div>
    );
  }

  return (
    <>
      <Slider />
      <section className="movies mt-5">
        <div className="container">
          <Trending />
          <div className="row g-4">
            {movies.map((movie) => (
              <div key={movie.id} className="col-lg-6 col-12">
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
      </section>
    </>
  );
};

export default Home;