/* eslint-disable no-useless-catch */
// src/Api/bookingsApi.js
import axiosInstance from './axiosInstance';

const bookingsApi = {
  // Create booking
  createBooking: async (bookingData) => {
    try {
      const response = await axiosInstance.post('/bookings', bookingData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get all bookings
  getAllBookings: async () => {
    try {
      const response = await axiosInstance.get('/bookings');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get booking by ID
  getBookingById: async (id) => {
    try {
      const response = await axiosInstance.get(`/bookings/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get user bookings
  getUserBookings: async (userId) => {
    try {
      const response = await axiosInstance.get(`/bookings/user/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get available seats for showtime
  getAvailableSeats: async (showtimeId) => {
    try {
      const response = await axiosInstance.get(`/bookings/showtime/${showtimeId}/available-seats`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get booked seats for showtime
  getBookedSeats: async (showtimeId) => {
    try {
      const response = await axiosInstance.get(`/bookings/showtime/${showtimeId}/booked-seats`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Cancel booking
  cancelBooking: async (id) => {
    try {
      const response = await axiosInstance.put(`/bookings/${id}/cancel`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Confirm booking
  confirmBooking: async (id) => {
    try {
      const response = await axiosInstance.put(`/bookings/${id}/confirm`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default bookingsApi;