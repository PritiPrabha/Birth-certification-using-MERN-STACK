import React, { useState, useEffect } from 'react';

const DoctorManagementPanel = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Added error state

  // Mock doctor data
  // const mockDoctors = [
  //   { id: 'DOC-001', name: 'Dr. Emily White', email: 'emily.w@hospital.com', facility: 'City General Hospital', status: 'approved' },
  //   { id: 'DOC-002', name: 'Dr. Alex Chen', email: 'alex.c@clinic.com', facility: 'Community Health Clinic', status: 'pending' },
  //   { id: 'DOC-003', name: 'Dr. Maria Garcia', email: 'maria.g@hospital.com', facility: 'St. Jude\'s Hospital', status: 'approved' },
  //   { id: 'DOC-004', name: 'Dr. Ben Carter', email: 'ben.c@medical.com', facility: 'County Medical Center', status: 'revoked' },
  // ];

  useEffect(() => {
    // Simulate fetching doctors from an API
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        setError(null); // Clear previous errors
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Authentication token not found.');
        }

        const response = await fetch('/api/users/doctors', {
          headers: {
            'x-auth-token': token,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.msg || 'Failed to fetch doctors.');
        }

        setDoctors(data);
      } catch (err) {
        console.error('Error fetching doctors:', err);
        setError(err.message || 'An error occurred while fetching doctors.');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []); // Empty dependency array means this runs once on mount

  const handleApprove = async (doctorId) => {
    setLoading(true);
    setError(null); // Clear previous errors
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found.');
      }

      const response = await fetch(`/api/users/${doctorId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify({ status: 'active' }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || 'Failed to approve doctor.');
      }

      setDoctors(doctors.map(doctor => doctor._id === doctorId ? { ...doctor, status: 'active' } : doctor));
      alert('Doctor approved successfully.');
    } catch (err) {
      console.error('Error approving doctor:', err);
      setError(err.message || 'An error occurred while approving doctor.');
    } finally {
      setLoading(false);
    }
  };

  const handleRevoke = async (doctorId) => {
    if (window.confirm('Are you sure you want to revoke this doctor\'s account?')) {
      setLoading(true);
      setError(null); // Clear previous errors
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Authentication token not found.');
        }

        const response = await fetch(`/api/users/${doctorId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
          body: JSON.stringify({ status: 'revoked' }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.msg || 'Failed to revoke doctor.');
        }

        setDoctors(doctors.map(doctor => doctor._id === doctorId ? { ...doctor, status: 'revoked' } : doctor));
        alert('Doctor account revoked successfully.');
      } catch (err) {
        console.error('Error revoking doctor:', err);
        setError(err.message || 'An error occurred while revoking doctor.');
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <div className="spinner-border text-primary-button" role="status">
          <span className="visually-hidden">Loading doctors...</span>
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
    <div className="card shadow-sm border-0 rounded-4 p-4 bg-white mt-4">
      <h3 className="h5 text-headings mb-3">Doctor Management</h3>
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th scope="col" className="text-headings">Doctor ID</th>
              <th scope="col" className="text-headings">Name</th>
              <th scope="col" className="text-headings">Email</th>
              <th scope="col" className="text-headings">Facility</th>
              <th scope="col" className="text-headings">Status</th>
              <th scope="col" className="text-headings">Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.length > 0 ? (
              doctors.map((doctor) => (
                <tr key={doctor._id}>
                  <td className="text-text-general">{doctor._id}</td>
                  <td className="text-text-general">{doctor.name}</td>
                  <td className="text-text-general">{doctor.email}</td>
                  <td className="text-text-general">{doctor.facility}</td>
                  <td>
                    <span className={`badge rounded-pill ${doctor.status === 'active' ? 'bg-success-confirm' : doctor.status === 'pending' ? 'bg-warning' : 'bg-alerts-error'}`}>
                      {doctor.status.charAt(0).toUpperCase() + doctor.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    {doctor.status === 'pending' && (
                      <button className="btn btn-success-confirm btn-sm me-2 hover-bg-accent-color" onClick={() => handleApprove(doctor._id)} disabled={loading}>Approve</button>
                    )}
                    {doctor.status === 'active' && (
                      <button className="btn btn-alerts-error btn-sm hover-bg-accent-color" onClick={() => handleRevoke(doctor._id)} disabled={loading}>Revoke</button>
                    )}
                    {doctor.status === 'revoked' && (
                      <button className="btn btn-info btn-sm hover-bg-accent-color" onClick={() => handleApprove(doctor._id)} disabled={loading}>Reactivate</button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted fst-italic py-3">No doctors found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorManagementPanel;
