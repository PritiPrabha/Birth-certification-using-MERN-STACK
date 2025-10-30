import React from 'react';
import ApplicationForm from './application-form';

const ApplyPage = () => {
  return (
    <div className="min-vh-100 bg-background py-5">
      <div className="container">
        <h1 className="display-5 fw-bold text-headings mb-4 text-center">Start Your Application</h1>
        <p className="lead text-text-general mb-5 text-center">
          Fill out the form below to apply for your digital birth certificate.
        </p>
        <ApplicationForm />
      </div>
    </div>
  );
};

export default ApplyPage;
