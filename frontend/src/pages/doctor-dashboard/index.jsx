import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import QuickActions from './components/QuickActions';
import VerificationStats from './components/VerificationStats';
import ApplicationsTable from './components/ApplicationsTable';
import ApplicationModal from './components/ApplicationModal';
import SearchAndFilters from '../admin-dashboard/components/SearchAndFilters'; // Reusing from admin dashboard
// Import child components here as they are created

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSearchTerm, setCurrentSearchTerm] = useState('');
  const [currentStatusFilter, setCurrentStatusFilter] = useState('all');
  const [currentDateFilter, setCurrentDateFilter] = useState('');
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  // Function to apply filters
  const applyFilters = useCallback((search = currentSearchTerm, status = currentStatusFilter, date = currentDateFilter) => {
    let updatedList = [...applications];

    // Search filter
    if (search) {
      updatedList = updatedList.filter(
        (app) =>
          app.childName.toLowerCase().includes(search.toLowerCase()) ||
          app.id.toLowerCase().includes(search.toLowerCase()) ||
          app.hospitalName.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Status filter
    if (status !== 'all') {
      updatedList = updatedList.filter((app) => app.status === status);
    }

    // Date filter (e.g., submission date)
    if (date) {
      updatedList = updatedList.filter((app) => app.submissionDate === date);
    }

    setFilteredApplications(updatedList);
  }, [applications, currentSearchTerm, currentStatusFilter, currentDateFilter]);

  useEffect(() => {
    // Simulate fetching data
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found.');
        }

        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || user.role !== 'doctor') {
          throw new Error('Unauthorized access. Must be a doctor.');
        }

        const response = await fetch('/api/applications/doctor', {
          headers: {
            'x-auth-token': token,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch applications');
        }

        const data = await response.json();
        setApplications(data);
        setFilteredApplications(data); // Initialize filtered applications
      } catch (err) {
        setError(err.message || 'Failed to load applications.');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []); // Empty dependency array means this runs once on mount

  // Re-apply filters whenever applications or filter criteria change
  useEffect(() => {
    applyFilters();
  }, [applications, currentSearchTerm, currentStatusFilter, currentDateFilter, applyFilters]);

  const handleSearch = (term) => {
    setCurrentSearchTerm(term);
  };

  const handleFilterChange = ({ status, date }) => {
    if (status !== undefined) {
      setCurrentStatusFilter(status);
    }
    if (date !== undefined) {
      setCurrentDateFilter(date);
    }
  };

  const handleViewApplication = (application) => {
    setSelectedApplication(application);
    setShowApplicationModal(true);
  };

  const handleCloseApplicationModal = () => {
    setShowApplicationModal(false);
    setSelectedApplication(null);
  };

  const handleUpdateApplicationStatus = (appId, newStatus, reviewNotes) => {
    setApplications(prevApps => prevApps.map(app =>
      app.id === appId ? { ...app, status: newStatus, reviewNotes: reviewNotes } : app
    ));
    // The filteredApplications will be updated automatically by the useEffect hook
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/authentication');
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-background">
        <div className="spinner-border text-primary-button" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-alerts-error text-center mt-5" role="alert">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-background">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-navbar-bg shadow-sm">
        <div className="container-fluid">
          <Link className="navbar-brand text-navbar-text" to="/doctor-dashboard">
            <img src="/logo.svg" alt="Logo" width="30" height="24" className="d-inline-block align-text-top me-2" />
            Doctor Dashboard
          </Link>
          <div className="d-flex">
            {/* Assuming user name is available in localStorage or context */}
            <span className="navbar-text me-3 text-navbar-text">Welcome, {JSON.parse(localStorage.getItem('user'))?.name || 'Doctor'}</span>
            <button className="btn btn-outline-alerts-error text-alerts-error" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right"></i> Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="container px-4 py-5">
        <h1 className="display-5 fw-bold text-headings mb-4">Verification & Review</h1>
        
        {/* Quick Actions */}
        <QuickActions onNewApplication={() => navigate('/apply')} />

        {/* Summary Stats */}
        <VerificationStats />

        {/* Search and Filters */}
        {/* <SearchAndFilters onSearch={handleSearch} onFilterChange={handleFilterChange} /> */}
        <SearchAndFilters onSearch={handleSearch} onFilterChange={handleFilterChange} />

        {/* Applications Table (Doctor specific) */}
        <ApplicationsTable applications={filteredApplications} onVerify={handleViewApplication} />

        {/* Application Modal for Doctors */}
        {showApplicationModal && (
          <ApplicationModal 
            show={showApplicationModal}
            onClose={handleCloseApplicationModal}
            application={selectedApplication}
            onUpdateStatus={handleUpdateApplicationStatus}
          />
        )}
      </main>
    </div>
  );
};

export default DoctorDashboard;
