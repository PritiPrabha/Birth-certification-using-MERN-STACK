import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-navbar-bg shadow-sm">
      <div className="container">
        <Link to="/" className="navbar-brand text-navbar-text">
          LifeCert
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link text-navbar-text" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-navbar-text" to="/apply">Apply</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-navbar-text" to="/support">Support</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-navbar-text" to="/settings">Settings</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-navbar-text" to="/profile">Profile</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link btn btn-primary-button text-white ms-lg-3" to="/authentication">Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
