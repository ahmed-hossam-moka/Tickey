// // src/Api/axiosInstance.js
// import axios from 'axios';

// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:8080',
//   timeout: 10000,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Request interceptor
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // You can add auth token here if needed
//     // const token = localStorage.getItem('token');
//     // if (token) {
//     //   config.headers.Authorization = `Bearer ${token}`;
//     // }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor
// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response) {
//       // Handle specific error codes
//       switch (error.response.status) {
//         case 401:
//           // Unauthorized - redirect to login
//           console.error('Unauthorized access');
//           break;
//         case 404:
//           console.error('Resource not found');
//           break;
//         case 500:
//           console.error('Server error');
//           break;
//         default:
//           console.error('An error occurred:', error.response.data);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;


// src/Api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Get user credentials from localStorage
    const userStorage = localStorage.getItem('user-storage');
    
    if (userStorage) {
      try {
        const parsed = JSON.parse(userStorage);
        const user = parsed.state?.currentUser;
        
        // If user is authenticated and we have email, add Basic Auth
        if (user && user.email) {
          // Get password from sessionStorage (stored temporarily during login)
          const password = sessionStorage.getItem('user_password');
          
          if (password) {
            // Create Basic Auth header
            const credentials = btoa(`${user.email}:${password}`);
            config.headers.Authorization = `Basic ${credentials}`;
          }
        }
      } catch (error) {
        console.error('Error parsing user storage:', error);
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Handle specific error codes
      switch (error.response.status) {
        case 401:
          // Unauthorized - clear credentials and redirect to login
          console.error('Unauthorized access');
          sessionStorage.removeItem('user_password');
          // Optionally redirect to login
          // window.location.href = '/login';
          break;
        case 404:
          console.error('Resource not found');
          break;
        case 500:
          console.error('Server error');
          break;
        default:
          console.error('An error occurred:', error.response.data);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
