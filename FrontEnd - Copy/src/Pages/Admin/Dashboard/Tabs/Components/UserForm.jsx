import React, { useState, useEffect } from 'react';

const UserForm = ({ user, onSubmit, onCancel, loading }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        role: 'USER',
        password: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phoneNumber: user.phoneNumber || '',
                role: user.role || 'USER',
                password: '' // Don't show existing password
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Remove password if empty (for edits)
        const payload = { ...formData };
        if (!payload.password) {
            delete payload.password;
        }

        // If editing, preserve ID (though usually parent handles ID)
        // Parent will verify if it's create or update
        onSubmit(payload);
    };

    return (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1050 }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content bg-dark text-light border-secondary">
                    <div className="modal-header border-secondary">
                        <h5 className="modal-title">{user ? 'Edit User' : 'Add New User'}</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onCancel}></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">

                            {/* Name & Role */}
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label text-secondary">Name</label>
                                    <input
                                        type="text"
                                        className="form-control bg-dark text-light border-secondary"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label text-secondary">Role</label>
                                    <select
                                        className="form-select bg-dark text-light border-secondary"
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="USER">User</option>
                                        <option value="ADMIN">Admin</option>
                                    </select>
                                </div>
                            </div>

                            {/* Email & Phone */}
                            <div className="mb-3">
                                <label className="form-label text-secondary">Email</label>
                                <input
                                    type="email"
                                    className="form-control bg-dark text-light border-secondary"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    disabled={!!user} // Often email is immutable or requires special flow
                                />
                                {user && <small className="text-muted">Email cannot be changed.</small>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label text-secondary">Phone Number</label>
                                <input
                                    type="text"
                                    className="form-control bg-dark text-light border-secondary"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Password */}
                            <div className="mb-3">
                                <label className="form-label text-secondary">
                                    {user ? 'New Password (leave blank to keep current)' : 'Password'}
                                </label>
                                <input
                                    type="password"
                                    className="form-control bg-dark text-light border-secondary"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required={!user} // Required only for new users
                                    minLength="6"
                                />
                            </div>

                        </div>
                        <div className="modal-footer border-secondary">
                            <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? 'Saving...' : 'Save User'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserForm;
