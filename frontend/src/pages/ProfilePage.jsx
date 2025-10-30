import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const mockFacilities = [
  { id: 'F001', name: 'City General Hospital' },
  { id: 'F002', name: 'County Medical Center' },
  { id: 'F003', name: 'St. Jude\'s Hospital' },
  { id: 'F004', name: 'Community Health Clinic' },
];

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    facilityId: '', // For doctors
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Simulate fetching user data from local storage or API
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
          setUser(storedUser);
          setFormData({
            name: storedUser.name || '',
            email: storedUser.email || '',
            role: storedUser.role || '',
            facilityId: storedUser.facilityId || '',
          });
        } else {
          setError('User data not found. Please log in.');
          navigate('/authentication');
        }
      } catch (err) {
        setError('Failed to load user profile.');
        console.error('Profile fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setSuccessMessage('');
    setError('');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setError('');

    // Basic validation for doctor role and facility selection
    if (formData.role === 'doctor' && !formData.facilityId) {
      setError('Please select your associated facility.');
      setLoading(false);
      return;
    }

    try {
      // Simulate API call to update profile
      const updatedUser = { ...user, ...formData };
      localStorage.setItem('user', JSON.stringify(updatedUser)); // Update local storage

      setUser(updatedUser);
      setIsEditing(false);
      setSuccessMessage('Profile updated successfully!');
    } catch (err) {
      setError('Failed to update profile. Please try again.');
      console.error('Profile update error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-background">
        <div className="spinner-border text-primary-button" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="alert alert-alerts-error bg-alerts-error-subtle text-alerts-error text-center mt-5" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container py-5 bg-background min-vh-100">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-7">
          <div className="card shadow-lg border-0 rounded-4 p-4 bg-white">
            <div className="card-body">
              <h1 className="card-title text-center text-headings mb-4">User Profile</h1>
              {successMessage && (
                <div className="alert alert-success bg-success-subtle text-success-confirm" role="alert">
                  {successMessage}
                </div>
              )}
              {error && (
                <div className="alert alert-alerts-error bg-alerts-error-subtle text-alerts-error" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSave}>
                <div className="mb-3">
                  <label htmlFor="nameInput" className="form-label text-text-general">Full Name</label>
                  <input
                    type="text"
                    className="form-control border-borders-cards"
                    id="nameInput"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="emailInput" className="form-label text-text-general">Email address</label>
                  <input
                    type="email"
                    className="form-control border-borders-cards"
                    id="emailInput"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="roleInput" className="form-label text-text-general">Role</label>
                  <input
                    type="text"
                    className="form-control border-borders-cards"
                    id="roleInput"
                    name="role"
                    value={formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}
                    disabled
                  />
                </div>

                {formData.role === 'doctor' && (
                  <div className="mb-3">
                    <label htmlFor="facilitySelect" className="form-label text-text-general">Associated Facility</label>
                    <select
                      className="form-select border-borders-cards"
                      id="facilitySelect"
                      name="facilityId"
                      value={formData.facilityId}
                      onChange={handleChange}
                      disabled={!isEditing}
                      required
                    >
                      <option value="">Select a facility</option>
                      {mockFacilities.map(facility => (
                        <option key={facility.id} value={facility.id}>{facility.name}</option>
                      ))}
                    </select>
                    {error && <div className="invalid-feedback text-alerts-error d-block">{error}</div>}
                  </div>
                )}

                <div className="d-flex justify-content-end mt-4">
                  {!isEditing ? (
                    <button type="button" className="btn btn-primary-button text-white hover-bg-accent-color" onClick={() => setIsEditing(true)}>
                      Edit Profile
                    </button>
                  ) : (
                    <>
                      <button type="button" className="btn btn-secondary-button text-white me-2 hover-bg-accent-color" onClick={() => {
                        setIsEditing(false);
                        // Reset form data to original user data if cancelled
                        setFormData({
                          name: user.name || '',
                          email: user.email || '',
                          role: user.role || '',
                          facilityId: user.facilityId || '',
                        });
                        setError('');
                        setSuccessMessage('');
                      }}>
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-success-confirm text-white hover-bg-accent-color" disabled={loading}>
                        {loading ? 'Saving...' : 'Save Changes'}
                      </button>
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
