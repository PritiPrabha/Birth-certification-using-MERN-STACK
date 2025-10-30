import React from 'react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="py-5 bg-primary-button text-white text-center">
      <div className="container">
        <h2 className="display-5 fw-bold mb-3">
          Ready to Get Your Child's Birth Certificate?
        </h2>
        <p className="lead mb-4 mx-auto" style={{ maxWidth: '700px' }}>
          Start your application today and experience the easiest, most secure way
          to obtain official digital birth certificates. Join thousands of satisfied parents!
        </p>
        <Link to="/authentication" className="btn btn-light btn-lg text-primary-button shadow-sm">
          Begin Your Application <i className="bi bi-arrow-right ms-2"></i>
        </Link>
      </div>
    </section>
  );
};

export default CTASection;
