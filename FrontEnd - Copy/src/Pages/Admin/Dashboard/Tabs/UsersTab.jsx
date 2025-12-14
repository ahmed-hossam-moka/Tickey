// src/Pages/Admin/Dashboard/Tabs/UsersTab.jsx
import React, { useEffect, useState } from 'react';
import useUserStore from '../../../../store/userStore';
import UserForm from './Components/UserForm';
import DeleteConfirmationModal from './Components/DeleteConfirmationModal';
import ToastNotification from '../../../../Shared/ToastNotification';
import '../Styles/users.css';

const UsersTab = () => {
    const { users, fetchUsers, register, registerAdmin, updateUser, deleteUser, loading, error } = useUserStore();

    // UI State
    const [showForm, setShowForm] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Feedback State
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    useEffect(() => {
        fetchUsers();
    }, []);

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
    };

    const handleAddClick = () => {
        setEditingUser(null);
        setShowForm(true);
    };

    const handleEditClick = (user) => {
        setEditingUser(user);
        setShowForm(true);
    };

    const handleDeleteClick = (user) => {
        setUserToDelete(user);
        setDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!userToDelete) return;
        try {
            await deleteUser(userToDelete.id);
            showToast('User deleted successfully', 'success');
            setDeleteModalOpen(false);
            setUserToDelete(null);
        } catch (err) {
            showToast('Failed to delete user: ' + err.message, 'error');
        }
    };

    const handleFormSubmit = async (formData) => {
        try {
            if (editingUser) {
                // Update
                await updateUser({ ...formData, id: editingUser.id });
                showToast('User updated successfully', 'success');
            } else {
                // Create
                if (formData.role === 'ADMIN') {
                    await registerAdmin(formData);
                } else {
                    await register(formData);
                }
                showToast('User created successfully', 'success');
            }
            setShowForm(false);
        } catch (err) {
            showToast('Operation failed: ' + err.message, 'error');
        }
    };

    // Helper to format date
    const formatDate = (dateString) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getInitials = (name) => {
        return name ? name.charAt(0).toUpperCase() : '?';
    };

    const filteredUsers = users.filter(user =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="dashboard-tab">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
                <div>
                    <h3 className="tab-title mb-1">Users Management</h3>
                    <p className="text-secondary mb-0">Manage user access and roles</p>
                </div>

                <div className="d-flex gap-3">
                    <div className="users-search-container">
                        <i className="bi bi-search search-icon"></i>
                        <input
                            type="text"
                            className="form-control users-search-input"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="btn-add" onClick={handleAddClick}>
                        <i className="bi bi-person-plus-fill me-2"></i> Add User
                    </button>
                </div>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            {loading && !showForm ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-light" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="users-table-container">
                    <table className="users-table w-100">
                        <thead>
                            <tr>
                                <th className="ps-4">User</th>
                                <th>Role</th>
                                <th>Contact Info</th>
                                <th>Joined</th>
                                <th className="text-end pe-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map(user => (
                                <tr key={user.id}>
                                    <td className="ps-4">
                                        <div className="d-flex align-items-center gap-3">
                                            <div className={`user-avatar ${user.role === 'ADMIN' ? 'admin' : ''}`}>
                                                {getInitials(user.name)}
                                            </div>
                                            <div>
                                                <div className="fw-bold text-light">{user.name}</div>
                                                <div className="small text-secondary">ID: #{user.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`role-badge ${user.role === 'ADMIN' ? 'admin' : 'user'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="d-flex flex-column">
                                            <span className="text-light">{user.email}</span>
                                            <span className="small text-secondary">{user.phoneNumber || '-'}</span>
                                        </div>
                                    </td>
                                    <td className="text-secondary">
                                        {formatDate(user.createdAt)}
                                    </td>
                                    <td className="text-end pe-4">
                                        <div className="action-buttons">
                                            <button
                                                className="btn btn-outline-primary me-2"
                                                onClick={() => handleEditClick(user)}
                                                title="Edit"
                                            >
                                                <i className="bi bi-pencil-fill"></i>
                                            </button>
                                            <button
                                                className="btn btn-outline-danger"
                                                onClick={() => handleDeleteClick(user)}
                                                title="Delete"
                                            >
                                                <i className="bi bi-trash-fill"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredUsers.length === 0 && !loading && (
                                <tr>
                                    <td colSpan="5" className="text-center py-5 text-muted">
                                        <i className="bi bi-search display-6 mb-3 d-block opacity-50"></i>
                                        No users found matching your search.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modals */}
            {showForm && (
                <UserForm
                    user={editingUser}
                    onSubmit={handleFormSubmit}
                    onCancel={() => setShowForm(false)}
                    loading={loading}
                />
            )}

            <DeleteConfirmationModal
                isOpen={deleteModalOpen}
                onCancel={() => setDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                itemName={userToDelete?.name}
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

export default UsersTab;
