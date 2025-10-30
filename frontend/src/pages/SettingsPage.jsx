import React from 'react';
import { Link } from 'react-router-dom';

const SettingsPage = () => {
  return (
    <div className="min-vh-100 bg-background py-5">
      <div className="container">
        <h1 className="display-5 fw-bold text-headings mb-4 text-center">Account Settings</h1>
        <p className="lead text-text-general mb-5 text-center">
          Manage your profile, security, and preferences.
        </p>

        <div className="row g-4 justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm border-0 rounded-4 p-4 bg-white text-center">
              <div className="card-body d-flex flex-column align-items-center justify-content-center">
                <i className="bi bi-person-circle text-primary-button mb-3" style={{ fontSize: '3rem' }}></i>
                <h5 className="card-title text-headings mb-3">Edit Profile</h5>
                <p className="card-text text-text-general">Update your personal information.</p>
                <Link to="/profile" className="btn btn-outline-primary-button mt-auto text-primary-button">Go to Profile</Link>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm border-0 rounded-4 p-4 bg-white text-center">
              <div className="card-body d-flex flex-column align-items-center justify-content-center">
                <i className="bi bi-shield-lock text-primary-button mb-3" style={{ fontSize: '3rem' }}></i>
                <h5 className="card-title text-headings mb-3">Security</h5>
                <p className="card-text text-text-general">Change your password or manage security settings.</p>
                <Link to="/settings/security" className="btn btn-primary-button mt-auto text-white">Manage Security</Link>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm border-0 rounded-4 p-4 bg-white text-center">
              <div className="card-body d-flex flex-column align-items-center justify-content-center">
                <i className="bi bi-gear text-primary-button mb-3" style={{ fontSize: '3rem' }}></i>
                <h5 className="card-title text-headings mb-3">Preferences</h5>
                <p className="card-text text-text-general">Adjust your notification and display preferences.</p>
                <Link to="/settings/preferences" className="btn btn-outline-secondary-button mt-auto text-secondary-button-text">Edit Preferences</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
