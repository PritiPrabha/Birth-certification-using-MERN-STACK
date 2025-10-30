import React from 'react';

const BenefitsSection = () => {
  const benefits = [
    {
      icon: "shield-fill-check",
      title: "Government Approved",
      description: "Our digital certificates are officially recognized and approved by government agencies nationwide.",
    },
    {
      icon: "lock-fill",
      title: "Secure & Private",
      description: "Your sensitive data is protected with advanced encryption and compliance with privacy regulations.",
    },
    {
      icon: "clock-fill",
      title: "Fast Processing",
      description: "Receive your digital birth certificate quickly with our streamlined application and verification process.",
    },
    {
      icon: "truck",
      title: "Convenient Access",
      description: "Access and share your certificate securely from anywhere, at any time.",
    },
  ];

  return (
    <section className="py-5 bg-background">
      <div className="container">
        <h2 className="text-center display-5 fw-bold text-headings mb-5">
          Why Choose LifeCert?
        </h2>
        <div className="row g-4">
          {benefits.map((benefit, index) => (
            <div className="col-md-6 col-lg-3" key={index}>
              <div className="card h-100 shadow-sm border-0 rounded-4 p-4 text-center bg-background card-hover">
                <div className="d-flex justify-content-center mb-3">
                  <div className="bg-success-subtle text-success-confirm rounded-circle d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                    <i className={`bi bi-${benefit.icon} fs-3`}></i>
                  </div>
                </div>
                <h3 className="h5 fw-bold text-headings mb-2">{benefit.title}</h3>
                <p className="text-text-general mb-0">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
