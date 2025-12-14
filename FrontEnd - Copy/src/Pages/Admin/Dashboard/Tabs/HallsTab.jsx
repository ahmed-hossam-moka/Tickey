// src/Pages/Admin/Dashboard/Tabs/HallsTab.jsx
import React, { useEffect, useState } from 'react';
import useHallStore from '../../../../store/hallStore';
import HallForm from './Components/HallForm';
import SeatLayoutModal from './Components/SeatLayoutModal';
import DeleteConfirmationModal from './Components/DeleteConfirmationModal';
import ToastNotification from '../../../../Shared/ToastNotification';
import '../Styles/movies.css'; // Reusing card styles
import '../Styles/seatlayout.css';

const HallsTab = () => {
    const { halls, fetchHalls, createHall, createHallWithSeats, updateHall, deleteHall, loading, error } = useHallStore();

    // UI State
    const [showForm, setShowForm] = useState(false);
    const [editingHall, setEditingHall] = useState(null);
    const [showSeatModal, setShowSeatModal] = useState(false);
    const [viewingHall, setViewingHall] = useState(null);

    // Feedback State
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [hallToDelete, setHallToDelete] = useState(null);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    useEffect(() => {
        fetchHalls();
    }, []);

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
    };

    const handleAddClick = () => {
        setEditingHall(null);
        setShowForm(true);
    };

    const handleEditClick = (hall) => {
        setEditingHall(hall);
        setShowForm(true);
    };

    const handleDeleteClick = (hall) => {
        setHallToDelete(hall);
        setDeleteModalOpen(true);
    };

    const handleViewSeats = (hall) => {
        setViewingHall(hall);
        setShowSeatModal(true);
    };

    const confirmDelete = async () => {
        if (!hallToDelete) return;
        try {
            await deleteHall(hallToDelete.id);
            showToast('Hall deleted successfully', 'success');
            setDeleteModalOpen(false);
            setHallToDelete(null);
        } catch (err) {
            showToast('Failed to delete hall: ' + err.message, 'error');
        }
    };

    const handleFormSubmit = async (formData, isWithSeats) => {
        try {
            if (editingHall) {
                await updateHall(editingHall.id, formData);
                showToast('Hall updated successfully', 'success');
            } else {
                if (isWithSeats) {
                    await createHallWithSeats(formData);
                } else {
                    await createHall(formData);
                }
                showToast('Hall created successfully', 'success');
            }
            setShowForm(false);
        } catch (err) {
            showToast('Failed to save hall: ' + err.message, 'error');
        }
    };

    return (
        <div className="dashboard-tab">
            <div className="tab-header">
                <h3 className="tab-title">Halls Management</h3>
                <button className="btn-add" onClick={handleAddClick}>
                    <i className="bi bi-plus-lg"></i> Add New Hall
                </button>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            {loading && !showForm && !showSeatModal ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-light" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="row g-4">
                    {halls.map(hall => (
                        <div key={hall.id} className="col-xl-4 col-md-6">
                            <div className="movie-admin-card p-4 h-100 d-flex flex-column justify-content-between">
                                <div>
                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                        <h4 className="movie-title fs-3 mb-0">{hall.name}</h4>
                                        <div className="badge bg-dark border border-secondary text-secondary">
                                            ID: {hall.id}
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center gap-3 text-secondary mb-4">
                                        <div className="d-flex align-items-center gap-2">
                                            <i className="bi bi-people-fill"></i>
                                            <span>Capacity: <strong className="text-light">{hall.totalSeats || hall.capacity}</strong></span>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex gap-2 border-top border-secondary pt-3 mt-auto">
                                    <button
                                        className="btn btn-sm btn-outline-info flex-grow-1"
                                        onClick={() => handleViewSeats(hall)}
                                    >
                                        <i className="bi bi-grid-3x3-gap-fill me-2"></i>
                                        Layout
                                    </button>
                                    <button
                                        className="action-btn btn-edit"
                                        onClick={() => handleEditClick(hall)}
                                        title="Edit"
                                        style={{ width: '38px', height: '38px' }}
                                    >
                                        <i className="bi bi-pencil-fill"></i>
                                    </button>
                                    <button
                                        className="action-btn btn-delete"
                                        onClick={() => handleDeleteClick(hall)}
                                        title="Delete"
                                        style={{ width: '38px', height: '38px' }}
                                    >
                                        <i className="bi bi-trash-fill"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {halls.length === 0 && !loading && (
                        <div className="col-12 text-center text-muted py-5">
                            <i className="bi bi-building display-4 mb-3 d-block"></i>
                            <p>No halls found. Create one to get started.</p>
                        </div>
                    )}
                </div>
            )}

            {/* Modals */}
            {showForm && (
                <HallForm
                    hall={editingHall}
                    onSubmit={handleFormSubmit}
                    onCancel={() => setShowForm(false)}
                    loading={loading}
                />
            )}

            <SeatLayoutModal
                hall={viewingHall}
                isOpen={showSeatModal}
                onClose={() => setShowSeatModal(false)}
            />

            <DeleteConfirmationModal
                isOpen={deleteModalOpen}
                onCancel={() => setDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                itemName={hallToDelete?.name}
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

export default HallsTab;
