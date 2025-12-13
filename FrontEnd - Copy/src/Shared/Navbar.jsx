// src/Shared/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore";
import "../styles/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser, isAuthenticated, logout } = useUserStore();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg sticky-top">
        <div className="container">
          <Link className="navbar-brand" to="/">
            🎬 Tickey
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/movies">
                  Movies
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/my-bookings">
                  Bookings
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Coming Soon
                </Link>
              </li>
            </ul>
            <div className="auth-buttons">
              {isAuthenticated ? (
                <>
                  <span className="navbar-text me-3">
                    <i className="bi bi-person-circle"></i> {currentUser?.name}
                  </span>
                  <button 
                    onClick={handleLogout}
                    className="btn btn-login"
                  >
                    <i className="bi bi-box-arrow-right"></i> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn btn-login">
                    <i className="bi bi-person"></i> Login
                  </Link>
                  <Link to="/signup" className="btn btn-signup">
                    <i className="bi bi-person-plus"></i> Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;