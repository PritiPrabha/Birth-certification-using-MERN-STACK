import React from 'react';
import moment from 'moment';

const ApplicationDetailsModal = ({ show, onClose, application }) => {
  if (!show || !application) return null;

  // Mock verified doctor details and timestamp for preview (replace with actual data)
  const mockVerifiedDoctor = {
    name: "Dr. Emily White",
    facility: "City General Hospital",
    verificationDate: "2023-10-26",
    verificationTime: "10:30 AM"
  };

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

  const handleDownloadCertificate = async () => {
    try {
      // Simulate API call to download certificate
      // In a real application, this would fetch the PDF and trigger a download
      const response = await fetch(`/api/certificate/${application?.id}`, {
        headers: {
          'x-auth-token': localStorage.getItem('token'), // Assuming token is needed
        },
      });

      if (!response.ok) {
        throw new Error('Failed to download certificate');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `certificate-${application?.certificateId || application?.id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      console.error('Certificate download error:', err);
      alert('Failed to download certificate. Please try again.');
    }
  };

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div className="modal-content rounded-4 shadow-lg bg-white border-0">
          <div className="modal-header border-bottom-0 bg-white">
            <h5 className="modal-title text-headings">Application Details: {application.id}</h5>
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
              {application.certificateId && <InfoRow label="Certificate ID" value={application.certificateId} />}

              {/* Certificate Preview for Approved Applications */}
              {application.status === 'approved' && application.certificateId && (
                <div className="mb-5 p-4 bg-background rounded-4 border border-borders-cards shadow-sm">
                    <h3 className="h5 text-center text-headings mb-4">Official Birth Certificate</h3>
                    <div 
                      className="certificate-mockup p-4 rounded-3 bg-white"
                      style={{
                        border: 'var(--certificate-border-thickness) var(--certificate-border-style) var(--certificate-border-color)',
                        backgroundImage: 'var(--certificate-bg-pattern)',
                        backgroundSize: 'var(--certificate-bg-pattern-size) var(--certificate-bg-pattern-size)'
                      }}
                    >
                        <div className="text-center mb-4">
                            <div className="d-inline-flex align-items-center justify-content-center bg-primary-button rounded-circle mb-3" style={{ width: '64px', height: '64px' }}>
                                <i className="bi bi-award-fill fs-3 text-white"></i>
                            </div>
                            <h4 className="h5 fw-bold text-headings mb-1">BIRTH CERTIFICATE</h4>
                            <p className="text-text-general small mb-0">Official Government Document</p>
                        </div>

                        <div className="list-group list-group-flush mb-4">
                            <div className="list-group-item d-flex justify-content-between align-items-center px-0 py-2 border-0 bg-white">
                                <span className="text-muted small">Child Name:</span>
                                <span className="fw-bold small text-text-general">{application?.childName || '[Not Provided]'}</span>
                            </div>
                            <div className="list-group-item d-flex justify-content-between align-items-center px-0 py-2 border-0 bg-white">
                                <span className="text-muted small">Date of Birth:</span>
                                <span className="fw-bold small text-text-general">{moment(application?.dateOfBirth).format('MMMM D, YYYY') || '[Not Provided]'}</span>
                            </div>
                            <div className="list-group-item d-flex justify-content-between align-items-center px-0 py-2 border-0 bg-white">
                                <span className="text-muted small">Place of Birth:</span>
                                <span className="fw-bold small text-text-general">{application?.placeOfBirth || '[Not Provided]'}</span>
                            </div>
                            {/* Mother/Father Info for display, assuming it's available in application object */}
                            {/* For brevity, using placeholders. In a real app, this data would be part of the fetched application details. */}
                            <div className="list-group-item d-flex justify-content-between align-items-center px-0 py-2 border-0 bg-white">
                                <span className="text-muted small">Mother's Name:</span>
                                <span className="fw-bold small text-text-general">{application?.motherName || '[Not Provided]'}</span>
                            </div>
                            <div className="list-group-item d-flex justify-content-between align-items-center px-0 py-2 border-0 bg-white">
                                <span className="text-muted small">Father's Name:</span>
                                <span className="fw-bold small text-text-general">{application?.fatherName || '[Not Provided]'}</span>
                            </div>
                        </div>

                        <div className="pt-3 border-top border-borders-cards d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center justify-content-center bg-primary-subtle rounded-3 p-2" style={{ width: '56px', height: '56px' }}>
                                <img src="https://www.qr-code-generator.com/wp-content/themes/qr/new_structure/assets/images/design-options.webp" alt="QR Code" style={{ width: '48px', height: '48px' }} />
                            </div>
                            <div className="text-end">
                                <p className="text-muted small mb-1">Date of Issuance:</p>
                                <p className="fw-bold small mb-0 text-text-general">{moment(application?.approvedDate).format('MMMM D, YYYY') || '[Not Provided]'}</p>
                            </div>
                        </div>

                        <div className="pt-3 mt-3 border-top border-borders-cards">
                            <h6 className="text-muted small mb-2">Verification Details:</h6>
                            <div className="d-flex justify-content-between align-items-center mb-1">
                                <span className="text-text-general small">Verified by:</span>
                                <span className="fw-bold small text-text-general">{mockVerifiedDoctor.name} ({mockVerifiedDoctor.facility})</span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <span className="text-text-general small">Verification Date:</span>
                                <span className="fw-bold small text-text-general">{mockVerifiedDoctor.verificationDate} at {mockVerifiedDoctor.verificationTime}</span>
                            </div>
                        </div>
                    </div>
                </div>
              )}

              {/* QR Code (Placeholder) - Removed as it's now part of the certificate preview */}
              {/* Doctor Verification Details (Conditional) - Moved into the certificate preview */}

              <h6 className="text-headings mb-3">Documents</h6>
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
                        <span className="text-muted small">Not uploaded</span>
                      )}
                    </li>
                  ))
                ) : (
                  <li className="list-group-item bg-white text-muted fst-italic border-borders-cards">No documents found for this application.</li>
                )}
              </ul>

              {application.status === 'approved' && (
                <div className="d-flex justify-content-end gap-2 mt-4">
                  <button 
                    className="btn btn-outline-secondary-button btn-lg text-secondary-button hover-bg-accent-color hover-text-white"
                    onClick={() => window.print()} // Trigger browser print
                  >
                    <i className="bi bi-printer me-2"></i> Print Certificate
                  </button>
                  <button 
                    className="btn btn-primary-button btn-lg text-white hover-bg-accent-color"
                    onClick={handleDownloadCertificate} // Attach download handler
                  >
                    <i className="bi bi-download me-2"></i> Download Certificate
                  </button>
                </div>
              )}
            </div>
          </div> {/* This closes the modal-body */}
          <div className="modal-footer bg-white border-top-0">
            <button type="button" className="btn btn-secondary-button text-white hover-bg-accent-color" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

  export default ApplicationDetailsModal;
