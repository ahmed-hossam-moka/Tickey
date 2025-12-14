import AdminRegister from "./Pages/Admin/AdminRegister";
import AdminLayout from "./Shared/AdminLayout";
import MoviesTab from "./Pages/Admin/Dashboard/Tabs/MoviesTab";
import HallsTab from "./Pages/Admin/Dashboard/Tabs/HallsTab";
import UsersTab from "./Pages/Admin/Dashboard/Tabs/UsersTab";
import ShowtimesTab from "./Pages/Admin/Dashboard/Tabs/ShowtimesTab";
import BookingsTab from "./Pages/Admin/Dashboard/Tabs/BookingsTab";

import Layout from "./Shared/Layout";
import Home from "./Pages/Home";
import AllMovies from "./Pages/AllMovies";
import MovieDetails from "./Pages/MovieDetails";
import SeatSelection from "./Pages/SeatSelection";
import MyBookings from "./Pages/MyBookings";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Public Routes with Main Layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<AllMovies />} />
            <Route path="/movie-details" element={<MovieDetails />} />
            <Route path="/seat-selection" element={<SeatSelection />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/admin/register" element={<AdminRegister />} />
          </Route>

          {/* Admin Routes with Admin Layout */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/movies" replace />} />
            <Route path="dashboard" element={<Navigate to="/admin/movies" replace />} />
            <Route path="movies" element={<MoviesTab />} />
            <Route path="halls" element={<HallsTab />} />
            <Route path="users" element={<UsersTab />} />
            <Route path="showtimes" element={<ShowtimesTab />} />
            <Route path="bookings" element={<BookingsTab />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
