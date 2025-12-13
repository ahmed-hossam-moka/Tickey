// // src/store/userStore.js
// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import usersApi from "../Api/userApi";

// const useUserStore = create(
//   persist(
//     (set, get) => ({
//       currentUser: null,
//       users: [],
//       loading: false,
//       error: null,
//       isAuthenticated: false,

//       // Login user
//       // userStore.js
//       login: async (loginRequest) => {
//         set({ loading: true, error: null });
//         try {
//           // Check if user exists
//           const user = await usersApi.getUserByEmail(loginRequest);
//           if (user.message==='Login successful') {
//             set({
//               currentUser: user,
//               isAuthenticated: true,
//               loading: false,
//             });
//             return user;
//           } else {
//             throw new Error('Invalid credentials');
//           }
//         } catch (error) {
//           set({ error: error.message, loading: false });
//           throw error;
//         }
//       },

//       // Register user
//       register: async (userData) => {
//         set({ loading: true, error: null });
//         try {
//           const exists = await usersApi.checkUserExists(userData.email);
//           if (exists) {
//             throw new Error("User already exists");
//           }
//           const data = await usersApi.createUser(userData);
//           set({ loading: false });
//           return data;
//         } catch (error) {
//           set({ error: error.message, loading: false });
//           throw error;
//         }
//       },

//       // Logout user
//       logout: () => {
//         set({
//           currentUser: null,
//           isAuthenticated: false,
//         });
//       },

//       // Fetch all users
//       fetchUsers: async () => {
//         set({ loading: true, error: null });
//         try {
//           const data = await usersApi.getAllUsers();
//           set({ users: data, loading: false });
//           return data;
//         } catch (error) {
//           set({ error: error.message, loading: false });
//           throw error;
//         }
//       },

//       // Fetch user by ID
//       fetchUserById: async (id) => {
//         set({ loading: true, error: null });
//         try {
//           const data = await usersApi.getUserById(id);
//           set({ loading: false });
//           return data;
//         } catch (error) {
//           set({ error: error.message, loading: false });
//           throw error;
//         }
//       },

//       // Update user
//       updateUser: async (userData) => {
//         set({ loading: true, error: null });
//         try {
//           const data = await usersApi.updateUser(userData);
//           if (get().currentUser?.id === userData.id) {
//             set({ currentUser: data });
//           }
//           set({ loading: false });
//           return data;
//         } catch (error) {
//           set({ error: error.message, loading: false });
//           throw error;
//         }
//       },

//       // Delete user
//       deleteUser: async (id) => {
//         set({ loading: true, error: null });
//         try {
//           await usersApi.deleteUser(id);
//           set({ loading: false });
//         } catch (error) {
//           set({ error: error.message, loading: false });
//           throw error;
//         }
//       },

//       // Clear error
//       clearError: () => {
//         set({ error: null });
//       },
//     }),
//     {
//       name: "user-storage",
//       partialize: (state) => ({
//         currentUser: state.currentUser,
//         isAuthenticated: state.isAuthenticated,
//       }),
//     }
//   )
// );

// export default useUserStore;



// src/store/userStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import usersApi from "../Api/userApi";

const useUserStore = create(
  persist(
    (set, get) => ({
      currentUser: null,
      users: [],
      loading: false,
      error: null,
      isAuthenticated: false,

      // Login user
      login: async (loginRequest) => {
        set({ loading: true, error: null });
        try {
          // Check if user exists
          const user = await usersApi.getUserByEmail(loginRequest);
          if (user.message === 'Login successful') {
            // Store password in sessionStorage for Basic Auth
            // Note: This is stored in sessionStorage (cleared on tab close) for security
            sessionStorage.setItem('user_password', loginRequest.password);
            
            set({
              currentUser: user,
              isAuthenticated: true,
              loading: false,
            });
            return user;
          } else {
            throw new Error('Invalid credentials');
          }
        } catch (error) {
          set({ error: error.message, loading: false });
          throw error;
        }
      },

      // Register user
      register: async (userData) => {
        set({ loading: true, error: null });
        try {
          const exists = await usersApi.checkUserExists(userData.email);
          if (exists) {
            throw new Error("User already exists");
          }
          const data = await usersApi.createUser(userData);
          set({ loading: false });
          return data;
        } catch (error) {
          set({ error: error.message, loading: false });
          throw error;
        }
      },

      // Logout user
      logout: () => {
        // Clear password from sessionStorage
        sessionStorage.removeItem('user_password');
        
        set({
          currentUser: null,
          isAuthenticated: false,
        });
      },

      // Fetch all users
      fetchUsers: async () => {
        set({ loading: true, error: null });
        try {
          const data = await usersApi.getAllUsers();
          set({ users: data, loading: false });
          return data;
        } catch (error) {
          set({ error: error.message, loading: false });
          throw error;
        }
      },

      // Fetch user by ID
      fetchUserById: async (id) => {
        set({ loading: true, error: null });
        try {
          const data = await usersApi.getUserById(id);
          set({ loading: false });
          return data;
        } catch (error) {
          set({ error: error.message, loading: false });
          throw error;
        }
      },

      // Update user
      updateUser: async (userData) => {
        set({ loading: true, error: null });
        try {
          const data = await usersApi.updateUser(userData);
          if (get().currentUser?.id === userData.id) {
            set({ currentUser: data });
          }
          set({ loading: false });
          return data;
        } catch (error) {
          set({ error: error.message, loading: false });
          throw error;
        }
      },

      // Delete user
      deleteUser: async (id) => {
        set({ loading: true, error: null });
        try {
          await usersApi.deleteUser(id);
          set({ loading: false });
        } catch (error) {
          set({ error: error.message, loading: false });
          throw error;
        }
      },

      // Clear error
      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: "user-storage",
      partialize: (state) => ({
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useUserStore;