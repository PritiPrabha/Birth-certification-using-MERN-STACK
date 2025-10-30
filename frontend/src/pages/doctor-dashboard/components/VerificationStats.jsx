import React, { useState, useEffect } from 'react';

const VerificationStats = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Authentication token not found.');
        }

        const response = await fetch('/api/applications/doctor/stats', {
          headers: {
            'x-auth-token': token,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch verification stats.');
        }

        const data = await response.json();
        setStats([
          { label: 'Total Reviews', value: data.totalReviews, icon: 'bi-file-earmark-medical', color: 'primary-button' },
          { label: 'Pending Verification', value: data.pending, icon: 'bi-hourglass-split', color: 'warning' },
          { label: 'Requires More Info', value: data.requiresMoreInfo, icon: 'bi-exclamation-circle', color: 'info' },
          { label: 'Verified', value: data.verified, icon: 'bi-check-circle', color: 'success-confirm' },
        ]);
      } catch (err) {
        setError(err.message || 'Failed to load statistics.');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-3">
        <div className="spinner-border text-primary-button" role="status">
          <span className="visually-hidden">Loading stats...</span>
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
    <div className="mb-5">
      <h2 className="h4 text-headings mb-4">Verification Overview</h2>
      <div className="row g-4">
        {stats.map((stat, index) => (
          <div className="col-md-6 col-lg-3" key={index}>
            <div className="card h-100 shadow-sm border-0 rounded-4 p-4 bg-background">
              <div className="d-flex align-items-center">
                <div className={`me-3 rounded-circle d-flex align-items-center justify-content-center bg-${stat.color}-subtle`} style={{ width: '48px', height: '48px' }}>
                  <i className={`bi ${stat.icon} fs-4 text-${stat.color}`}></i>
                </div>
                <div>
                  <h3 className="h6 mb-1 text-muted text-uppercase fw-bold">{stat.label}</h3>
                  <p className="h4 fw-bold text-headings mb-0">{stat.value}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerificationStats;
