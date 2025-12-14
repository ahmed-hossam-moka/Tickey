// src/Pages/MyBookings.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useBookingStore from '../store/bookingStore';
import useUserStore from '../store/userStore';
import '../styles/myBookings.css';

const MyBookings = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all'); // all, confirmed, pending, cancelled

  const {
    bookings,
    loading,
    error,
    fetchUserBookings,
    cancelBooking,
    clearError
  } = useBookingStore();

  const { currentUser, isAuthenticated } = useUserStore();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Fetch user bookings
    const userId = currentUser.userId || currentUser.id;
    if (userId) {
      fetchUserBookings(userId);
    }
  }, [isAuthenticated, currentUser, navigate, fetchUserBookings]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await cancelBooking(bookingId);
        alert('Booking cancelled successfully!');

        // Refresh bookings
        const userId = currentUser.userId || currentUser.id;
        fetchUserBookings(userId);
      } catch (err) {
        alert('Failed to cancel booking: ' + err.message);
      }
    }
  };

  const getFilteredBookings = () => {
    if (filter === 'all') return bookings;
    return bookings.filter(booking =>
      booking.status.toLowerCase() === filter.toLowerCase()
    );
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'status-confirmed';
      case 'pending':
        return 'status-pending';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return 'status-default';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'N/A';
    return timeString;
  };

  const filteredBookings = getFilteredBookings();

  return (
    <div className="my-bookings-page">
      <div className="container">
        <div className="bookings-header">
          <button className="btn-back" onClick={() => navigate('/')}>
            <i className="bi bi-arrow-left"></i> Back
          </button>
          <h1 className="page-title">My Bookings</h1>
        </div>

        {error && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <i className="bi bi-exclamation-triangle-fill"></i> {error}
            <button
              type="button"
              className="btn-close"
              onClick={clearError}
              aria-label="Close"
            ></button>
          </div>
        )}

        <div className="filter-section">
          <div className="filter-buttons">
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              className={`filter-btn ${filter === 'confirmed' ? 'active' : ''}`}
              onClick={() => setFilter('confirmed')}
            >
              Confirmed
            </button>
            <button
              className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
              onClick={() => setFilter('pending')}
            >
              Pending
            </button>
            <button
              className={`filter-btn ${filter === 'cancelled' ? 'active' : ''}`}
              onClick={() => setFilter('cancelled')}
            >
              Cancelled
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading bookings...</span>
            </div>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="empty-state">
            <i className="bi bi-ticket-perforated empty-icon"></i>
            <h3>No bookings found</h3>
            <p>
              {filter === 'all'
                ? "You haven't made any bookings yet."
                : `No ${filter} bookings found.`}
            </p>
            <button
              className="btn-browse"
              onClick={() => navigate('/')}
            >
              Browse Movies
            </button>
          </div>
        ) : (
          <div className="bookings-list">
            {filteredBookings.map((booking) => (
              <div key={booking.id} className="booking-card">
                <div className="booking-header">
                  <div className="booking-movie-info">
                    <h3 className="movie-title">{booking.movieTitle || 'Movie Title'}</h3>
                    <span className={`booking-status ${getStatusClass(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="booking-id">
                    Booking #{booking.id}
                  </div>
                </div>

                <div className="booking-details">
                  <div className="detail-row">
                    <div className="detail-item">
                      <i className="bi bi-geo-alt"></i>
                      <div>
                        <small>Hall</small>
                        <p>{booking.hallName || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="detail-item">
                      <i className="bi bi-calendar-event"></i>
                      <div>
                        <small>Date</small>
                        <p>{formatDate(booking.showDate)}</p>
                      </div>
                    </div>
                    <div className="detail-item">
                      <i className="bi bi-clock"></i>
                      <div>
                        <small>Time</small>
                        <p>{formatTime(booking.showTime)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="detail-row">
                    <div className="detail-item full-width">
                      <i className="bi bi-person-check"></i>
                      <div>
                        <small>Booked Seats</small>
                        <p className="seats-list">
                          {booking.bookedSeats && booking.bookedSeats.length > 0
                            ? booking.bookedSeats.map(seat =>
                              `Row ${seat.rowNo}, Seat ${seat.seatNumber}`
                            ).join(' • ')
                            : 'No seat information'
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="booking-footer">
                    <div className="booking-price">
                      <small>Total Amount</small>
                      <h4>EGP {booking.totalPrice || 0}</h4>
                    </div>

                    {booking.status.toLowerCase() !== 'cancelled' && booking.status.toLowerCase() !== 'confirmed' && (
                      <button
                        className="btn-cancel"
                        onClick={() => handleCancelBooking(booking.id)}
                        disabled={loading}
                      >
                        <i className="bi bi-x-circle"></i>
                        Cancel Booking
                      </button>
                    )}

                    {booking.status.toLowerCase() === 'cancelled' && booking.cancelledAt && (
                      <small className="cancelled-info">
                        Cancelled on {formatDate(booking.cancelledAt)}
                      </small>
                    )}
                  </div>

                  <div className="booking-date-info">
                    <small>
                      <i className="bi bi-calendar-check"></i>
                      Booked on {formatDate(booking.bookingDate)}
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;