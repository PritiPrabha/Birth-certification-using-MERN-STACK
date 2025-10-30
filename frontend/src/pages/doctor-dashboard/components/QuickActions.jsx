import React from 'react';

const QuickActions = ({ onNewApplication }) => {
  return (
    <div className="card shadow-sm border-0 rounded-4 p-4 mb-4 bg-background">
      <h3 className="h5 text-headings mb-3">Quick Actions</h3>
      <div className="row g-3">
        <div className="col-md-6 col-lg-4">
          <button 
            className="btn btn-primary-button w-100 text-white"
            onClick={onNewApplication}
          >
            <i className="bi bi-plus-circle me-2"></i> Register New Birth
          </button>
        </div>
        <div className="col-md-6 col-lg-4">
          <button className="btn btn-secondary-button w-100 text-secondary-button-text">
            <i className="bi bi-search me-2"></i> Search All Records
          </button>
        </div>
        <div className="col-md-6 col-lg-4">
          <button className="btn btn-outline-info w-100 text-info">
            <i className="bi bi-bell me-2"></i> View Notifications
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
