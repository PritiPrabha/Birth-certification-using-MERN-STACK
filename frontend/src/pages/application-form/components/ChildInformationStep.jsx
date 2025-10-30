import React from "react";
import Select from "../../../components/ui/Select";

const ChildInformationStep = ({ formData, updateFormData, errors }) => {
  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const hospitals = [
    { value: "City General Hospital", label: "City General Hospital" },
    { value: "Community Health Clinic", label: "Community Health Clinic" },
    { value: "St. Jude’s Hospital", label: "St. Jude’s Hospital" },
  ];

  const handleChange = (field, value) => {
    updateFormData("childInfo", { ...formData?.childInfo, [field]: value });
  };

  return (
    <div className="card shadow-lg border-0 rounded-4 bg-light mb-4">
      <div className="card-header bg-primary text-white rounded-top-4">
        <h4 className="mb-0">Child Information</h4>
      </div>

      <div className="card-body">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              className={`form-control ${errors?.childInfo?.fullName ? "is-invalid" : ""}`}
              placeholder="Enter child’s full name"
              value={formData?.childInfo?.fullName || ""}
              onChange={(e) => handleChange("fullName", e.target.value)}
            />
            <div className="invalid-feedback">{errors?.childInfo?.fullName}</div>
          </div>

          <div className="col-md-3">
            <label className="form-label fw-semibold">Date of Birth</label>
            <input
              type="date"
              className="form-control"
              value={formData?.childInfo?.dateOfBirth || ""}
              onChange={(e) => handleChange("dateOfBirth", e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <label className="form-label fw-semibold">Time of Birth</label>
            <input
              type="time"
              className="form-control"
              value={formData?.childInfo?.timeOfBirth || ""}
              onChange={(e) => handleChange("timeOfBirth", e.target.value)}
            />
          </div>

          <div className="col-md-6">
            <Select
              label="Gender"
              options={genderOptions}
              value={formData?.childInfo?.gender || ""}
              onChange={(value) => handleChange("gender", value)}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Weight (lbs)</label>
            <input
              type="number"
              step="0.1"
              className="form-control"
              placeholder="e.g., 7.2"
              value={formData?.childInfo?.weight || ""}
              onChange={(e) => handleChange("weight", e.target.value)}
            />
          </div>

          <div className="col-12">
            <Select
              label="Birth Hospital"
              options={hospitals}
              value={formData?.childInfo?.attendingHospital || ""}
              onChange={(value) => handleChange("attendingHospital", value)}
            />
          </div>
        </div>
      </div>

      <div className="card-footer bg-light border-0">
        <small className="text-muted">
          ⚠️ Ensure details match hospital records exactly.
        </small>
      </div>
    </div>
  );
};

export default ChildInformationStep;
