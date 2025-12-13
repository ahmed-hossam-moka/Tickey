/* eslint-disable no-useless-catch */
// src/Api/seatsApi.js
import axiosInstance from './axiosInstance';

const seatsApi = {
  // Get all seats
  getAllSeats: async () => {
    try {
      const response = await axiosInstance.get('/seats');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get seat by ID
  getSeatById: async (id) => {
    try {
      const response = await axiosInstance.get(`/seats/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get seats by hall
  getSeatsByHall: async (hallId) => {
    try {
      const response = await axiosInstance.get(`/seats/hall/${hallId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get seats by hall and row
  getSeatsByHallAndRow: async (hallId, rowNo) => {
    try {
      const response = await axiosInstance.get(`/seats/hall/${hallId}/row/${rowNo}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get seats by type
  getSeatsByType: async (type) => {
    try {
      const response = await axiosInstance.get(`/seats/type/${type}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get seats by hall and type
  getSeatsByHallAndType: async (hallId, type) => {
    try {
      const response = await axiosInstance.get(`/seats/hall/${hallId}/type/${type}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create seat
  createSeat: async (seatData) => {
    try {
      const response = await axiosInstance.post('/seats', seatData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update seat
  updateSeat: async (id, seatData) => {
    try {
      const response = await axiosInstance.put(`/seats/${id}`, seatData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete seat
  deleteSeat: async (id) => {
    try {
      const response = await axiosInstance.delete(`/seats/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default seatsApi;