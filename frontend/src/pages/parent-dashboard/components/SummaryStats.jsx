import React from 'react';

const SummaryStats = ({ applications }) => {
  const totalApplications = applications.length;
  const pendingApplications = applications.filter(app => app.status === 'pending').length;
  const approvedApplications = applications.filter(app => app.status === 'approved').length;
  const rejectedApplications = applications.filter(app => app.status === 'rejected').length;

  const stats = [
    { label: 'Total Applications', value: totalApplications, icon: 'bi-file-earmark-text', color: 'primary-button' },
    { label: 'Pending', value: pendingApplications, icon: 'bi-hourglass-split', color: 'warning' },
    { label: 'Approved', value: approvedApplications, icon: 'bi-check-circle', color: 'success-confirm' },
    { label: 'Rejected', value: rejectedApplications, icon: 'bi-x-circle', color: 'alerts-error' },
  ];

  return (
    <div className="row g-4 mb-5">
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
  );
};

export default SummaryStats;
