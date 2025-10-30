import React from 'react';

const ProcessSection = () => {
  const processSteps = [
    {
      icon: "file-earmark-text",
      title: "Fill Out Application",
      description: "Complete our easy-to-use online form with all necessary child and parent information.",
    },
    {
      icon: "cloud-upload",
      title: "Upload Documents",
      description: "Securely upload required identification and hospital birth records.",
    },
    {
      icon: "search",
      title: "Review & Verify",
      description: "Our team reviews your application for accuracy and government compliance.",
    },
    {
      icon: "download",
      title: "Receive Certificate",
      description: "Get your official digital birth certificate via secure download.",
    },
  ];

  return (
    <section className="py-5 bg-background">
      <div className="container">
        <h2 className="text-center display-5 fw-bold text-headings mb-5">
          Our Simple 4-Step Process
        </h2>
        <div className="row g-4 justify-content-center">
          {processSteps.map((step, index) => (
            <div className="col-md-6 col-lg-3" key={index}>
              <div className="card h-100 shadow-sm border-0 rounded-4 p-4 text-center bg-background card-hover">
                <div className="d-flex justify-content-center mb-3">
                  <div className="bg-primary-subtle text-primary-button rounded-circle d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                    <i className={`bi bi-${step.icon} fs-3`}></i>
                  </div>
                </div>
                <h3 className="h5 fw-bold text-headings mb-2">{step.title}</h3>
                <p className="text-text-general mb-0">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
