/* eslint-disable no-useless-catch */
// src/Api/showtimesApi.js
import axiosInstance from './axiosInstance';

const showtimesApi = {
  // Get showtime by ID
  getShowtimeById: async (id) => {
    try {
      const response = await axiosInstance.get(`/showtimes/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get showtimes by movie
  getShowtimesByMovie: async (movieId) => {
    try {
      const response = await axiosInstance.get(`/showtimes/movie/${movieId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get showtimes by hall
  getShowtimesByHall: async (hallId) => {
    try {
      const response = await axiosInstance.post('/showtimes/hall', { id: hallId });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get showtimes by date
  getShowtimesByDate: async (date) => {
    try {
      const response = await axiosInstance.get(`/showtimes/date/${date}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get showtimes by movie and date
  getShowtimesByMovieAndDate: async (movieId, date) => {
    try {
      const response = await axiosInstance.post(`/showtimes/movie/date/${date}`, { id: movieId });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get showtimes by hall and date
  getShowtimesByHallAndDate: async (hallId, date) => {
    try {
      const response = await axiosInstance.post(`/showtimes/hall/date/${date}`, { id: hallId });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create showtime
  createShowtime: async (showtimeData) => {
    try {
      const response = await axiosInstance.post('/showtimes', showtimeData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update showtime
  updateShowtime: async (id, showtimeData) => {
    try {
      const response = await axiosInstance.put(`/showtimes/${id}`, showtimeData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete showtime
  deleteShowtime: async (id) => {
    try {
      const response = await axiosInstance.delete(`/showtimes/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default showtimesApi;