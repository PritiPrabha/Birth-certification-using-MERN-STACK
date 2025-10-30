import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section
      style={{
        background:
          "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 25%, #dbeafe 50%, #eff6ff 100%)",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 20px",
      }}
    >
      {/* Floating Gradient Circles */}
      <div
        style={{
          position: "absolute",
          top: "-60px",
          left: "-60px",
          width: "180px",
          height: "180px",
          background: "radial-gradient(circle, #3b82f6, #2563eb)",
          borderRadius: "50%",
          opacity: 0.25,
          filter: "blur(50px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-80px",
          right: "-80px",
          width: "200px",
          height: "200px",
          background: "radial-gradient(circle, #0ea5e9, #0369a1)",
          borderRadius: "50%",
          opacity: 0.25,
          filter: "blur(60px)",
        }}
      />

      <div
        style={{
          maxWidth: "1200px",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "40px",
          alignItems: "center",
          zIndex: 2,
        }}
      >
        {/* Left Section */}
        <div style={{ textAlign: "left" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              backgroundColor: "rgba(37, 99, 235, 0.1)",
              color: "#2563eb",
              padding: "8px 16px",
              borderRadius: "30px",
              fontWeight: "600",
              marginBottom: "20px",
            }}
          >
            <i className="bi bi-shield-fill-check" style={{ marginRight: "8px" }}></i>
            Secure & Government Approved
          </div>

          <h1
            style={{
              fontSize: "3rem",
              fontWeight: "800",
              color: "#0f172a",
              lineHeight: "1.2",
              marginBottom: "20px",
            }}
          >
            Digital Birth <br />
            <span style={{ color: "#2563eb" }}>Certificates</span>{" "}
            <span style={{ color: "#475569" }}>Made Simple</span>
          </h1>

          <p
            style={{
              color: "#475569",
              fontSize: "1.1rem",
              maxWidth: "500px",
              marginBottom: "30px",
            }}
          >
            Get your child’s official birth certificate online in just 4 easy
            steps. Fast, secure, and government-verified with instant download.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "15px",
              marginBottom: "30px",
            }}
          >
            <Link
              to="/authentication"
              style={{
                backgroundColor: "#2563eb",
                color: "#fff",
                padding: "14px 28px",
                borderRadius: "12px",
                fontWeight: "600",
                textDecoration: "none",
                boxShadow: "0 4px 12px rgba(37,99,235,0.3)",
                transition: "transform 0.2s ease",
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
            >
              Get Started Free <i className="bi bi-arrow-right ms-2"></i>
            </Link>
            <Link
              to="/authentication"
              style={{
                border: "2px solid #2563eb",
                color: "#2563eb",
                padding: "14px 28px",
                borderRadius: "12px",
                fontWeight: "600",
                textDecoration: "none",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#2563eb";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#2563eb";
              }}
            >
              Sign In <i className="bi bi-box-arrow-in-right ms-2"></i>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              color: "#475569",
              fontSize: "0.9rem",
              fontWeight: "500",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <i className="bi bi-shield-fill-check" style={{ color: "#22c55e" }}></i>
              SSL Secured
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <i className="bi bi-award-fill" style={{ color: "#22c55e" }}></i>
              Government Verified
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <i className="bi bi-clock-fill" style={{ color: "#22c55e" }}></i>
              24/7 Available
            </div>
          </div>
        </div>

        {/* Right Section (Certificate Preview) */}
        <div
          style={{
            background: "rgba(255,255,255,0.85)",
            borderRadius: "20px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
            padding: "30px",
            backdropFilter: "blur(8px)",
            position: "relative",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <div
              style={{
                backgroundColor: "#2563eb",
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "10px",
              }}
            >
              <i className="bi bi-award-fill text-white fs-3"></i>
            </div>
            <h3 style={{ fontWeight: "700", marginBottom: "5px" }}>
              BIRTH CERTIFICATE
            </h3>
            <p style={{ color: "#64748b", fontSize: "0.9rem" }}>
              Official Government Document
            </p>
          </div>

          {/* Certificate Details */}
          <div style={{ marginBottom: "20px" }}>
            {[
              ["Certificate No:", "BC-2025-001234"],
              ["Child Name:", "Ajay Kumar"],
              ["Date of Birth:", "March 15, 2025"],
            ].map(([label, value]) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "6px 0",
                  color: "#334155",
                  fontSize: "0.9rem",
                }}
              >
                <span style={{ color: "#94a3b8" }}>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 0",
              }}
            >
              <span style={{ color: "#94a3b8" }}>Status:</span>
              <span
                style={{
                  backgroundColor: "#dcfce7",
                  color: "#16a34a",
                  fontWeight: "600",
                  borderRadius: "20px",
                  padding: "6px 12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <i className="bi bi-check-circle-fill"></i> Verified
              </span>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              borderTop: "1px solid #e2e8f0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: "10px",
            }}
          >
            <div
              style={{
                backgroundColor: "#eff6ff",
                borderRadius: "10px",
                padding: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "56px",
                height: "56px",
              }}
            >
              <i className="bi bi-qr-code fs-4 text-primary"></i>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ color: "#94a3b8", margin: 0, fontSize: "0.8rem" }}>
                Issued on
              </p>
              <p style={{ fontWeight: "600", color: "#334155", margin: 0 }}>
                July 12, 2025
              </p>
            </div>
          </div>

          {/* Floating Icons */}
          <div
            style={{
              position: "absolute",
              top: "0",
              right: "0",
              transform: "translate(50%, -50%)",
              backgroundColor: "#22c55e",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
            }}
          >
            <i className="bi bi-check-lg"></i>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "0",
              left: "0",
              transform: "translate(-50%, 50%)",
              backgroundColor: "#2563eb",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
            }}
          >
            <i className="bi bi-download"></i>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
