import React from 'react';
import moment from 'moment';

const ApplicationCard = ({ application, onViewDetails }) => {
  const getStatusClasses = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-warning-subtle text-warning';
      case 'in-review':
        return 'bg-info-subtle text-info';
      case 'approved':
        return 'bg-success-subtle text-success-confirm';
      case 'rejected':
        return 'bg-alerts-error-subtle text-alerts-error';
      default:
        return 'bg-secondary-subtle text-secondary-button-text';
    }
  };

  return (
    <div className="card h-100 shadow-sm border-0 rounded-4 bg-white overflow-hidden card-hover">
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <h5 className="card-title text-headings mb-0">Application ID: {application.id}</h5>
          <span className={`badge rounded-pill px-3 py-2 fw-bold ${getStatusClasses(application.status)}`}>
            {application.status.replace('-', ' ').toUpperCase()}
          </span>
        </div>

        <p className="card-text text-text-general mb-2">
          <strong className="text-headings">Child Name:</strong> {application.childName}
        </p>
        <p className="card-text text-text-general mb-2">
          <strong className="text-headings">Date of Birth:</strong> {moment(application.dateOfBirth).format('MMMM D, YYYY')}
        </p>
        <p className="card-text text-text-general mb-2">
          <strong className="text-headings">Submitted:</strong> {moment(application.submissionDate).format('MMMM D, YYYY')}
        </p>

        {application.status === 'rejected' && application.reason && (
          <div className="alert alert-alerts-error-subtle text-alerts-error border-0 p-2 mt-2 mb-2 rounded-3 small">
            <i className="bi bi-exclamation-circle-fill me-2"></i>
            Reason: {application.reason}
          </div>
        )}

        {application.status === 'approved' && application.certificateId && (
          <p className="card-text text-text-general mb-2">
            <strong className="text-headings">Certificate ID:</strong> {application.certificateId}
          </p>
        )}

        <div className="mt-auto d-flex justify-content-between align-items-center pt-3 border-top border-borders-cards">
          <small className="text-muted">
            {application.docsUploaded}/{application.totalDocs} documents uploaded
          </small>
          <button 
            className="btn btn-primary-button btn-sm text-white hover-bg-accent-color hover-text-white"
            onClick={() => onViewDetails(application)}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;
