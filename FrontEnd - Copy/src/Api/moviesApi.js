/* eslint-disable no-useless-catch */
import axiosInstance from './axiosInstance';

const moviesApi = {
  // Get all movies
  getAllMovies: async () => {
    try {
      const response = await axiosInstance.get('/movies');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get movie by ID
  getMovieById: async (id) => {
    try {
      const response = await axiosInstance.get(`/movies/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get movies by status
  getMoviesByStatus: async (status) => {
    try {
      const response = await axiosInstance.get(`/movies/status/${status}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Search movies by title
  searchMoviesByTitle: async (title) => {
    try {
      const response = await axiosInstance.get(`/movies/search/title/${title}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get movies by genre
  getMoviesByGenre: async (genre) => {
    try {
      const response = await axiosInstance.get(`/movies/genre/${genre}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create movie
  createMovie: async (movieData) => {
    try {
      const response = await axiosInstance.post('/movies', movieData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update movie
  updateMovie: async (id, movieData) => {
    try {
      const response = await axiosInstance.put(`/movies/${id}`, movieData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete movie
  deleteMovie: async (id) => {
    try {
      const response = await axiosInstance.delete(`/movies/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default moviesApi;