// src/store/movieStore.js
import { create } from 'zustand';
import moviesApi from '../Api/moviesApi';

const useMovieStore = create((set, get) => ({
  movies: [],
  currentMovie: null,
  loading: false,
  error: null,

  // Fetch all movies
  fetchMovies: async () => {
    set({ loading: true, error: null });
    try {
      const data = await moviesApi.getAllMovies();
      set({ movies: data, loading: false });
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Fetch movie by ID
  fetchMovieById: async (id) => {
    set({ loading: true, error: null });
    try {
      const data = await moviesApi.getMovieById(id);
      set({ currentMovie: data, loading: false });
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Fetch movies by status
  fetchMoviesByStatus: async (status) => {
    set({ loading: true, error: null });
    try {
      const data = await moviesApi.getMoviesByStatus(status);
      set({ movies: data, loading: false });
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Search movies by title
  searchMovies: async (title) => {
    set({ loading: true, error: null });
    try {
      const data = await moviesApi.searchMoviesByTitle(title);
      set({ movies: data, loading: false });
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Fetch movies by genre
  fetchMoviesByGenre: async (genre) => {
    set({ loading: true, error: null });
    try {
      const data = await moviesApi.getMoviesByGenre(genre);
      set({ movies: data, loading: false });
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Create movie
  createMovie: async (movieData) => {
    set({ loading: true, error: null });
    try {
      const data = await moviesApi.createMovie(movieData);
      set((state) => ({
        movies: [...state.movies, data],
        loading: false,
      }));
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Update movie
  updateMovie: async (id, movieData) => {
    set({ loading: true, error: null });
    try {
      const data = await moviesApi.updateMovie(id, movieData);
      set((state) => ({
        movies: state.movies.map((movie) => (movie.id === id ? data : movie)),
        loading: false,
      }));
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Delete movie
  deleteMovie: async (id) => {
    set({ loading: true, error: null });
    try {
      await moviesApi.deleteMovie(id);
      set((state) => ({
        movies: state.movies.filter((movie) => movie.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Set current movie
  setCurrentMovie: (movie) => {
    set({ currentMovie: movie });
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  },
}));

export default useMovieStore;