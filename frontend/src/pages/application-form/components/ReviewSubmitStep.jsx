import React from 'react';

const ReviewSubmitStep = ({ formData, errors, onSubmit, isSubmitting, updateFormData }) => {
  const { childInfo, motherInfo, fatherInfo, documents, agreements, contactInfo } = formData;

  // Mock verified doctor details and timestamp for preview (replace with actual data)
  // const mockVerifiedDoctor = {
  //   name: "Dr. Emily White",
  //   facility: "City General Hospital",
  //   verificationDate: "2023-10-26",
  //   verificationTime: "10:30 AM"
  // };

  const InfoRow = ({ label, value, fullWidth = false }) => (
    <div className={fullWidth ? 'col-12' : 'col-md-6'}>
      <dt className="text-muted small mb-0">{label}</dt>
      <dd className="text-text-general fw-bold mt-1">{String(value || 'Not provided')}</dd>
    </div>
  );

  const documentTypes = {
    hospital_record: 'Hospital Birth Record',
    parent_id_mother: "Mother's Identification",
    parent_id_father: "Father's Identification",
    marriage_certificate: 'Marriage Certificate',
    medical_records: 'Additional Medical Records'
  };

  return (
    <div className="card mb-4 bg-white border border-borders-cards shadow-sm rounded-4">
      <div className="card-header bg-white border-bottom border-borders-cards">
        <h2 className="h4 card-title text-headings">Review and Submit Application</h2>
        <p className="card-text text-text-general">
          Please carefully review all the information you have provided before submitting your application. Ensure all details are accurate.
        </p>
      </div>

      <div className="card-body">
        {/* Certificate Preview */}
        <div className="mb-5 p-4 bg-background rounded-4 border border-borders-cards shadow-sm">
            <h3 className="h5 text-center text-headings mb-4">Certificate Preview</h3>
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
                        <span className="fw-bold small text-text-general">{childInfo?.fullName || '[Not Provided]'}</span>
                    </div>
                    <div className="list-group-item d-flex justify-content-between align-items-center px-0 py-2 border-0 bg-white">
                        <span className="text-muted small">Date of Birth:</span>
                        <span className="fw-bold small text-text-general">{childInfo?.dateOfBirth || '[Not Provided]'}</span>
                    </div>
                    <div className="list-group-item d-flex justify-content-between align-items-center px-0 py-2 border-0 bg-white">
                        <span className="text-muted small">Place of Birth:</span>
                        <span className="fw-bold small text-text-general">{`${childInfo?.cityOfBirth || ''}, ${childInfo?.stateOfBirth || ''}, ${childInfo?.countryOfBirth || ''}`.replace(/^[,\s]+|[,\s]+$/g, '') || '[Not Provided]'}</span>
                    </div>
                    <div className="list-group-item d-flex justify-content-between align-items-center px-0 py-2 border-0 bg-white">
                        <span className="text-muted small">Mother's Name:</span>
                        <span className="fw-bold small text-text-general">{motherInfo?.fullName || '[Not Provided]'}</span>
                    </div>
                    <div className="list-group-item d-flex justify-content-between align-items-center px-0 py-2 border-0 bg-white">
                        <span className="text-muted small">Father's Name:</span>
                        <span className="fw-bold small text-text-general">{fatherInfo?.isUnknown ? 'Unknown' : (fatherInfo?.fullName || '[Not Provided]')}</span>
                    </div>
                </div>

                <div className="pt-3 border-top border-borders-cards d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center justify-content-center bg-primary-subtle rounded-3 p-2" style={{ width: '56px', height: '56px' }}>
                        {/* Placeholder for QR Code */}
                        <img src="https://www.qr-code-generator.com/wp-content/themes/qr/new_structure/assets/images/design-options.webp" alt="QR Code" style={{ width: '48px', height: '48px' }} />
                    </div>
                    <div className="text-end">
                        <p className="text-muted small mb-1">Date of Application:</p>
                        <p className="fw-bold small mb-0 text-text-general">{new Date()?.toLocaleDateString()}</p>
                    </div>
                </div>

            {/* Doctor/Hospital Information */}
            <div className="pt-3 mt-3 border-top border-borders-cards">
                <h6 className="text-muted small mb-2">Attending Details:</h6>
                <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="text-text-general small">Attending Doctor:</span>
                    <span className="fw-bold small text-text-general">{childInfo?.attendingDoctor || 'Not Provided'}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <span className="text-text-general small">Attending Hospital:</span>
                    <span className="fw-bold small text-text-general">{childInfo?.attendingHospital || 'Not Provided'}</span>
                </div>
            </div>
        </div>
        </div>
        {/* Child Information Review */}
        <div className="mb-4 pb-4 border-bottom border-borders-cards">
          <h3 className="h5 mb-3 text-headings">Child Information</h3>
          <dl className="row g-3">
            <InfoRow label="Full Name" value={childInfo?.fullName} />
            <InfoRow label="Date of Birth" value={childInfo?.dateOfBirth} />
            <InfoRow label="Time of Birth" value={childInfo?.timeOfBirth} />
            <InfoRow label="Place of Birth" value={childInfo?.placeOfBirth} fullWidth={true} />
            <InfoRow label="Gender" value={childInfo?.gender} />
            <InfoRow label="Weight at Birth" value={childInfo?.weight ? `${childInfo.weight} lbs` : ''} />
            <InfoRow label="City of Birth" value={childInfo?.cityOfBirth} />
            <InfoRow label="State of Birth" value={childInfo?.stateOfBirth} />
            <InfoRow label="Country of Birth" value={childInfo?.countryOfBirth} />
          </dl>
        </div>

        {/* Mother's Information Review */}
        <div className="mb-4 pb-4 border-bottom border-borders-cards">
          <h3 className="h5 mb-3 text-headings">Mother's Information</h3>
          <dl className="row g-3">
            <InfoRow label="Full Name" value={motherInfo?.fullName} />
            <InfoRow label="Date of Birth" value={motherInfo?.dateOfBirth} />
            <InfoRow label="Nationality" value={motherInfo?.nationality} />
            <InfoRow label="ID Number" value={motherInfo?.idNumber} />
            <InfoRow label="Age at Birth" value={motherInfo?.ageAtBirth} />
            <InfoRow label="Place of Birth" value={motherInfo?.placeOfBirth} />
            <InfoRow label="Address" value={motherInfo?.address} fullWidth={true} />
            <InfoRow label="City" value={motherInfo?.city} />
            <InfoRow label="State" value={motherInfo?.state} />
            <InfoRow label="ZIP Code" value={motherInfo?.zipCode} />
            <InfoRow label="Phone" value={motherInfo?.phone} />
            <InfoRow label="Email" value={motherInfo?.email} />
            <InfoRow label="Occupation" value={motherInfo?.occupation} />
            <InfoRow label="Education" value={motherInfo?.education} />
          </dl>
        </div>

        {/* Father's Information Review */}
        <div className="mb-4 pb-4 border-bottom border-borders-cards">
          <h3 className="h5 mb-3 text-headings">Father's Information</h3>
          {fatherInfo?.isUnknown ? (
            <p className="text-muted fst-italic">Father's information not provided (marked as unknown)</p>
          ) : (
            <dl className="row g-3">
              <InfoRow label="Full Name" value={fatherInfo?.fullName} />
              <InfoRow label="Date of Birth" value={fatherInfo?.dateOfBirth} />
              <InfoRow label="Nationality" value={fatherInfo?.nationality} />
              <InfoRow label="ID Number" value={fatherInfo?.idNumber} />
              <InfoRow label="Age at Birth" value={fatherInfo?.ageAtBirth} />
              <InfoRow label="Place of Birth" value={fatherInfo?.placeOfBirth} />
              <InfoRow label="Address" value={fatherInfo?.address} fullWidth={true} />
              <InfoRow label="City" value={fatherInfo?.city} />
              <InfoRow label="State" value={fatherInfo?.state} />
              <InfoRow label="ZIP Code" value={fatherInfo?.zipCode} />
              <InfoRow label="Phone" value={fatherInfo?.phone} />
              <InfoRow label="Email" value={fatherInfo?.email} />
              <InfoRow label="Occupation" value={fatherInfo?.occupation} />
              <InfoRow label="Education" value={fatherInfo?.education} />
            </dl>
          )}
        </div>

        {/* Contact Information Review */}
        <div className="mb-4 pb-4 border-bottom border-borders-cards">
          <h3 className="h5 mb-3 text-headings">Contact Information</h3>
          <dl className="row g-3">
            <InfoRow label="Primary Email" value={contactInfo?.email} />
            <InfoRow label="Phone Number" value={contactInfo?.phoneNumber} />
            <InfoRow label="Residential Address" value={contactInfo?.address} fullWidth={true} />
          </dl>
        </div>

        {/* Documents Review */}
        <div className="mb-4 pb-4 border-bottom border-borders-cards">
          <h3 className="h5 mb-3 text-headings">Uploaded Documents</h3>
          {Object.keys(documents).length === 0 ? (
            <p className="text-muted fst-italic">No documents uploaded.</p>
          ) : (
            <ul className="list-group list-group-flush">
              {Object.entries(documents).map(([docId, file]) => (
                <li key={docId} className="list-group-item d-flex justify-content-between align-items-center bg-white px-0 py-2 border-0 border-bottom border-borders-cards">
                  <span className="text-text-general">{documentTypes[docId] || docId}</span>
                  <span className="badge bg-success-confirm text-white px-3 py-2 rounded-pill">
                    <i className="bi bi-check-circle-fill me-1"></i> {String(file.name)}
                  </span>
                </li>
              ))}
            </ul>
          )}
          {errors?.documents && Object.values(errors.documents).map((errorMsg, index) => (
            <div key={index} className="invalid-feedback text-alerts-error d-block">{String(errorMsg)}</div>
          ))}
        </div>

        {/* Agreements and Declarations */}
        <div>
          <h3 className="h5 mb-3 text-headings">Agreements and Declarations</h3>
          <div className="form-check mb-2">
            <input
              className={`form-check-input border-borders-cards ${errors?.agreements?.accuracy ? 'is-invalid' : ''}`}
              type="checkbox"
              id="accuracyAgreement"
              checked={agreements?.accuracy || false}
              onChange={(e) => updateFormData('agreements', { ...agreements, accuracy: e?.target?.checked })}
              required
            />
            <label className="form-check-label text-text-general" htmlFor="accuracyAgreement">
              I certify that all information provided is true and accurate to the best of my knowledge.
            </label>
            {errors?.agreements?.accuracy && <div className="invalid-feedback text-alerts-error">{String(errors?.agreements?.accuracy)}</div>}
          </div>

          <div className="form-check mb-2">
            <input
              className={`form-check-input border-borders-cards ${errors?.agreements?.medicalReview ? 'is-invalid' : ''}`}
              type="checkbox"
              id="medicalReviewAgreement"
              checked={agreements?.medicalReview || false}
              onChange={(e) => updateFormData('agreements', { ...agreements, medicalReview: e?.target?.checked })}
              required
            />
            <label className="form-check-label text-text-general" htmlFor="medicalReviewAgreement">
              I agree to the review of medical records relevant to the birth registration.
            </label>
            {errors?.agreements?.medicalReview && <div className="invalid-feedback text-alerts-error">{String(errors?.agreements?.medicalReview)}</div>}
          </div>

          <div className="form-check mb-2">
            <input
              className={`form-check-input border-borders-cards ${errors?.agreements?.dataProcessing ? 'is-invalid' : ''}`}
              type="checkbox"
              id="dataProcessingAgreement"
              checked={agreements?.dataProcessing || false}
              onChange={(e) => updateFormData('agreements', { ...agreements, dataProcessing: e?.target?.checked })}
              required
            />
            <label className="form-check-label text-text-general" htmlFor="dataProcessingAgreement">
              I consent to the processing of my personal data for the purpose of birth certificate issuance.
            </label>
            {errors?.agreements?.dataProcessing && <div className="invalid-feedback text-alerts-error">{String(errors?.agreements?.dataProcessing)}</div>}
          </div>

          <div className="form-check mb-3">
            <input
              className={`form-check-input border-borders-cards ${errors?.agreements?.fees ? 'is-invalid' : ''}`}
              type="checkbox"
              id="feesAcknowledgement"
              checked={agreements?.fees || false}
              onChange={(e) => updateFormData('agreements', { ...agreements, fees: e?.target?.checked })}
              required
            />
            <label className="form-check-label text-text-general" htmlFor="feesAcknowledgement">
              I acknowledge that applicable fees may apply for the issuance of the certificate.
            </label>
            {errors?.agreements?.fees && <div className="invalid-feedback text-alerts-error">{String(errors?.agreements?.fees)}</div>}
          </div>

          {errors?.general && <div className="alert alert-alerts-error bg-alerts-error-subtle text-alerts-error mt-3">{String(errors?.general)}</div>}

          <div className="d-flex justify-content-end mt-4">
            <button
              type="button"
              className="btn btn-primary-button btn-lg text-white hover-bg-accent-color"
              onClick={onSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              ) : (
                <i className="bi bi-send-fill me-2"></i>
              )}
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSubmitStep;
