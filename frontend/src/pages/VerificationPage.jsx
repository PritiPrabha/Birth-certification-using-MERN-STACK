import React, { useState } from 'react';
import moment from 'moment'; // Added for date and time formatting

const VerificationPage = () => {
  const [certificateId, setCertificateId] = useState('');
  const [verificationResult, setVerificationResult] = useState(null); // { status: 'verified'/'invalid'/'not_found', details: {...} }
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setVerificationResult(null);

    try {
      const response = await fetch(`/api/certificate/verify/${certificateId}`);
      const data = await response.json();

      if (!response.ok && response.status !== 404) {
        throw new Error(data.reason || 'Failed to verify certificate.');
      }

      setVerificationResult(data);
    } catch (err) {
      console.error('Verification error:', err);
      setError(err.message || 'An error occurred during verification.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusClasses = (status) => {
    switch (status) {
      case 'verified':
        return 'alert-success-confirm bg-success-subtle text-success-confirm';
      case 'invalid':
        return 'alert-alerts-error bg-alerts-error-subtle text-alerts-error';
      case 'not_found':
        return 'alert-info bg-info-subtle text-info';
      default:
        return 'alert-secondary bg-background-alt text-text-general';
    }
  };

  return (
    <div className="container py-5 bg-background min-vh-100">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-7">
          <div className="card shadow-lg border-0 rounded-4 p-4 bg-white">
            <div className="card-body">
              <h1 className="card-title text-center text-headings mb-4">Certificate Verification</h1>
              <p className="text-center text-text-general mb-4">
                Enter a certificate number to verify its authenticity and details.
              </p>

              <form onSubmit={handleVerify} className="mb-4">
                <div className="input-group input-group-lg">
                  <input
                    type="text"
                    className="form-control border-borders-cards"
                    placeholder="Enter Certificate ID (e.g., LFC-BC-XXXXXX-XXXXX)"
                    value={certificateId}
                    onChange={(e) => setCertificateId(e.target.value)}
                    required
                    aria-label="Certificate ID"
                  />
                  <button
                    className="btn btn-primary-button text-white hover-bg-accent-color"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    ) : (
                      <i className="bi bi-search me-2"></i>
                    )}
                    Verify
                  </button>
                </div>
                {error && <div className="text-alerts-error small mt-2">{error}</div>}
              </form>

              <div className="text-center mt-3">
                <p className="text-muted small mb-2">Or, for mobile verification:</p>
                <button
                  className="btn btn-outline-secondary-button btn-sm text-secondary-button-text hover-bg-accent-color hover-text-white"
                  onClick={() => {
                    setCertificateId('LFC-BC-1B4M0D-A3D5X'); // Simulate scanning a valid QR code
                    // Automatically trigger verification after setting the ID
                    handleVerify({ preventDefault: () => {} });
                  }}
                  disabled={loading}
                >
                  <i className="bi bi-qr-code-scan me-2"></i> Simulate QR Scan
                </button>
              </div>

              {verificationResult && (
                <div className={`alert ${getStatusClasses(verificationResult.status)} border-0 rounded-3 p-4`} role="alert">
                  <h4 className="alert-heading text-headings">
                    {verificationResult.status === 'verified' && <i className="bi bi-check-circle-fill me-2"></i>}
                    {verificationResult.status === 'invalid' && <i className="bi bi-x-circle-fill me-2"></i>}
                    {verificationResult.status === 'not_found' && <i className="bi bi-info-circle-fill me-2"></i>}
                    {verificationResult.status === 'verified' ? 'Certificate Verified!' :
                     verificationResult.status === 'invalid' ? 'Invalid Certificate' :
                     'Certificate Not Found'}
                  </h4>
                  {verificationResult.status === 'verified' && (
                    <div>
                      <p className="mb-2 text-text-general">
                        This certificate is <span className="fw-bold text-success-confirm">authentic and valid.</span>
                      </p>
                      <hr className="border-borders-cards"/>
                      <div className="row g-2 small">
                        <div className="col-md-6"><span className="text-muted">Child Name:</span> <span className="fw-bold text-text-general">{verificationResult.details.childName}</span></div>
                        <div className="col-md-6"><span className="text-muted">Date of Birth:</span> <span className="fw-bold text-text-general">{moment(verificationResult.details.dateOfBirth).format('MMMM D, YYYY')}</span></div>
                        <div className="col-md-6"><span className="text-muted">Place of Birth:</span> <span className="fw-bold text-text-general">{verificationResult.details.placeOfBirth}</span></div>
                        <div className="col-md-6"><span className="text-muted">Issued Date:</span> <span className="fw-bold text-text-general">{moment(verificationResult.details.issuedDate).format('MMMM D, YYYY')}</span></div>
                        <div className="col-md-6"><span className="text-muted">Mother's Name:</span> <span className="fw-bold text-text-general">{verificationResult.details.motherName}</span></div>
                        <div className="col-md-6"><span className="text-muted">Father's Name:</span> <span className="fw-bold text-text-general">{verificationResult.details.fatherName}</span></div>
                      </div>
                      <h6 className="mt-3 mb-2 text-headings small">Verification Details:</h6>
                      <div className="row g-2 small">
                        <div className="col-md-6"><span className="text-muted">Verified by:</span> <span className="fw-bold text-text-general">{verificationResult.details.verifiedBy} ({verificationResult.details.facility})</span></div>
                        <div className="col-md-6"><span className="text-muted">On:</span> <span className="fw-bold text-text-general">{moment(verificationResult.details.verificationDate).format('MMMM D, YYYY at h:mm A')}</span></div>
                      </div>
                    </div>
                  )}
                  {(verificationResult.status === 'invalid' || verificationResult.status === 'not_found') && (
                    <p className="mb-0 text-text-general">{verificationResult.reason}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
