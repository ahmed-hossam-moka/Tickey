// src/Pages/Admin/Dashboard/Tabs/MoviesTab.jsx
import React, { useEffect, useState } from 'react';
import useMovieStore from '../../../../store/movieStore';
import MovieForm from './Components/MovieForm';
import DeleteConfirmationModal from './Components/DeleteConfirmationModal';
import ToastNotification from '../../../../Shared/ToastNotification';
import '../Styles/movies.css';

const MoviesTab = () => {
    const { movies, fetchMovies, createMovie, updateMovie, deleteMovie, loading, error } = useMovieStore();

    // existing state
    const [showModal, setShowModal] = useState(false);
    const [editingMovie, setEditingMovie] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // new state for UI feedback
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [movieToDelete, setMovieToDelete] = useState(null);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    useEffect(() => {
        fetchMovies();
    }, []);

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
    };

    const handleAddClick = () => {
        setEditingMovie(null);
        setShowModal(true);
    };

    const handleEditClick = (movie) => {
        if (!movie.id) {
            showToast("Error: Movie ID is missing.", 'error');
            return;
        }
        setEditingMovie(movie);
        setShowModal(true);
    };

    // Triggered when clicking delete icon
    const handleDeleteClick = (id) => {
        const movie = movies.find(m => m.id === id);
        if (!movie || !movie.id) {
            showToast("Invalid ID for delete", 'error');
            return;
        }
        setMovieToDelete(movie);
        setDeleteModalOpen(true);
    };

    // Triggered when confirming in modal
    const confirmDelete = async () => {
        if (!movieToDelete) return;
        try {
            await deleteMovie(movieToDelete.id);
            showToast("Movie deleted successfully", 'success');
            setDeleteModalOpen(false);
            setMovieToDelete(null);
        } catch (err) {
            showToast("Failed to delete movie: " + err.message, 'error');
        }
    };

    const handleFormSubmit = async (formData) => {
        try {
            if (editingMovie) {
                await updateMovie(editingMovie.id, formData);
                showToast("Movie updated successfully", 'success');
            } else {
                await createMovie(formData);
                showToast("Movie created successfully", 'success');
            }
            setShowModal(false);
            // fetchMovies(); // Store updates optimistically
        } catch (err) {
            showToast("Failed to save movie: " + err.message, 'error');
            console.error("Failed to save movie:", err);
        }
    };

    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="dashboard-tab">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
                <div>
                    <h3 className="tab-title mb-1">Movies Management</h3>
                    <p className="text-secondary mb-0">Manage movie catalog and details</p>
                </div>

                <div className="d-flex gap-3">
                    <div className="movies-search-container">
                        <i className="bi bi-search search-icon"></i>
                        <input
                            type="text"
                            className="form-control movies-search-input"
                            placeholder="Search movies..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="btn-add" onClick={handleAddClick}>
                        <i className="bi bi-plus-lg me-2"></i> Add Movie
                    </button>
                </div>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            {loading && !showModal && !deleteModalOpen ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-light" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="row g-4">
                    {filteredMovies.map(movie => (
                        <div key={movie.id} className="col-xl-3 col-lg-4 col-md-6">
                            <div className="movie-admin-card">
                                <div className="movie-poster-container">
                                    <img
                                        src={movie.posterUrl || movie.image}
                                        className="movie-poster-img"
                                        alt={movie.title}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
                                        }}
                                    />
                                    <div className={`movie-status-badge ${movie.status === 'NOW_SHOWING' ? 'badge-now-showing' :
                                        movie.status === 'COMING_SOON' ? 'badge-coming-soon' : 'badge-ended'
                                        }`}>
                                        {movie.status.replace('_', ' ')}
                                    </div>
                                </div>
                                <div className="movie-card-content">
                                    <h5 className="movie-title" title={movie.title}>{movie.title}</h5>
                                    <div className="movie-meta">
                                        <span>{movie.genre}</span>
                                        <span>•</span>
                                        <span>{movie.duration}m</span>
                                    </div>
                                    <div className="movie-actions">
                                        <div className="movie-rating">
                                            <i className="bi bi-star-fill"></i>
                                            {movie.rating}
                                        </div>
                                        <div className="d-flex">
                                            <button
                                                className="action-btn btn-edit"
                                                onClick={() => handleEditClick(movie)}
                                                title="Edit Movie"
                                            >
                                                <i className="bi bi-pencil-fill"></i>
                                            </button>
                                            <button
                                                className="action-btn btn-delete"
                                                onClick={() => handleDeleteClick(movie.id)}
                                                title="Delete Movie"
                                            >
                                                <i className="bi bi-trash-fill"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {filteredMovies.length === 0 && !loading && (
                        <div className="col-12 text-center text-muted py-5">
                            <i className="bi bi-film display-4 mb-3 d-block"></i>
                            <p>No movies found matching your search.</p>
                        </div>
                    )}
                </div>
            )}

            {/* Forms and Modals */}
            {showModal && (
                <MovieForm
                    movie={editingMovie}
                    onSubmit={handleFormSubmit}
                    onCancel={() => setShowModal(false)}
                    loading={loading}
                />
            )}

            <DeleteConfirmationModal
                isOpen={deleteModalOpen}
                onCancel={() => setDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                itemName={movieToDelete?.title}
            />

            <ToastNotification
                show={toast.show}
                message={toast.message}
                type={toast.type}
                onClose={() => setToast({ ...toast, show: false })}
            />
        </div>
    );
};

export default MoviesTab;
