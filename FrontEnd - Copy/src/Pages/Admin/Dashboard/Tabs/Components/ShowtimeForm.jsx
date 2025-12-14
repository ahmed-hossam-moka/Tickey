// src/Pages/Admin/Dashboard/Tabs/Components/ShowtimeForm.jsx
import React, { useState, useEffect } from 'react';
import useMovieStore from '../../../../../store/movieStore';
import useHallStore from '../../../../../store/hallStore';

const ShowtimeForm = ({ showtime, onSubmit, onCancel, loading }) => {
    // Stores
    const { movies, fetchMovies } = useMovieStore();
    const { halls, fetchHalls } = useHallStore();

    // Local State
    const [formData, setFormData] = useState({
        showDate: new Date().toISOString().split('T')[0],
        startTime: '12:00',
        movieId: '',
        hallId: ''
    });

    useEffect(() => {
        // Fetch dependencies
        if (movies.length === 0) fetchMovies();
        if (halls.length === 0) fetchHalls();
    }, []);

    useEffect(() => {
        if (showtime) {
            // Edit Mode
            const sTime = showtime.showTime || showtime.startTime || '';
            const mId = showtime.movieId || showtime.movie?.id || '';
            const hId = showtime.hallId || showtime.hall?.id || '';

            setFormData({
                showDate: showtime.showDate,
                startTime: sTime,
                movieId: mId,
                hallId: hId
            });
        }
    }, [showtime]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const selectedHall = halls.find(h => h.id.toString() === formData.hallId.toString());
        const hallCapacity = selectedHall ? (selectedHall.totalSeats || selectedHall.capacity) : 0;

        // Determine available seats
        let seats = hallCapacity;
        if (showtime && showtime.hallId && showtime.hallId.toString() === formData.hallId.toString()) {
            if (showtime.availableSeats !== undefined) {
                seats = showtime.availableSeats;
            }
        }

        // Nested payload as per User Request
        const payload = {
            movie: { id: parseInt(formData.movieId) },
            hall: { id: parseInt(formData.hallId) },
            showDate: formData.showDate,
            showTime: formData.startTime.length === 5 ? formData.startTime + ':00' : formData.startTime,
            availableSeats: seats
        };

        onSubmit(payload);
    };

    return (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1050 }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content bg-dark text-light border-secondary">
                    <div className="modal-header border-secondary">
                        <h5 className="modal-title">{showtime ? 'Edit Showtime' : 'Add New Showtime'}</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onCancel}></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">

                            {/* Date & Hall Row */}
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label text-secondary">Date</label>
                                    <input
                                        type="date"
                                        className="form-control bg-dark text-light border-secondary"
                                        name="showDate"
                                        value={formData.showDate}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label text-secondary">Hall</label>
                                    <select
                                        className="form-select bg-dark text-light border-secondary"
                                        name="hallId"
                                        value={formData.hallId}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select Hall</option>
                                        {halls.map(hall => (
                                            <option key={hall.id} value={hall.id}>{hall.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Movie Selection */}
                            <div className="mb-3">
                                <label className="form-label text-secondary">Movie</label>
                                <select
                                    className="form-select bg-dark text-light border-secondary"
                                    name="movieId"
                                    value={formData.movieId}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Movie</option>
                                    {movies.map(movie => (
                                        <option key={movie.id} value={movie.id}>
                                            {movie.title} ({movie.duration} min)
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Time Row */}
                            <div className="row">
                                <div className="col-md-12 mb-3">
                                    <label className="form-label text-secondary">Start Time</label>
                                    <input
                                        type="time"
                                        className="form-control bg-dark text-light border-secondary"
                                        name="startTime"
                                        value={formData.startTime}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer border-secondary">
                            <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? 'Saving...' : 'Save Schedule'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ShowtimeForm;
