// src/Pages/Admin/Dashboard/Tabs/ShowtimesTab.jsx
import React, { useEffect, useState } from 'react';
import useShowtimeStore from '../../../../store/showtimesStore';
import ShowtimeForm from './Components/ShowtimeForm';
import DeleteConfirmationModal from './Components/DeleteConfirmationModal';
import ToastNotification from '../../../../Shared/ToastNotification';
import '../Styles/movies.css'; // Reuse card styles

const ShowtimesTab = () => {
    const { showtimes, fetchShowtimesByDate, createShowtime, updateShowtime, deleteShowtime, loading, error } = useShowtimeStore();

    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    // UI State
    const [showForm, setShowForm] = useState(false);
    const [editingShowtime, setEditingShowtime] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    useEffect(() => {
        fetchShowtimesByDate(selectedDate);
    }, [selectedDate]);

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
    };

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleAddClick = () => {
        setEditingShowtime(null);
        setShowForm(true);
    };

    const handleEditClick = (showtime) => {
        setEditingShowtime(showtime);
        setShowForm(true);
    };

    const handleDeleteClick = (showtime) => {
        setItemToDelete(showtime);
        setDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!itemToDelete) return;
        try {
            await deleteShowtime(itemToDelete.id);
            showToast('Showtime cancelled successfully', 'success');
            setDeleteModalOpen(false);
            setItemToDelete(null);
        } catch (err) {
            showToast('Failed to delete showtime: ' + err.message, 'error');
        }
    };

    const handleFormSubmit = async (payload) => {
        try {
            if (editingShowtime) {
                await updateShowtime(editingShowtime.id, payload);
                showToast('Showtime updated successfully', 'success');
            } else {
                await createShowtime(payload);
                showToast('Showtime scheduled successfully', 'success');
                // Refresh if the date is the same, or maybe we assume the store does it (it pushes to list)
                // But list is by date. If we created for a different date, we won't see it.
                if (payload.showDate !== selectedDate) {
                    showToast('Showtime created for ' + payload.showDate + '. Switch date to view.', 'info');
                }
            }
            setShowForm(false);
            // Refetch to be safe/consistent
            fetchShowtimesByDate(selectedDate);
        } catch (err) {
            showToast('Failed to save showtime: ' + err.message, 'error');
        }
    };

    const formatTo12Hour = (timeStr) => {
        if (!timeStr) return '';
        const [hours, minutes] = timeStr.split(':').map(Number);
        const date = new Date();
        date.setHours(hours, minutes || 0, 0);
        return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
    };

    const parseDuration = (duration) => {
        if (!duration) return 0;
        const str = duration.toString();

        let totalMinutes = 0;
        const hoursMatch = str.match(/(\d+)\s*h/i);
        if (hoursMatch) totalMinutes += parseInt(hoursMatch[1]) * 60;

        const minutesMatch = str.match(/(\d+)\s*m/i);
        if (minutesMatch) totalMinutes += parseInt(minutesMatch[1]);

        if (totalMinutes === 0) {
            return parseInt(str) || 0;
        }
        return totalMinutes;
    };

    const calculateEndTime = (startTime, durationVal) => {
        if (!startTime || !durationVal) return '';
        const duration = parseDuration(durationVal);
        if (duration === 0) return '';

        const [hours, minutes] = startTime.split(':').map(Number);
        const date = new Date();
        date.setHours(hours, minutes, 0);
        date.setMinutes(date.getMinutes() + duration);
        return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
    };

    const getMovieTitle = (st) => st.movieTitle || st.movie?.title || 'Unknown Movie';
    const getHallName = (st) => st.hallName || st.hall?.name || 'Unknown Hall';
    const getShowTime = (st) => st.showTime || st.startTime || '';
    const getDuration = (st) => st.movieDuration || st.movie?.duration || 0;

    return (
        <div className="dashboard-tab">
            <div className="tab-header d-flex align-items-center justify-content-between mb-4">
                <div className="d-flex align-items-center gap-3">
                    <h3 className="tab-title mb-0">Showtimes</h3>
                    <input
                        type="date"
                        className="showtimes-date-picker form-control"
                        value={selectedDate}
                        onChange={handleDateChange}
                    />
                </div>
                <button className="btn-add" onClick={handleAddClick}>
                    <i className="bi bi-plus-lg"></i> Schedule Showtime
                </button>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            {loading && !showForm ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-light" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="row g-4">
                    {showtimes.map(showtime => (
                        <div key={showtime.id} className="col-xl-4 col-md-6">
                            <div className="movie-admin-card p-3 h-100 d-flex flex-column">
                                <div className="d-flex justify-content-between align-items-start mb-2">
                                    <h5 className="text-light mb-0">{getMovieTitle(showtime)}</h5>
                                    <span className="badge bg-primary">{getHallName(showtime)}</span>
                                </div>
                                <div className="text-secondary mb-3">
                                    <div className="d-flex align-items-center gap-2 mb-1">
                                        <i className="bi bi-clock"></i>
                                        <span>
                                            {formatTo12Hour(getShowTime(showtime))} - {calculateEndTime(getShowTime(showtime), getDuration(showtime))}
                                        </span>
                                    </div>
                                    <div className="d-flex align-items-center gap-2">
                                        <i className="bi bi-calendar"></i>
                                        <span>{showtime.showDate}</span>
                                    </div>
                                </div>

                                <div className="mt-auto d-flex justify-content-end gap-2 pt-2 border-top border-secondary">
                                    <button
                                        className="btn btn-sm btn-outline-secondary"
                                        onClick={() => handleEditClick(showtime)}
                                    >
                                        <i className="bi bi-pencil-fill"></i>
                                    </button>
                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => handleDeleteClick(showtime)}
                                    >
                                        <i className="bi bi-trash-fill"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {showtimes.length === 0 && !loading && (
                        <div className="col-12 text-center text-muted py-5">
                            <i className="bi bi-calendar-x display-4 mb-3 d-block"></i>
                            <p>No showtimes scheduled for {selectedDate}.</p>
                        </div>
                    )}
                </div>
            )}

            {showForm && (
                <ShowtimeForm
                    showtime={editingShowtime}
                    onSubmit={handleFormSubmit}
                    onCancel={() => setShowForm(false)}
                    loading={loading}
                />
            )}

            <DeleteConfirmationModal
                isOpen={deleteModalOpen}
                onCancel={() => setDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                itemName={`Showtime ID: ${itemToDelete?.id}`}
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

export default ShowtimesTab;
