// src/store/showtimeStore.js
import { create } from 'zustand';
import showtimesApi from '../Api/showtimeApi';

const useShowtimeStore = create((set, get) => ({
  showtimes: [],
  currentShowtime: null,
  loading: false,
  error: null,

  // Fetch showtime by ID
  fetchShowtimeById: async (id) => {
    set({ loading: true, error: null });
    try {
      const data = await showtimesApi.getShowtimeById(id);
      set({ currentShowtime: data, loading: false });
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Fetch showtimes by movie
  fetchShowtimesByMovie: async (movieId) => {
    set({ loading: true, error: null });
    try {
      const data = await showtimesApi.getShowtimesByMovie(movieId);
      set({ showtimes: data, loading: false });
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Fetch showtimes by hall
  fetchShowtimesByHall: async (hallId) => {
    set({ loading: true, error: null });
    try {
      const data = await showtimesApi.getShowtimesByHall(hallId);
      set({ showtimes: data, loading: false });
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Fetch showtimes by date
  fetchShowtimesByDate: async (date) => {
    set({ loading: true, error: null });
    try {
      const data = await showtimesApi.getShowtimesByDate(date);
      set({ showtimes: data, loading: false });
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Fetch showtimes by movie and date
  fetchShowtimesByMovieAndDate: async (movieId, date) => {
    set({ loading: true, error: null });
    try {
      const data = await showtimesApi.getShowtimesByMovieAndDate(movieId, date);
      set({ showtimes: data, loading: false });
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Fetch showtimes by hall and date
  fetchShowtimesByHallAndDate: async (hallId, date) => {
    set({ loading: true, error: null });
    try {
      const data = await showtimesApi.getShowtimesByHallAndDate(hallId, date);
      set({ showtimes: data, loading: false });
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Create showtime
  createShowtime: async (showtimeData) => {
    set({ loading: true, error: null });
    try {
      const data = await showtimesApi.createShowtime(showtimeData);
      set((state) => ({
        showtimes: [...state.showtimes, data],
        loading: false,
      }));
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Update showtime
  updateShowtime: async (id, showtimeData) => {
    set({ loading: true, error: null });
    try {
      const data = await showtimesApi.updateShowtime(id, showtimeData);
      set((state) => ({
        showtimes: state.showtimes.map((showtime) =>
          showtime.id === id ? data : showtime
        ),
        loading: false,
      }));
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Delete showtime
  deleteShowtime: async (id) => {
    set({ loading: true, error: null });
    try {
      await showtimesApi.deleteShowtime(id);
      set((state) => ({
        showtimes: state.showtimes.filter((showtime) => showtime.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Set current showtime
  setCurrentShowtime: (showtime) => {
    set({ currentShowtime: showtime });
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  },
}));

export default useShowtimeStore;