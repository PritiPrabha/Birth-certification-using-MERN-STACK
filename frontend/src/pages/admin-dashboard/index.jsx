import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AnalyticsPanel from './components/AnalyticsPanel';
import SearchAndFilters from './components/SearchAndFilters';
import ApplicationsTable from './components/ApplicationsTable';
import ApplicationReviewModal from './components/ApplicationReviewModal';
import UserManagementPanel from './components/UserManagementPanel';
import DoctorManagementPanel from './components/DoctorManagementPanel';

const ReportsPanel = () => {
  const [loadingCSV, setLoadingCSV] = useState(false);
  const [loadingPDF, setLoadingPDF] = useState(false);
  const [error, setError] = useState(null);

  const handleDownloadCSV = async () => {
    setLoadingCSV(true);
    setError(null); // Clear previous errors
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found.');
      }

      const response = await fetch('/api/admin/reports/csv', {
        headers: {
          'x-auth-token': token,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Failed to download CSV report.');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'applications_report.csv');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      alert('CSV report downloaded successfully!');
    } catch (err) {
      console.error('CSV download error:', err);
      setError(err.message || 'An error occurred while downloading CSV.');
    } finally {
      setLoadingCSV(false);
    }
  };

  const handleDownloadPDF = async () => {
    setLoadingPDF(true);
    setError(null); // Clear previous errors
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found.');
      }

      const response = await fetch('/api/admin/reports/pdf', {
        headers: {
          'x-auth-token': token,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Failed to download PDF report.');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'applications_report.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      alert('PDF report downloaded successfully!');
    } catch (err) {
      console.error('PDF download error:', err);
      setError(err.message || 'An error occurred while downloading PDF.');
    } finally {
      setLoadingPDF(false);
    }
  };

  return (
    <div className="card shadow-sm border-0 rounded-4 p-4 bg-white mt-4">
      <h3 className="h5 text-headings mb-3">Generate Reports</h3>
      <p className="text-text-general mb-3">Download comprehensive reports of application data in various formats.</p>
      {error && <div className="alert alert-alerts-error bg-alerts-error-subtle text-alerts-error mb-3" role="alert">{error}</div>}
      <div className="d-flex gap-3">
        <button 
          className="btn btn-primary-button text-white hover-bg-accent-color"
          onClick={handleDownloadCSV}
          disabled={loadingCSV}
        >
          {loadingCSV ? (
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          ) : (
            <i className="bi bi-file-earmark-spreadsheet me-2"></i>
          )}
          Download CSV
        </button>
        <button 
          className="btn btn-secondary-button text-white hover-bg-accent-color"
          onClick={handleDownloadPDF}
          disabled={loadingPDF}
        >
          {loadingPDF ? (
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          ) : (
            <i className="bi bi-file-earmark-pdf me-2"></i>
          )}
          Download PDF
        </button>
      </div>
    </div>
  );
};

// Import child components here as they are created

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSearchTerm, setCurrentSearchTerm] = useState('');
  const [currentStatusFilter, setCurrentStatusFilter] = useState('all');
  const [currentDateFilter, setCurrentDateFilter] = useState('');
  const [showReviewModal, setShowReviewModal] = useState(false);
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
          app.contactEmail.toLowerCase().includes(search.toLowerCase())
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
        if (!user || user.role !== 'admin') {
          throw new Error('Unauthorized access. Must be an admin.');
        }

        const response = await fetch('/api/applications/all', {
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

  const handleReviewApplication = (application) => {
    setSelectedApplication(application);
    setShowReviewModal(true);
  };

  const handleCloseReviewModal = () => {
    setShowReviewModal(false);
    setSelectedApplication(null);
  };

  const handleUpdateApplicationStatus = (appId, newStatus, reason) => {
    setApplications(prevApps => prevApps.map(app =>
      app.id === appId ? { ...app, status: newStatus, reason: reason } : app
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
          <Link className="navbar-brand text-navbar-text" to="/admin-dashboard">
            <img src="/logo.svg" alt="Logo" width="30" height="24" className="d-inline-block align-text-top me-2" />
            Admin Dashboard
          </Link>
          <div className="d-flex">
            {/* Assuming user name is available in localStorage or context */}
            <span className="navbar-text me-3 text-navbar-text">Welcome, {JSON.parse(localStorage.getItem('user'))?.name || 'Admin'}</span>
            <button className="btn btn-outline-alerts-error text-alerts-error" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right"></i> Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="container px-4 py-5">
        <h1 className="display-5 fw-bold text-headings mb-4">Admin Dashboard</h1>
        
        {/* Tab Navigation */}
        <ul className="nav nav-tabs nav-fill mb-4" id="adminDashboardTabs" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-link active text-headings" id="applications-tab" data-bs-toggle="tab" data-bs-target="#applications" type="button" role="tab" aria-controls="applications" aria-selected="true">Applications</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link text-headings" id="users-tab" data-bs-toggle="tab" data-bs-target="#users" type="button" role="tab" aria-controls="users" aria-selected="false">Users</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link text-headings" id="doctors-tab" data-bs-toggle="tab" data-bs-target="#doctors" type="button" role="tab" aria-controls="doctors" aria-selected="false">Doctors</button>
          </li>
        </ul>

        {/* Tab Content */}
        <div className="tab-content" id="adminDashboardTabsContent">
          <div className="tab-pane fade show active" id="applications" role="tabpanel" aria-labelledby="applications-tab">
            {/* Analytics Panel */}
            <AnalyticsPanel />

            {/* Search and Filters */}
            <SearchAndFilters onSearch={handleSearch} onFilterChange={handleFilterChange} />

            {/* Applications Table */}
            <ApplicationsTable applications={filteredApplications} onReview={handleReviewApplication} />

            {/* Reports Panel */}
            <ReportsPanel />
          </div>
          <div className="tab-pane fade" id="users" role="tabpanel" aria-labelledby="users-tab">
            <UserManagementPanel />
          </div>
          <div className="tab-pane fade" id="doctors" role="tabpanel" aria-labelledby="doctors-tab">
            <DoctorManagementPanel />
          </div>
        </div>

        {/* Application Review Modal */}
        {showReviewModal && (
          <ApplicationReviewModal 
            show={showReviewModal}
            onClose={handleCloseReviewModal}
            application={selectedApplication}
            onUpdateStatus={handleUpdateApplicationStatus} 
          />
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
