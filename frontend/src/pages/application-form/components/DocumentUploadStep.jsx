import React, { useState } from "react";

const DocumentUploadStep = ({ formData, updateFormData, errors }) => {
  const [dragging, setDragging] = useState(false);

  const handleFile = (file, id) => {
    const newDoc = {
      name: file.name,
      size: file.size,
      type: file.type,
      uploadDate: new Date().toISOString(),
    };
    updateFormData("documents", {
      ...formData?.documents,
      [id]: newDoc,
    });
  };

  return (
    <div className="card shadow-lg border-0 rounded-4 bg-light mb-4">
      <div className="card-header bg-info text-white rounded-top-4">
        <h4 className="mb-0">Upload Required Documents</h4>
      </div>
      <div className="card-body">
        <div
          className={`border border-2 rounded-4 p-5 text-center ${
            dragging ? "border-primary bg-light" : "border-secondary"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            const file = e.dataTransfer.files[0];
            if (file) handleFile(file, "document");
          }}
        >
          <i className="bi bi-cloud-upload fs-2 text-primary mb-3"></i>
          <p className="fw-semibold">Drag and drop your files here</p>
          <p className="text-muted">or click below to upload manually</p>
          <input
            type="file"
            id="file-upload"
            hidden
            onChange={(e) => handleFile(e.target.files[0], "document")}
          />
          <button
            className="btn btn-outline-primary mt-2"
            onClick={() => document.getElementById("file-upload").click()}
          >
            Browse Files
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentUploadStep;
