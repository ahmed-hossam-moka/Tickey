import Layout from "./Shared/Layout";
import Home from "./Pages/Home";
import AllMovies from "./Pages/AllMovies";
import MovieDetails from "./Pages/MovieDetails";
import SeatSelection from "./Pages/SeatSelection";
import MyBookings from "./Pages/MyBookings";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<AllMovies />} />
            <Route path="/movie-details" element={<MovieDetails />} />
            <Route path="/seat-selection" element={<SeatSelection />} />
            <Route path="/my-bookings" element={<MyBookings />} /> 
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
