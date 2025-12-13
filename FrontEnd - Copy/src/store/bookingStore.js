// src/store/bookingStore.js
import { create } from 'zustand';
import bookingsApi from '../Api/bookingApi';

const useBookingStore = create((set, get) => ({
  bookings: [],
  currentBooking: null,
  availableSeats: [],
  bookedSeats: [],
  loading: false,
  error: null,

  // Create booking
  createBooking: async (bookingData) => {
    set({ loading: true, error: null });
    try {
      console.log(bookingData);
      const data = await bookingsApi.createBooking(bookingData);
      console.log(data);
      set((state) => ({
        bookings: [...state.bookings, data],
        currentBooking: data,
        loading: false,
      }));
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Fetch all bookings
  fetchBookings: async () => {
    set({ loading: true, error: null });
    try {
      const data = await bookingsApi.getAllBookings();
      set({ bookings: data, loading: false });
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Fetch booking by ID
  fetchBookingById: async (id) => {
    set({ loading: true, error: null });
    try {
      const data = await bookingsApi.getBookingById(id);
      set({ currentBooking: data, loading: false });
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Fetch user bookings
  fetchUserBookings: async (userId) => {
    set({ loading: true, error: null });
    try {
      const data = await bookingsApi.getUserBookings(userId);
      set({ bookings: data, loading: false });
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Fetch available seats for showtime
  fetchAvailableSeats: async (showtimeId) => {
    set({ loading: true, error: null });
    try {
      const data = await bookingsApi.getAvailableSeats(showtimeId);
      set({ availableSeats: data, loading: false });
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Fetch booked seats for showtime
  fetchBookedSeats: async (showtimeId) => {
    set({ loading: true, error: null });
    try {
      const data = await bookingsApi.getBookedSeats(showtimeId);
      set({ bookedSeats: data, loading: false });
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Cancel booking
  cancelBooking: async (id) => {
    set({ loading: true, error: null });
    try {
      const data = await bookingsApi.cancelBooking(id);
      set((state) => ({
        bookings: state.bookings.map((booking) =>
          booking.id === id ? data : booking
        ),
        loading: false,
      }));
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Confirm booking
  confirmBooking: async (id) => {
    set({ loading: true, error: null });
    try {
      const data = await bookingsApi.confirmBooking(id);
      set((state) => ({
        bookings: state.bookings.map((booking) =>
          booking.id === id ? data : booking
        ),
        currentBooking: data,
        loading: false,
      }));
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Set current booking
  setCurrentBooking: (booking) => {
    set({ currentBooking: booking });
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  },

  // Reset booking state
  resetBooking: () => {
    set({
      currentBooking: null,
      availableSeats: [],
      bookedSeats: [],
    });
  },
}));

export default useBookingStore;