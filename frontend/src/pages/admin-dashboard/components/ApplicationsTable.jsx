import React from 'react';
import moment from 'moment';

const ApplicationsTable = ({ applications, onReview }) => {
  const getStatusClasses = (status) => {
    switch (status) {
      case 'pending':
        return 'badge bg-warning-subtle text-warning';
      case 'in-review':
        return 'badge bg-info-subtle text-info';
      case 'approved':
        return 'badge bg-success-subtle text-success-confirm';
      case 'rejected':
        return 'badge bg-alerts-error-subtle text-alerts-error';
      default:
        return 'badge bg-secondary-subtle text-secondary-button-text';
    }
  };

  return (
    <div className="card shadow-sm border-0 rounded-4 p-4 bg-white">
      <h3 className="h5 text-headings mb-3">All Applications</h3>
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th scope="col" className="text-headings">Application ID</th>
              <th scope="col" className="text-headings">Child Name</th>
              <th scope="col" className="text-headings">Date of Birth</th>
              <th scope="col" className="text-headings">Status</th>
              <th scope="col" className="text-headings">Submission Date</th>
              <th scope="col" className="text-headings">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.length > 0 ? (
              applications.map((app) => (
                <tr key={app.id}>
                  <td className="text-text-general">{app.id}</td>
                  <td className="text-text-general">{app.childName}</td>
                  <td className="text-text-general">{moment(app.dateOfBirth).format('MMMM D, YYYY')}</td>
                  <td>
                    <span className={`badge rounded-pill ${getStatusClasses(app.status)}`}>
                      {app.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="text-text-general">{moment(app.submissionDate).format('MMMM D, YYYY')}</td>
                  <td>
                    <button 
                      className="btn btn-sm btn-outline-primary-button text-primary-button hover-bg-accent-color hover-text-white"
                      onClick={() => onReview(app)}
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted fst-italic py-3">No applications found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationsTable;
