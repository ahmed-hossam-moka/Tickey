/* eslint-disable no-useless-catch */
// src/Api/usersApi.js
import axiosInstance from './axiosInstance';

const usersApi = {
  // Create user
  createUser: async (userData) => {
    try {
      const response = await axiosInstance.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create admin
  registerAdmin: async (userData) => {
    try {
      const response = await axiosInstance.post('/auth/register-admin', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get all users
  getAllUsers: async () => {
    try {
      const response = await axiosInstance.get('/users');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get user by ID
  getUserById: async (id) => {
    try {
      const response = await axiosInstance.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get user by email
  getUserByEmail: async (loginRequest) => {
    try {
      const response = await axiosInstance.post(`/auth/login`, loginRequest);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get users by role
  getUsersByRole: async (role) => {
    try {
      const response = await axiosInstance.get(`/users/role/${role}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Check if user exists by email
  checkUserExists: async (email) => {
    try {
      const response = await axiosInstance.get(`/users/exists/${email}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update user
  updateUser: async (userData) => {
    try {
      const response = await axiosInstance.put('/users', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete user
  deleteUser: async (id) => {
    try {
      const response = await axiosInstance.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default usersApi;