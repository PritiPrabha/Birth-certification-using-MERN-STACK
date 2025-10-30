import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; // Assuming you'll have some global app styles
import './index.css'; // Import global styles and Bootstrap
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/landing-page';
import ApplyPage from './pages/ApplyPage'; // Use the new dedicated ApplyPage
import Authentication from './pages/authentication';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import ParentDashboard from './pages/parent-dashboard';
import AdminDashboard from './pages/admin-dashboard';
import DoctorDashboard from './pages/doctor-dashboard';
import SupportPage from './pages/SupportPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import VerificationPage from './pages/VerificationPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route element={<ProtectedRoute allowedRoles={['parent']} />}>
            <Route path="/apply" element={<ApplyPage />} />
          </Route>
          <Route path="/authentication" element={<Authentication />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={['parent']} />}>
            <Route path="/parent-dashboard" element={<ParentDashboard />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={['doctor']} />}>
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          </Route>

          {/* Public or common protected routes */}
          <Route element={<ProtectedRoute />}> {/* No specific roles, just authenticated */}
            <Route path="/support" element={<SupportPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/verify-certificate" element={<VerificationPage />} />
          </Route>
        </Routes>
        {/* Footer will go here later */}
      </div>
    </Router>
  );
}

export default App;
