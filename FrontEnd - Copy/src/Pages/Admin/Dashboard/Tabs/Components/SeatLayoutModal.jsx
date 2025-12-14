// src/Pages/Admin/Dashboard/Tabs/Components/SeatLayoutModal.jsx
import React, { useEffect } from 'react';
import useHallStore from "../../../../../store/hallStore";
import '../../Styles/modal.css';

const SeatLayoutModal = ({ hall, isOpen, onClose }) => {
    const { hallSeats, fetchHallSeats, loading } = useHallStore();

    useEffect(() => {
        if (hall && isOpen) {
            fetchHallSeats(hall.id);
        }
    }, [hall, isOpen]);

    if (!isOpen || !hall) return null;

    // Group seats by row
    const rows = {};
    hallSeats.forEach(seat => {
        if (!rows[seat.rowNo]) {
            rows[seat.rowNo] = [];
        }
        rows[seat.rowNo].push(seat);
    });

    // Sort rows and seats to display correctly
    const sortedRowKeys = Object.keys(rows).sort((a, b) => a - b);
    sortedRowKeys.forEach(key => {
        rows[key].sort((a, b) => a.seatNumber - b.seatNumber);
    });

    return (
        <div className="modal d-block modal-backdrop-custom" style={{ backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 1055 }}>
            <div className="modal-dialog modal-fullscreen modal-animation">
                <div className="modal-content bg-dark text-light">
                    <div className="modal-header border-secondary">
                        <h5 className="modal-title">Seat Layout: <span className="text-primary">{hall.name}</span></h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>
                    <div className="modal-body d-flex flex-column align-items-center bg-black overflow-auto">

                        <div className="screen-indicator mb-5 w-50 text-center">
                            <div className="screen-bar bg-secondary opacity-50 mb-2" style={{ height: '5px', width: '100%', borderRadius: '50%' }}></div>
                            <small className="text-muted">SCREEN</small>
                        </div>

                        {loading ? (
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading seats...</span>
                            </div>
                        ) : (
                            <div className="seat-grid d-flex flex-column gap-3">
                                {hallSeats.length === 0 && (
                                    <div className="text-muted p-5 text-center">No seats configured for this hall.</div>
                                )}
                                {sortedRowKeys.map(rowNum => (
                                    <div key={rowNum} className="d-flex align-items-center gap-2">
                                        <div className="row-label text-muted fw-bold me-2" style={{ width: '30px' }}>{String.fromCharCode(64 + parseInt(rowNum))}</div>
                                        <div className="d-flex gap-2">
                                            {rows[rowNum].map(seat => (
                                                <div
                                                    key={seat.id}
                                                    className={`seat-box ${seat.type === 'PREMIUM' ? 'seat-premium' : 'seat-normal'}`}
                                                    title={`Row ${seat.rowNo} Seat ${seat.seatNumber} (${seat.type})`}
                                                >
                                                    <small>{seat.seatNumber}</small>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="mt-5 d-flex gap-4">
                            <div className="d-flex align-items-center gap-2">
                                <div className="seat-box seat-normal" style={{ width: '20px', height: '20px' }}></div>
                                <small>Standard</small>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                                <div className="seat-box seat-premium" style={{ width: '20px', height: '20px' }}></div>
                                <small>Premium</small>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default SeatLayoutModal;
