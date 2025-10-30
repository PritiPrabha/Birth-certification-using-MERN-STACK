import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AnalyticsPanel = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication token not found.");

        const response = await fetch("/api/admin/stats", {
          headers: { "x-auth-token": token },
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.msg || "Failed to fetch analytics.");

        setStats(data);
      } catch (err) {
        console.error("Error fetching analytics:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading analytics...</span>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="alert alert-danger shadow-sm rounded-4 p-3" role="alert">
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        {error}
      </div>
    );

  const summaryStats = [
    {
      label: "Total Applications",
      value: stats.totalApplications,
      icon: "bi-file-earmark-text",
      color: "primary",
      gradient: "linear-gradient(135deg, #4f46e5, #6366f1)",
    },
    {
      label: "Certificates Issued",
      value: stats.totalCertificatesIssued,
      icon: "bi-award",
      color: "success",
      gradient: "linear-gradient(135deg, #10b981, #34d399)",
    },
    {
      label: "Pending",
      value: stats.pendingApplications,
      icon: "bi-hourglass-split",
      color: "warning",
      gradient: "linear-gradient(135deg, #f59e0b, #fbbf24)",
    },
    {
      label: "Rejected",
      value: stats.rejectedApplications,
      icon: "bi-x-circle",
      color: "danger",
      gradient: "linear-gradient(135deg, #ef4444, #f87171)",
    },
  ];

  return (
    <div className="mb-5">
      {/* Header */}
      <div
        className="p-4 rounded-4 mb-4 shadow-sm text-white"
        style={{
          background: "linear-gradient(135deg, #2563eb, #9333ea)",
        }}
      >
        <h2 className="fw-bold mb-1">
          <i className="bi bi-graph-up-arrow me-2"></i>Analytics Overview
        </h2>
        <p className="mb-0 text-light opacity-75">
          Monitor application trends, doctor performance, and key statistics.
        </p>
      </div>

      {/* Summary Stats Cards */}
      <div className="row g-4 mb-4">
        {summaryStats.map((stat, index) => (
          <div className="col-sm-6 col-lg-3" key={index}>
            <div
              className="card h-100 border-0 text-white shadow-lg rounded-4 p-4"
              style={{
                background: stat.gradient,
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-6px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <div className="d-flex align-items-center">
                <div
                  className="me-3 d-flex align-items-center justify-content-center rounded-circle bg-white bg-opacity-25"
                  style={{ width: "56px", height: "56px" }}
                >
                  <i className={`bi ${stat.icon} fs-4`}></i>
                </div>
                <div>
                  <h6 className="text-uppercase fw-bold mb-1 opacity-75">
                    {stat.label}
                  </h6>
                  <h3 className="fw-bold mb-0">{stat.value || 0}</h3>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Doctor Stats */}
      <div className="card shadow-sm border-0 rounded-4 p-4 bg-white mb-4">
        <h5 className="fw-semibold mb-3">
          <i className="bi bi-person-vcard me-2 text-primary"></i>Doctor
          Verification Status
        </h5>
        <div className="row g-3">
          <div className="col-md-6">
            <div className="d-flex align-items-center bg-warning-subtle rounded-4 p-3 shadow-sm">
              <i className="bi bi-person-fill-dash fs-3 text-warning me-3"></i>
              <div>
                <p className="small text-muted mb-0">Pending Verification</p>
                <h4 className="fw-bold text-dark mb-0">
                  {stats.doctorStats?.pending || 0}
                </h4>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex align-items-center bg-success-subtle rounded-4 p-3 shadow-sm">
              <i className="bi bi-person-fill-check fs-3 text-success me-3"></i>
              <div>
                <p className="small text-muted mb-0">Active Doctors</p>
                <h4 className="fw-bold text-dark mb-0">
                  {stats.doctorStats?.verified || 0}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Applications Chart */}
      <div className="card shadow-sm border-0 rounded-4 p-4 bg-white mb-4">
        <h5 className="fw-semibold mb-3">
          <i className="bi bi-bar-chart-line-fill me-2 text-primary"></i>
          Applications Over Time
        </h5>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={stats.applicationsOverTime}
            margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "10px",
                border: "1px solid #e5e7eb",
              }}
            />
            <Line
              type="monotone"
              dataKey="applications"
              stroke="#2563eb"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="approved"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="pending"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Top Doctors */}
      {stats.topDoctors && stats.topDoctors.length > 0 && (
        <div className="card shadow-sm border-0 rounded-4 p-4 bg-white">
          <h5 className="fw-semibold mb-3">
            <i className="bi bi-star-fill text-warning me-2"></i>
            Top Doctors (Certificates Issued)
          </h5>
          <ul className="list-group list-group-flush">
            {stats.topDoctors.map((doctor, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center px-0 py-3 border-0 border-bottom border-light"
              >
                <div className="d-flex align-items-center">
                  <span
                    className="badge bg-gradient rounded-circle me-3 text-white fw-bold"
                    style={{
                      width: "34px",
                      height: "34px",
                      background:
                        index === 0
                          ? "linear-gradient(135deg, #facc15, #f59e0b)"
                          : index === 1
                          ? "linear-gradient(135deg, #a1a1aa, #d4d4d8)"
                          : "linear-gradient(135deg, #c084fc, #a855f7)",
                    }}
                  >
                    {index + 1}
                  </span>
                  <span className="fw-semibold text-dark">{doctor.name}</span>
                </div>
                <span className="badge bg-light text-dark border px-3 py-2 rounded-pill shadow-sm">
                  {doctor.issued} Certificates
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AnalyticsPanel;
