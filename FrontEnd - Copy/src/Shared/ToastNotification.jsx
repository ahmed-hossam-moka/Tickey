// src/Shared/ToastNotification.jsx
import React, { useEffect } from 'react';
import './toast.css';

const ToastNotification = ({ show, message, type = 'success', onClose }) => {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000); // Auto close after 3 seconds
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    if (!show) return null;

    const iconClass = type === 'success' ? 'bi-check-circle-fill' : 'bi-x-circle-fill';
    const typeClass = type === 'success' ? 'toast-success' : 'toast-error';

    return (
        <div className={`custom-toast ${typeClass} show`}>
            <i className={`bi ${iconClass} me-2`}></i>
            <span>{message}</span>
            <button type="button" className="btn-close btn-close-white ms-auto" onClick={onClose}></button>
        </div>
    );
};

export default ToastNotification;
