// src/Pages/Admin/Dashboard/Tabs/Components/HallForm.jsx
import React, { useState, useEffect } from 'react';
import useHallStore from '../../../../../store/hallStore';

const HallForm = ({ hall, onSubmit, onCancel, loading }) => {
    // Get store action to fetch seats for calculation
    const { fetchHallSeats } = useHallStore();

    const [formData, setFormData] = useState({
        name: '',
        capacity: 0,
        rows: 0,
        seatsPerRow: 0
    });

    const [useAutoGenerate, setUseAutoGenerate] = useState(false);
    const [fetchingSeats, setFetchingSeats] = useState(false);

    useEffect(() => {
        if (hall) {
            // Edit Mode: Fetch seats to calculate current rows/cols
            setFormData(prev => ({ ...prev, name: hall.name, capacity: hall.capacity || 0 }));
            setUseAutoGenerate(true); // Always show rows/cols for edit

            const loadSeats = async () => {
                setFetchingSeats(true);
                try {
                    const seats = await fetchHallSeats(hall.id);
                    if (seats && seats.length > 0) {
                        // Calculate dimensions
                        const maxRow = Math.max(...seats.map(s => s.rowNo));
                        const maxSeat = Math.max(...seats.map(s => s.seatNumber));
                        setFormData(prev => ({
                            ...prev,
                            rows: maxRow,
                            seatsPerRow: maxSeat
                        }));
                    } else {
                        // No seats found, default to 0
                        setFormData(prev => ({ ...prev, rows: 0, seatsPerRow: 0 }));
                    }
                } catch (err) {
                    console.error("Failed to load seats for form", err);
                } finally {
                    setFetchingSeats(false);
                }
            };
            loadSeats();

        } else {
            // Create Mode
            setFormData({
                name: '',
                capacity: 0,
                rows: 10,
                seatsPerRow: 10
            });
            setUseAutoGenerate(true); // Default to auto-gen
        }
    }, [hall, fetchHallSeats]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCheckboxChange = (e) => {
        setUseAutoGenerate(e.target.checked);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Mode 1: Creating New Hall with Auto Gen Seats
        if (!hall && useAutoGenerate) {
            const payload = {
                name: formData.name,
                rows: parseInt(formData.rows),
                seatsPerRow: parseInt(formData.seatsPerRow)
            };
            onSubmit(payload, true);
            return;
        }

        // Mode 2: Update Hall
        if (hall) {
            const payload = {
                name: formData.name,
                rowCount: parseInt(formData.rows),
                seatsPerRow: parseInt(formData.seatsPerRow),
                // Calculate totalSeats to match backend expectations
                totalSeats: parseInt(formData.rows) * parseInt(formData.seatsPerRow)
            };
            // Note: Sending isWithSeats=false, calling updateHall
            onSubmit(payload, false);
            return;
        }

        // Mode 3: New Hall Manual
        const payload = {
            name: formData.name,
            capacity: parseInt(formData.capacity)
        };
        onSubmit(payload, false);
    };

    return (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1050 }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content bg-dark text-light border-secondary">
                    <div className="modal-header border-secondary">
                        <h5 className="modal-title">{hall ? 'Edit Hall' : 'Add New Hall'}</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onCancel}></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label text-secondary">Hall Name</label>
                                <input
                                    type="text"
                                    className="form-control bg-dark text-light border-secondary"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {!hall && (
                                <div className="mb-3 form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="autoGenerate"
                                        checked={useAutoGenerate}
                                        onChange={handleCheckboxChange}
                                    />
                                    <label className="form-check-label text-light" htmlFor="autoGenerate">
                                        Auto-generate Seats Layout
                                    </label>
                                </div>
                            )}

                            {fetchingSeats && (
                                <div className="text-center my-3 text-info">
                                    <span className="spinner-border spinner-border-sm me-2"></span>
                                    Loading current configuration...
                                </div>
                            )}

                            {hall && (
                                <div className="alert alert-warning py-2 mb-3">
                                    <small><i className="bi bi-exclamation-triangle me-1"></i> <strong>Warning:</strong> Updating dimensions will likely reset all seat data.</small>
                                </div>
                            )}

                            {(useAutoGenerate || hall) && !fetchingSeats ? (
                                <div className="row">
                                    <div className="col-6 mb-3">
                                        <label className="form-label text-secondary">Number of Rows</label>
                                        <input
                                            type="number"
                                            className="form-control bg-dark text-light border-secondary"
                                            name="rows"
                                            value={formData.rows}
                                            onChange={handleChange}
                                            min="1"
                                            required
                                        />
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label className="form-label text-secondary">Seats per Row</label>
                                        <input
                                            type="number"
                                            className="form-control bg-dark text-light border-secondary"
                                            name="seatsPerRow"
                                            value={formData.seatsPerRow}
                                            onChange={handleChange}
                                            min="1"
                                            required
                                        />
                                    </div>
                                    <div className="col-12">
                                        <small className="text-info">
                                            <i className="bi bi-info-circle me-1"></i>
                                            New Total Seats: {formData.rows * formData.seatsPerRow}
                                        </small>
                                    </div>
                                </div>
                            ) : null}

                            {!useAutoGenerate && !hall && (
                                <div className="mb-3">
                                    <label className="form-label text-secondary">Total Capacity</label>
                                    <input
                                        type="number"
                                        className="form-control bg-dark text-light border-secondary"
                                        name="capacity"
                                        value={formData.capacity}
                                        onChange={handleChange}
                                        min="0"
                                    />
                                </div>
                            )}

                        </div>
                        <div className="modal-footer border-secondary">
                            <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
                            <button type="submit" className="btn btn-primary" disabled={loading || fetchingSeats}>
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default HallForm;
