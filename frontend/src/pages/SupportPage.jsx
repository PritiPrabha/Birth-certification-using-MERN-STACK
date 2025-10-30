import React from 'react';
import { Link } from 'react-router-dom';

const SupportPage = () => {
  return (
    <div className="min-vh-100 bg-background py-5">
      <div className="container">
        <h1 className="display-5 fw-bold text-headings mb-4 text-center">Support & Help</h1>
        <p className="lead text-text-general mb-5 text-center">
          Find answers to common questions or contact us for further assistance.
        </p>

        <div className="row g-4 justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm border-0 rounded-4 p-4 bg-white text-center">
              <div className="card-body d-flex flex-column align-items-center justify-content-center">
                <i className="bi bi-question-circle text-primary-button mb-3" style={{ fontSize: '3rem' }}></i>
                <h5 className="card-title text-headings mb-3">Frequently Asked Questions</h5>
                <p className="card-text text-text-general">Browse our FAQs for quick answers to common queries.</p>
                <Link to="/support/faq" className="btn btn-outline-primary-button mt-auto text-primary-button">View FAQs</Link>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm border-0 rounded-4 p-4 bg-white text-center">
              <div className="card-body d-flex flex-column align-items-center justify-content-center">
                <i className="bi bi-envelope text-primary-button mb-3" style={{ fontSize: '3rem' }}></i>
                <h5 className="card-title text-headings mb-3">Contact Us</h5>
                <p className="card-text text-text-general">Can't find what you're looking for? Send us a message.</p>
                <Link to="/support/contact" className="btn btn-primary-button mt-auto text-white">Contact Support</Link>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm border-0 rounded-4 p-4 bg-white text-center">
              <div className="card-body d-flex flex-column align-items-center justify-content-center">
                <i className="bi bi-chat-dots text-primary-button mb-3" style={{ fontSize: '3rem' }}></i>
                <h5 className="card-title text-headings mb-3">Live Chat</h5>
                <p className="card-text text-text-general">Chat with a support agent for real-time assistance.</p>
                <button className="btn btn-outline-secondary-button mt-auto text-secondary-button-text" disabled>Chat Now (Coming Soon)</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
