// src/Shared/AdminLayout.jsx
import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import useUserStore from '../store/userStore';
import '../Pages/Admin/Dashboard/Styles/dashboard.css';

const AdminLayout = () => {
    const { currentUser, logout } = useUserStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="admin-dashboard">
            <div className="dashboard-header">
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                            <h2 className="dashboard-title">Admin Dashboard</h2>
                            <p className="text-secondary mb-0">Welcome back, {currentUser?.name || 'Admin'}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="btn-logout"
                        >
                            <i className="bi bi-box-arrow-right"></i> Logout
                        </button>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="dashboard-nav">
                    <NavLink
                        to="/admin/movies"
                        className={({ isActive }) => `dashboard-tab-btn ${isActive ? 'active' : ''}`}
                    >
                        <i className="bi bi-film me-2"></i> Movies
                    </NavLink>
                    <NavLink
                        to="/admin/halls"
                        className={({ isActive }) => `dashboard-tab-btn ${isActive ? 'active' : ''}`}
                    >
                        <i className="bi bi-building me-2"></i> Halls
                    </NavLink>
                    <NavLink
                        to="/admin/showtimes"
                        className={({ isActive }) => `dashboard-tab-btn ${isActive ? 'active' : ''}`}
                    >
                        <i className="bi bi-clock-history me-2"></i> Showtimes
                    </NavLink>
                    <NavLink
                        to="/admin/bookings"
                        className={({ isActive }) => `dashboard-tab-btn ${isActive ? 'active' : ''}`}
                    >
                        <i className="bi bi-ticket-perforated me-2"></i> Bookings
                    </NavLink>
                    <NavLink
                        to="/admin/users"
                        className={({ isActive }) => `dashboard-tab-btn ${isActive ? 'active' : ''}`}
                    >
                        <i className="bi bi-people me-2"></i> Users
                    </NavLink>
                </div>

                <div className="dashboard-content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
