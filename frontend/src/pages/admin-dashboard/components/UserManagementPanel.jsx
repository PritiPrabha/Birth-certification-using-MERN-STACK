import React, { useState, useEffect } from 'react';

const UserManagementPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Added error state
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', role: '' });

  // Mock user data
  // const mockUsers = [
  //   { id: 'USR-001', name: 'Sarah Johnson', email: 'sarah.j@example.com', role: 'parent', status: 'active' },
  //   { id: 'USR-002', name: 'Dr. Emily White', email: 'emily.w@hospital.com', role: 'doctor', status: 'pending' },
  //   { id: 'USR-003', name: 'Admin User', email: 'admin@lifecert.gov', role: 'admin', status: 'active' },
  //   { id: 'USR-004', name: 'David Lee', email: 'david.l@example.com', role: 'parent', status: 'active' },
  // ];

  useEffect(() => {
    // Simulate fetching users from an API
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null); // Clear previous errors
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Authentication token not found.');
        }

        const response = await fetch('/api/users', {
          headers: {
            'x-auth-token': token,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.msg || 'Failed to fetch users.');
        }

        setUsers(data);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(err.message || 'An error occurred while fetching users.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array means this runs once on mount

  const handleEdit = (user) => {
    setEditingUser(user.id);
    setFormData({ name: user.name, email: user.email, role: user.role });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (userId) => {
    setLoading(true);
    setError(null); // Clear previous errors
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found.');
      }

      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || 'Failed to update user.');
      }

      setUsers(users.map(user => user._id === userId ? data : user)); // Assuming data returns the updated user object
      setEditingUser(null);
    } catch (err) {
      console.error('Error saving user:', err);
      setError(err.message || 'An error occurred while saving user.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setLoading(true);
      setError(null); // Clear previous errors
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Authentication token not found.');
        }

        const response = await fetch(`/api/users/${userId}`, {
          method: 'DELETE',
          headers: {
            'x-auth-token': token,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.msg || 'Failed to delete user.');
        }

        setUsers(users.filter(user => user._id !== userId));
        alert(data.msg || 'User deleted successfully.');
      } catch (err) {
        console.error('Error deleting user:', err);
        setError(err.message || 'An error occurred while deleting user.');
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <div className="spinner-border text-primary-button" role="status">
          <span className="visually-hidden">Loading users...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-alerts-error bg-alerts-error-subtle text-alerts-error" role="alert">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="card shadow-sm border-0 rounded-4 p-4 bg-white">
      <h3 className="h5 text-headings mb-3">User Management</h3>
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th scope="col" className="text-headings">User ID</th>
              <th scope="col" className="text-headings">Name</th>
              <th scope="col" className="text-headings">Email</th>
              <th scope="col" className="text-headings">Role</th>
              <th scope="col" className="text-headings">Status</th>
              <th scope="col" className="text-headings">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td className="text-text-general">{user.id}</td>
                  {editingUser === user.id ? (
                    <>
                      <td><input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control form-control-sm border-borders-cards" /></td>
                      <td><input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control form-control-sm border-borders-cards" /></td>
                      <td>
                        <select name="role" value={formData.role} onChange={handleChange} className="form-select form-select-sm border-borders-cards">
                          <option value="parent">Parent</option>
                          <option value="doctor">Doctor</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td>
                        <span className={`badge rounded-pill ${user.status === 'active' ? 'bg-success-confirm' : user.status === 'pending' ? 'bg-warning' : 'bg-alerts-error'}`}>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-success-confirm btn-sm me-2" onClick={() => handleSave(user.id)} disabled={loading}>Save</button>
                        <button className="btn btn-secondary-button btn-sm" onClick={() => setEditingUser(null)} disabled={loading}>Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="text-text-general">{user.name}</td>
                      <td className="text-text-general">{user.email}</td>
                      <td className="text-text-general">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</td>
                      <td>
                        <span className={`badge rounded-pill ${user.status === 'active' ? 'bg-success-confirm' : user.status === 'pending' ? 'bg-warning' : 'bg-alerts-error'}`}>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-primary-button btn-sm me-2 hover-bg-accent-color" onClick={() => handleEdit(user)} disabled={loading}>Edit</button>
                        <button className="btn btn-alerts-error btn-sm hover-bg-accent-color" onClick={() => handleDelete(user.id)} disabled={loading}>Delete</button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted fst-italic py-3">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagementPanel;
