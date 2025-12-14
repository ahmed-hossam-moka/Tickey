// src/Pages/Admin/Dashboard/Tabs/Components/MovieForm.jsx
import React, { useState, useEffect } from 'react';

const MovieForm = ({ movie, onSubmit, onCancel, loading }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        duration: '',
        genre: '',
        rating: '',
        posterUrl: '',
        releaseDate: '',
        status: 'COMING_SOON'
    });

    useEffect(() => {
        if (movie) {
            setFormData({
                ...movie,
                // Format date for datetime-local input if needed, or handle as string
                releaseDate: movie.releaseDate ? new Date(movie.releaseDate).toISOString().slice(0, 16) : ''
            });
        }
    }, [movie]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            duration: parseInt(formData.duration),
            rating: parseFloat(formData.rating)
        });
    };

    return (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content bg-dark text-light border-secondary">
                    <div className="modal-header border-secondary">
                        <h5 className="modal-title">{movie ? 'Edit Movie' : 'Add New Movie'}</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onCancel}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Title</label>
                                    <input
                                        type="text"
                                        className="form-control bg-dark text-light border-secondary"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Genre</label>
                                    <input
                                        type="text"
                                        className="form-control bg-dark text-light border-secondary"
                                        name="genre"
                                        value={formData.genre}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <textarea
                                    className="form-control bg-dark text-light border-secondary"
                                    name="description"
                                    rows="3"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>

                            <div className="row">
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Duration (minutes)</label>
                                    <input
                                        type="number"
                                        className="form-control bg-dark text-light border-secondary"
                                        name="duration"
                                        value={formData.duration}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Rating (0-5)</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        max="5"
                                        className="form-control bg-dark text-light border-secondary"
                                        name="rating"
                                        value={formData.rating}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Status</label>
                                    <select
                                        className="form-select bg-dark text-light border-secondary"
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="COMING_SOON">Coming Soon</option>
                                        <option value="NOW_SHOWING">Now Showing</option>
                                        <option value="ENDED">Ended</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Poster URL</label>
                                    <input
                                        type="url"
                                        className="form-control bg-dark text-light border-secondary"
                                        name="posterUrl"
                                        value={formData.posterUrl}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Release Date</label>
                                    <input
                                        type="datetime-local"
                                        className="form-control bg-dark text-light border-secondary"
                                        name="releaseDate"
                                        value={formData.releaseDate}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="d-flex justify-content-end gap-2 mt-4">
                                <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                    {loading ? 'Saving...' : 'Save Movie'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieForm;
