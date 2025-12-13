// src/store/hallStore.js
import { create } from 'zustand';
import hallsApi from '../Api/hallsApi';

const useHallStore = create((set, get) => ({
  halls: [],
  currentHall: null,
  hallSeats: [],
  loading: false,
  error: null,

  // Fetch all halls
  fetchHalls: async () => {
    set({ loading: true, error: null });
    try {
      const data = await hallsApi.getAllHalls();
      set({ halls: data, loading: false });
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Fetch hall by ID
  fetchHallById: async (id) => {
    set({ loading: true, error: null });
    try {
      const data = await hallsApi.getHallById(id);
      set({ currentHall: data, loading: false });
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Fetch hall by name
  fetchHallByName: async (name) => {
    set({ loading: true, error: null });
    try {
      const data = await hallsApi.getHallByName(name);
      set({ currentHall: data, loading: false });
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Fetch seats in hall
  fetchHallSeats: async (id) => {
    set({ loading: true, error: null });
    try {
      const data = await hallsApi.getSeatsInHall(id);
      set({ hallSeats: data, loading: false });
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Fetch hall capacity
  fetchHallCapacity: async (id) => {
    set({ loading: true, error: null });
    try {
      const data = await hallsApi.getHallCapacity(id);
      set({ loading: false });
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Create hall
  createHall: async (hallData) => {
    set({ loading: true, error: null });
    try {
      const data = await hallsApi.createHall(hallData);
      set((state) => ({
        halls: [...state.halls, data],
        loading: false,
      }));
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Create hall with seats
  createHallWithSeats: async (hallData) => {
    set({ loading: true, error: null });
    try {
      const data = await hallsApi.createHallWithSeats(hallData);
      set((state) => ({
        halls: [...state.halls, data],
        loading: false,
      }));
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Update hall
  updateHall: async (id, hallData) => {
    set({ loading: true, error: null });
    try {
      const data = await hallsApi.updateHall(id, hallData);
      set((state) => ({
        halls: state.halls.map((hall) => (hall.id === id ? data : hall)),
        loading: false,
      }));
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Delete hall
  deleteHall: async (id) => {
    set({ loading: true, error: null });
    try {
      await hallsApi.deleteHall(id);
      set((state) => ({
        halls: state.halls.filter((hall) => hall.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Set current hall
  setCurrentHall: (hall) => {
    set({ currentHall: hall });
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  },
}));

export default useHallStore;