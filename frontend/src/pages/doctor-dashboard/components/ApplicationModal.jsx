import React, { useState } from 'react';
import moment from 'moment';

const ApplicationModal = ({ show, onClose, application, onUpdateStatus }) => {
  const [verificationStatus, setVerificationStatus] = useState(application?.status || 'pending-verification');
  const [reviewNotes, setReviewNotes] = useState(application?.reviewNotes || '');
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for submission loading
  const [digitalSignature, setDigitalSignature] = useState(''); // New state for digital signature

  if (!show || !application) return null;

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

  const documentTypes = {
    hospital_record: 'Hospital Birth Record',
    parent_id_mother: "Mother's Identification",
    parent_id_father: "Father's Identification",
    marriage_certificate: 'Marriage Certificate',
    medical_records: 'Additional Medical Records'
  };

  const InfoRow = ({ label, value }) => (
    <div className="col-12 col-md-6 mb-2">
      <p className="small text-muted mb-0">{label}</p>
      <p className="fw-bold text-text-general">{String(value || 'Not provided')}</p>
    </div>
  );

  const handleStatusChange = (e) => {
    setVerificationStatus(e.target.value);
  };

  const handleNotesChange = (e) => {
    setReviewNotes(e.target.value);
  };

  const handleSignatureChange = (e) => {
    setDigitalSignature(e.target.value);
  };

  const handleUpdateStatus = async (newStatus) => {
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found.');
      }

      let endpoint;
      let body;

      if (newStatus === 'verified') {
        endpoint = `/api/applications/verify/${application.id}`;
        body = { status: newStatus, reviewNotes, digitalSignature }; // Include digital signature
      } else if (newStatus === 'requires-more-info') {
        endpoint = `/api/applications/verify/${application.id}`;
        body = { status: newStatus, reviewNotes };
      } else {
        endpoint = `/api/applications/reject/${application.id}`;
        body = { status: newStatus, reviewNotes };
      }

      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || 'Failed to update application status.');
      }

      onUpdateStatus(application.id, newStatus, reviewNotes); // Update local state in parent
      onClose();
      alert(`Application status updated to ${newStatus.toUpperCase()}!`);
    } catch (err) {
      console.error('Error updating application status:', err);
      alert(err.message || 'An error occurred while updating status.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitVerification = () => {
    // Depending on the selected status, call the appropriate update function
    if (verificationStatus === 'verified') {
      handleUpdateStatus('verified');
    } else if (verificationStatus === 'requires-more-info') {
      handleUpdateStatus('requires-more-info');
    } else if (verificationStatus === 'pending-verification') {
      handleUpdateStatus('pending-verification');
    }
  };

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div className="modal-content rounded-4 shadow-lg bg-white border-0">
          <div className="modal-header border-bottom-0 bg-white">
            <h5 className="modal-title text-headings">Verify Application: {application.id}</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body p-4 bg-background">
            <div className="mb-4">
              <p className="text-muted mb-1">Current Status:</p>
              <span className={`fw-bold fs-5 ${getStatusClasses(application.status)} px-3 py-2 rounded-pill`}>
                {application.status.replace('-', ' ').toUpperCase()}
              </span>
            </div>

            <div className="row mb-4">
              <InfoRow label="Child Name" value={application.childName} />
              <InfoRow label="Date of Birth" value={moment(application.dateOfBirth).format('MMMM D, YYYY')} />
              <InfoRow label="Submission Date" value={moment(application.submissionDate).format('MMMM D, YYYY')} />
              <InfoRow label="Hospital/Clinic" value={application.hospitalName} />
              <InfoRow label="Doctor Name" value={application.doctorName} />
            </div>

            <h6 className="text-headings mb-3">Documents for Verification</h6>
            <ul className="list-group mb-4">
              {Object.entries(application.documents || {}).length > 0 ? (
                Object.entries(application.documents).map(([docId, doc]) => (
                  <li key={docId} className="list-group-item d-flex justify-content-between align-items-center bg-white border-borders-cards">
                    <span className="text-text-general">{documentTypes[docId] || docId}</span>
                    {doc?.url ? (
                      <a href={doc.url} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary-button text-primary-button hover-bg-accent-color hover-text-white">
                        View <i className="bi bi-box-arrow-up-right ms-1"></i>
                      </a>
                    ) : (
                      <span className="text-muted small">No document uploaded</span>
                    )}
                  </li>
                ))
              ) : (
                <li className="list-group-item bg-white text-muted fst-italic border-borders-cards">No documents found for this application.</li>
              )}
            </ul>

            <div className="mb-3">
              <label htmlFor="verificationStatus" className="form-label text-headings">Update Verification Status</label>
              <select
                id="verificationStatus"
                className="form-select border-borders-cards"
                value={verificationStatus}
                onChange={handleStatusChange}
              >
                <option value="pending-verification">Pending Verification</option>
                <option value="requires-more-info">Requires More Info</option>
                <option value="verified">Verified</option>
              </select>
            </div>

            {(verificationStatus === 'requires-more-info') && (
              <div className="mb-3">
                <label htmlFor="reviewNotes" className="form-label text-headings">Notes for Applicant (Optional)</label>
                <textarea
                  id="reviewNotes"
                  className="form-control border-borders-cards"
                  rows="3"
                  value={reviewNotes}
                  onChange={handleNotesChange}
                  placeholder="Provide notes for the applicant if more information is needed..."
                ></textarea>
              </div>
            )}

            {verificationStatus === 'verified' && (
              <div className="mb-3">
                <label htmlFor="digitalSignature" className="form-label text-headings">Digital Signature (Type Full Name)</label>
                <input
                  type="text"
                  id="digitalSignature"
                  className="form-control border-borders-cards"
                  value={digitalSignature}
                  onChange={handleSignatureChange}
                  placeholder="Type your full name to digitally sign"
                  required
                />
              </div>
            )}
          </div>
          <div className="modal-footer bg-white border-top-0">
            <button type="button" className="btn btn-secondary-button text-white hover-bg-accent-color" onClick={onClose} disabled={isSubmitting}>Cancel</button>
            <button type="button" className="btn btn-primary-button text-white hover-bg-accent-color" onClick={handleSubmitVerification} disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              ) : (
                ''
              )}
              Submit Verification
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationModal;
