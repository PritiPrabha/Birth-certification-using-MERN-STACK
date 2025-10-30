import React from 'react';
import moment from 'moment';

const ApplicationsTable = ({ applications, onVerify }) => {
  const getStatusClasses = (status) => {
    switch (status) {
      case 'pending-verification':
        return 'badge bg-warning-subtle text-warning';
      case 'requires-more-info':
        return 'badge bg-info-subtle text-info';
      case 'verified':
        return 'badge bg-success-subtle text-success-confirm';
      default:
        return 'badge bg-secondary-subtle text-secondary-button-text';
    }
  };

  return (
    <div className="card shadow-sm border-0 rounded-4 p-4 bg-white">
      <h3 className="h5 text-headings mb-3">Applications for Review</h3>
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th scope="col" className="text-headings">Application ID</th>
              <th scope="col" className="text-headings">Child Name</th>
              <th scope="col" className="text-headings">Date of Birth</th>
              <th scope="col" className="text-headings">Status</th>
              <th scope="col" className="text-headings">Hospital/Clinic</th>
              <th scope="col" className="text-headings">Submission Date</th>
              <th scope="col" className="text-headings">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.length > 0 ? (
              applications.map((app) => (
                <tr key={app.id} className="card-hover">
                  <td className="text-text-general">{app.id}</td>
                  <td className="text-text-general">{app.childName}</td>
                  <td className="text-text-general">{moment(app.dateOfBirth).format('MMMM D, YYYY')}</td>
                  <td>
                    <span className={`badge rounded-pill ${getStatusClasses(app.status)}`}>
                      {app.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="text-text-general">{app.hospitalName}</td>
                  <td className="text-text-general">{moment(app.submissionDate).format('MMMM D, YYYY')}</td>
                  <td>
                    <button 
                      className="btn btn-sm btn-primary-button text-white hover-bg-accent-color hover-text-white"
                      onClick={() => onVerify(app)}
                    >
                      Review / Verify
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted fst-italic py-3">No applications requiring verification.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationsTable;
