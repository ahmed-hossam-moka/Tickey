/* eslint-disable no-useless-catch */
// src/Api/hallsApi.js
import axiosInstance from './axiosInstance';

const hallsApi = {
  // Get all halls
  getAllHalls: async () => {
    try {
      const response = await axiosInstance.get('/halls');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get hall by ID
  getHallById: async (id) => {
    try {
      const response = await axiosInstance.get(`/halls/id/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get hall by name
  getHallByName: async (name) => {
    try {
      const response = await axiosInstance.get(`/halls/name/${name}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get seats in hall
  getSeatsInHall: async (id) => {
    try {
      const response = await axiosInstance.get(`/halls/${id}/seats`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get hall capacity
  getHallCapacity: async (id) => {
    try {
      const response = await axiosInstance.get(`/halls/${id}/capacity`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create hall
  createHall: async (hallData) => {
    try {
      const response = await axiosInstance.post('/halls', hallData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create hall with seats
  createHallWithSeats: async (hallData) => {
    try {
      const response = await axiosInstance.post('/halls/with-seats', hallData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update hall
  updateHall: async (id, hallData) => {
    try {
      const response = await axiosInstance.put(`/halls/${id}`, hallData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete hall
  deleteHall: async (id) => {
    try {
      const response = await axiosInstance.delete(`/halls/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default hallsApi;