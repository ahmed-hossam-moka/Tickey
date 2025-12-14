// src/Pages/Admin/Dashboard/Tabs/Components/DeleteConfirmationModal.jsx
import React from 'react';

const DeleteConfirmationModal = ({ isOpen, onConfirm, onCancel, itemName }) => {
    if (!isOpen) return null;

    return (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1060 }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content bg-dark text-light border-secondary">
                    <div className="modal-body text-center p-5">
                        <div className="mb-4">
                            <i className="bi bi-exclamation-circle text-danger display-1"></i>
                        </div>
                        <h3 className="mb-3">Are you sure?</h3>
                        <p className="text-secondary mb-4">
                            Do you really want to delete <strong>{itemName || 'this item'}</strong>? This process cannot be undone.
                        </p>
                        <div className="d-flex justify-content-center gap-3">
                            <button className="btn btn-secondary px-4" onClick={onCancel}>
                                Cancel
                            </button>
                            <button className="btn btn-danger px-4" onClick={onConfirm}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
