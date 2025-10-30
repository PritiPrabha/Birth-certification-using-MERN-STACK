import React from "react";

const ParentsInformationStep = ({ formData, updateFormData, errors }) => {
  const handleChange = (section, field, value) =>
    updateFormData(section, { ...formData?.[section], [field]: value });

  return (
    <div className="card shadow-lg border-0 rounded-4 bg-light mb-4">
      <div className="card-header bg-secondary text-white rounded-top-4">
        <h4 className="mb-0">Parents Information</h4>
      </div>

      <div className="card-body">
        <h5 className="text-primary mb-3">Mother’s Details</h5>
        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Mother’s full name"
              value={formData?.motherInfo?.fullName || ""}
              onChange={(e) => handleChange("motherInfo", "fullName", e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">Nationality</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g., Indian"
              value={formData?.motherInfo?.nationality || ""}
              onChange={(e) => handleChange("motherInfo", "nationality", e.target.value)}
            />
          </div>
        </div>

        <h5 className="text-primary mb-3">Father’s Details</h5>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Father’s full name"
              value={formData?.fatherInfo?.fullName || ""}
              onChange={(e) => handleChange("fatherInfo", "fullName", e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">Nationality</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g., Indian"
              value={formData?.fatherInfo?.nationality || ""}
              onChange={(e) => handleChange("fatherInfo", "nationality", e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentsInformationStep;
