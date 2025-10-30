import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="col-md-6 col-lg-5">
        <div className="card shadow-lg border-0 rounded-4 p-4 bg-white card-hover-shadow"> {/* Apply hover shadow here */}
          <Card.Body>
            <ul className="nav nav-pills nav-justified mb-4">
              <li className="nav-item">
                <Link
                  className={`nav-link ${isLogin ? 'active' : ''}`} style={{ cursor: 'pointer' }}
                  aria-current="page"
                  to="#"
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${!isLogin ? 'active' : ''}`} style={{ cursor: 'pointer' }}
                  to="#"
                  onClick={() => setIsLogin(false)}
                >
                  Register
                </Link>
              </li>
            </ul>
            {isLogin ? <LoginForm /> : <RegisterForm />}
          </Card.Body>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
