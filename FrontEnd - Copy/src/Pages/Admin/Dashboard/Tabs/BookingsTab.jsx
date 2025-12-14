// src/Pages/Admin/Dashboard/Tabs/BookingsTab.jsx
import React, { useEffect, useState } from 'react';
import useBookingStore from '../../../../store/bookingStore';
import useUserStore from '../../../../store/userStore';
import useMovieStore from '../../../../store/movieStore';
import ToastNotification from '../../../../Shared/ToastNotification';
import '../Styles/bookings.css';

const BookingsTab = () => {
    const { bookings, fetchBookings, cancelBooking, confirmBooking, loading, error } = useBookingStore();
    const { users, fetchUsers } = useUserStore();
    const { movies, fetchMovies } = useMovieStore();

    // UI State
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBooking, setSelectedBooking] = useState(null); // For details modal
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    // Feedback State
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    useEffect(() => {
        const loadData = async () => {
            console.log("Fetching bookings data...");
            await fetchBookings();
            await fetchUsers();
            await fetchMovies();
        };
        loadData();
    }, []);

    useEffect(() => {
        if (bookings.length > 0) {
            console.log("Bookings loaded:", bookings);
        }
    }, [bookings]);

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
    };

    const handleViewDetails = (booking) => {
        setSelectedBooking(booking);
        setShowDetailsModal(true);
    };

    const handleConfirmBooking = async (id) => {
        try {
            await confirmBooking(id);
            showToast('Booking confirmed successfully', 'success');
            if (selectedBooking && selectedBooking.id === id) {
                setSelectedBooking(prev => ({ ...prev, status: 'CONFIRMED' }));
            }
        } catch (err) {
            showToast('Failed to confirm booking: ' + err.message, 'error');
        }
    };

    const handleCancelBooking = async (id) => {
        if (window.confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) {
            try {
                await cancelBooking(id);
                showToast('Booking cancelled successfully', 'success');
                if (selectedBooking && selectedBooking.id === id) {
                    setSelectedBooking(prev => ({ ...prev, status: 'CANCELLED' }));
                }
            } catch (err) {
                showToast('Failed to cancel booking: ' + err.message, 'error');
            }
        }
    };

    // Data Helpers
    const getUserName = (booking) => {
        if (booking.user?.name) return booking.user.name;
        if (booking.userName) return booking.userName;
        const matchedUser = users.find(u => u.id === booking.userId);
        return matchedUser ? matchedUser.name : 'Unknown User';
    };

    const getUserEmail = (booking) => {
        if (booking.user?.email) return booking.user.email;
        const matchedUser = users.find(u => u.id === booking.userId);
        return matchedUser ? matchedUser.email : '-';
    };

    const getMovieTitle = (booking) => {
        if (booking.showtime?.movie?.title) return booking.showtime.movie.title;
        if (booking.movieTitle) return booking.movieTitle;
        const mid = booking.movieId || booking.showtime?.movieId;
        if (mid) {
            const m = movies.find(mv => mv.id === mid);
            if (m) return m.title;
        }
        return 'Unknown Movie';
    };

    const getPoster = (booking) => {
        if (booking.showtime?.movie?.posterUrl) return booking.showtime.movie.posterUrl;
        const mid = booking.movieId || booking.showtime?.movieId;
        if (mid) {
            const m = movies.find(mv => mv.id === mid);
            if (m) return m.posterUrl;
        }
        return null;
    };

    const formatDate = (dateString, timeString) => {
        if (!dateString) return '';
        const d = new Date(dateString);
        return `${d.toLocaleDateString()} ${timeString || ''}`;
    };

    const getShowDate = (booking) => {
        const date = booking.showtime?.showDate || booking.showDate || booking.bookingDate;
        const time = booking.showtime?.showTime || booking.showTime;
        if (!date) return 'Invalid Date';
        return formatDate(date, time);
    };

    // Filter bookings and sort new to old
    const filteredBookings = bookings.filter(booking => {
        const searchLower = searchTerm.toLowerCase();
        const userName = getUserName(booking).toLowerCase();
        const userEmail = getUserEmail(booking).toLowerCase();
        const movieTitle = getMovieTitle(booking).toLowerCase();
        const idMatch = booking.id?.toString().includes(searchLower);

        return userName.includes(searchLower) ||
            userEmail.includes(searchLower) ||
            movieTitle.includes(searchLower) ||
            idMatch;
    }).sort((a, b) => {
        return b.id - a.id;
    });

    return (
        <div className="dashboard-tab">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
                <div>
                    <h3 className="tab-title mb-1">Bookings Management</h3>
                    <p className="text-secondary mb-0">View and manage customer reservations</p>
                </div>

                <div className="bookings-search-container">
                    <i className="bi bi-search search-icon"></i>
                    <input
                        type="text"
                        className="form-control bookings-search-input"
                        placeholder="Search users, movies, or IDs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            {loading && !bookings.length ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-light" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="bookings-table-container">
                    <table className="bookings-table w-100">
                        <thead>
                            <tr>
                                <th className="ps-4">ID</th>
                                <th>User</th>
                                <th>Movie</th>
                                <th>Showtime</th>
                                <th>Seats</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th className="text-end pe-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBookings.map(booking => (
                                <tr key={booking.id}>
                                    <td className="ps-4 text-secondary">#{booking.id}</td>
                                    <td>
                                        <div className="d-flex flex-column">
                                            <span className="fw-bold text-light">{getUserName(booking)}</span>
                                            <small className="text-secondary">{getUserEmail(booking)}</small>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center gap-2">
                                            {getPoster(booking) && (
                                                <img
                                                    src={getPoster(booking)}
                                                    alt="Poster"
                                                    className="rounded"
                                                    style={{ width: '30px', height: '45px', objectFit: 'cover' }}
                                                />
                                            )}
                                            <span className="text-light">{getMovieTitle(booking)}</span>
                                        </div>
                                    </td>
                                    <td className="text-light">
                                        {getShowDate(booking)}
                                    </td>
                                    <td className="text-center">
                                        <span className="badge bg-secondary">{booking.seats?.length || 0}</span>
                                    </td>
                                    <td className="fw-bold text-success">${booking.totalPrice}</td>
                                    <td>
                                        <span className={`status-badge ${booking.status?.toLowerCase() || 'pending'}`}>
                                            {booking.status || 'Pending'}
                                        </span>
                                    </td>
                                    <td className="text-end pe-4">
                                        <button
                                            className="btn btn-sm btn-outline-light me-2"
                                            onClick={() => handleViewDetails(booking)}
                                            title="View Details"
                                        >
                                            <i className="bi bi-eye"></i>
                                        </button>
                                        {booking.status === 'PENDING' && (
                                            <button
                                                className="btn btn-sm btn-outline-success me-2"
                                                onClick={() => handleConfirmBooking(booking.id)}
                                                title="Confirm Booking"
                                            >
                                                <i className="bi bi-check-lg"></i>
                                            </button>
                                        )}
                                        {booking.status !== 'CANCELLED' && (
                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => handleCancelBooking(booking.id)}
                                                title="Cancel Booking"
                                            >
                                                <i className="bi bi-x-lg"></i>
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {filteredBookings.length === 0 && (
                                <tr>
                                    <td colSpan="8" className="text-center py-5 text-muted">
                                        No bookings found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Booking Details Modal */}
            {showDetailsModal && selectedBooking && (
                <div className="modal-backdrop fade show" style={{ zIndex: 1040 }}></div>
            )}

            {showDetailsModal && selectedBooking && (
                <div className="modal fade show d-block" style={{ zIndex: 1050 }} tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content bg-dark border-secondary text-light">
                            <div className="modal-header border-secondary">
                                <h5 className="modal-title">Booking Details #{selectedBooking.id}</h5>
                                <button type="button" className="btn-close btn-close-white" onClick={() => setShowDetailsModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <h6 className="text-secondary text-uppercase small">Movie</h6>
                                    <p className="fs-5 fw-bold mb-1">{getMovieTitle(selectedBooking)}</p>
                                    <span className="badge bg-secondary me-2">{selectedBooking.showtime?.movie?.genre || '-'}</span>
                                    <span className="text-muted small">{selectedBooking.showtime?.movie?.duration || '-'} min</span>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-6">
                                        <h6 className="text-secondary text-uppercase small">Hall</h6>
                                        <p>{selectedBooking.showtime?.hall?.name || 'Unknown Hall'}</p>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="text-secondary text-uppercase small">Showtime</h6>
                                        <p>{getShowDate(selectedBooking)}</p>
                                    </div>
                                    <div className="col-6 mt-2">
                                        <h6 className="text-secondary text-uppercase small">Status</h6>
                                        <span className={`badge ${selectedBooking.status === 'CONFIRMED' ? 'bg-success' : selectedBooking.status === 'CANCELLED' ? 'bg-danger' : 'bg-warning text-dark'}`}>
                                            {selectedBooking.status || 'PENDING'}
                                        </span>
                                    </div>
                                    <div className="col-6 mt-2">
                                        <h6 className="text-secondary text-uppercase small">Booked On</h6>
                                        <p>{selectedBooking.bookingDate ? new Date(selectedBooking.bookingDate).toLocaleDateString() : '-'}</p>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <h6 className="text-secondary text-uppercase small mb-2">Selected Seats ({selectedBooking.seats?.length || 0})</h6>
                                    <div className="d-flex flex-wrap gap-2">
                                        {selectedBooking.seats?.map((seat, index) => (
                                            <span key={index} className="seat-tag">
                                                {seat.rowName}{seat.seatNumber}
                                            </span>
                                        ))}
                                        {(!selectedBooking.seats || selectedBooking.seats.length === 0) && (
                                            <span className="text-muted fst-italic">No seat details available</span>
                                        )}
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between align-items-center border-top border-secondary pt-3">
                                    <span className="text-secondary">Total Paid</span>
                                    <span className="fs-4 fw-bold text-success">${selectedBooking.totalPrice}</span>
                                </div>
                            </div>
                            <div className="modal-footer border-secondary">
                                {selectedBooking.status === 'PENDING' && (
                                    <button
                                        type="button"
                                        className="btn btn-outline-success"
                                        onClick={() => handleConfirmBooking(selectedBooking.id)}
                                    >
                                        Confirm Booking
                                    </button>
                                )}
                                {selectedBooking.status !== 'CANCELLED' && (
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger"
                                        onClick={() => handleCancelBooking(selectedBooking.id)}
                                    >
                                        Cancel Booking
                                    </button>
                                )}
                                <button type="button" className="btn btn-light" onClick={() => setShowDetailsModal(false)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <ToastNotification
                show={toast.show}
                message={toast.message}
                type={toast.type}
                onClose={() => setToast({ ...toast, show: false })}
            />
        </div>
    );
};

export default BookingsTab;
