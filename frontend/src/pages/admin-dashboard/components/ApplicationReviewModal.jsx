import React, { useState, useEffect } from "react";
import moment from "moment";

const ApplicationReviewModal = ({ show, onClose, application, onUpdateStatus }) => {
  const [reviewStatus, setReviewStatus] = useState("pending");
  const [reviewReason, setReviewReason] = useState("");

  // ✅ Sync local state with the current application
  useEffect(() => {
    if (application) {
      setReviewStatus(application.status || "pending");
      setReviewReason(application.reason || "");
    }
  }, [application]);

  if (!show || !application) return null;

  // ✅ Better bootstrap-friendly badge colors
  const getStatusClasses = (status) => {
    switch (status) {
      case "pending":
        return "badge bg-warning text-dark";
      case "in-review":
        return "badge bg-info text-dark";
      case "approved":
        return "badge bg-success text-white";
      case "rejected":
        return "badge bg-danger text-white";
      default:
        return "badge bg-secondary text-white";
    }
  };

  const documentTypes = {
    hospital_record: "Hospital Birth Record",
    parent_id_mother: "Mother's Identification",
    parent_id_father: "Father's Identification",
    marriage_certificate: "Marriage Certificate",
    medical_records: "Additional Medical Records",
  };

  const InfoRow = ({ label, value }) => (
    <div className="col-12 col-md-6 mb-3">
      <p className="small text-muted mb-0">{label}</p>
      <p className="fw-semibold text-dark">{value || "Not provided"}</p>
    </div>
  );

  const handleSubmitReview = () => {
    onUpdateStatus(application.id, reviewStatus, reviewReason);
    onClose();
  };

  return (
    <>
      {/* Overlay Backdrop */}
      <div
        className="position-fixed top-0 start-0 w-100 h-100"
        style={{
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 1050,
        }}
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div
        className="modal d-block fade show"
        tabIndex="-1"
        role="dialog"
        style={{ zIndex: 1051 }}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden">
            <div className="modal-header bg-primary text-white border-0">
              <h5 className="modal-title fw-semibold">
                Review Application #{application.id}
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                aria-label="Close"
                onClick={onClose}
              ></button>
            </div>

            <div className="modal-body bg-light p-4">
              {/* Current Status */}
              <div className="mb-4">
                <p className="text-muted mb-1">Current Status</p>
                <span
                  className={`${getStatusClasses(
                    application.status
                  )} fw-semibold fs-6 px-3 py-2 rounded-pill`}
                >
                  {application.status.replace("-", " ").toUpperCase()}
                </span>
              </div>

              {/* Application Details */}
              <div className="row mb-4">
                <InfoRow label="Child Name" value={application.childName} />
                <InfoRow
                  label="Date of Birth"
                  value={moment(application.dateOfBirth).format("MMMM D, YYYY")}
                />
                <InfoRow
                  label="Submission Date"
                  value={moment(application.submissionDate).format("MMMM D, YYYY")}
                />
                <InfoRow label="Mother's Name" value={application.motherName} />
                <InfoRow label="Father's Name" value={application.fatherName} />
                <InfoRow label="Contact Email" value={application.contactEmail} />
                {application.certificateId && (
                  <InfoRow
                    label="Certificate ID"
                    value={application.certificateId}
                  />
                )}
              </div>

              {/* Documents Section */}
              <h6 className="fw-bold text-dark mb-3">
                <i className="bi bi-folder2-open text-primary me-2"></i>Documents
              </h6>
              <ul className="list-group mb-4">
                {Object.keys(application.documents || {}).length > 0 ? (
                  Object.entries(application.documents).map(([docId, doc]) => (
                    <li
                      key={docId}
                      className="list-group-item d-flex justify-content-between align-items-center border-0 border-bottom bg-white"
                    >
                      <span className="fw-semibold text-dark">
                        {documentTypes[docId] || docId}
                      </span>
                      {doc?.url ? (
                        <div className="d-flex gap-2">
                          <a
                            href={doc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm btn-outline-primary"
                          >
                            View <i className="bi bi-box-arrow-up-right ms-1"></i>
                          </a>
                          <a
                            href={doc.url}
                            download
                            className="btn btn-sm btn-primary"
                          >
                            Download <i className="bi bi-download ms-1"></i>
                          </a>
                        </div>
                      ) : (
                        <span className="text-muted small">Not uploaded</span>
                      )}
                    </li>
                  ))
                ) : (
                  <li className="list-group-item text-muted fst-italic bg-white">
                    No documents found for this application.
                  </li>
                )}
              </ul>

              {/* Review Status Dropdown */}
              <div className="mb-3">
                <label
                  htmlFor="reviewStatus"
                  className="form-label fw-semibold text-dark"
                >
                  Update Status
                </label>
                <select
                  id="reviewStatus"
                  className="form-select"
                  value={reviewStatus}
                  onChange={(e) => setReviewStatus(e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="in-review">In Review</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              {/* Review Reason (optional) */}
              {(reviewStatus === "rejected" || reviewStatus === "in-review") && (
                <div className="mb-3">
                  <label
                    htmlFor="reviewReason"
                    className="form-label fw-semibold text-dark"
                  >
                    Reason (optional)
                  </label>
                  <textarea
                    id="reviewReason"
                    className="form-control"
                    rows="3"
                    value={reviewReason}
                    onChange={(e) => setReviewReason(e.target.value)}
                    placeholder="Provide a reason for rejection or further review..."
                  ></textarea>
                </div>
              )}
            </div>

            <div className="modal-footer bg-white border-top-0">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmitReview}
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicationReviewModal;
