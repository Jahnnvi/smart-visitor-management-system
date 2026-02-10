import React from "react";
import { useNavigate } from "react-router-dom";

const MainLogin = () => {
  const navigate = useNavigate();

  const roles = [
    {
      id: "admin",
      title: "Admin",
      icon: "⚙️",
      description: "Manage visitors, settings, and system configuration.",
      path: "/admin/login",
      animation: "slideInLeft",
    },
    {
      id: "guest",
      title: "Guest",
      icon: "👤",
      description: "Register as a visitor and check in to the campus.",
      path: "/guest/login",
      animation: "slideInUp",
    },
    {
      id: "security",
      title: "Security Guard",
      icon: "🛡️",
      description: "Verify visitors, monitor check-ins, and manage access.",
      path: "/security/login",
      animation: "slideInRight",
    },
  ];

  const pageStyle = {
    minHeight: "100vh",
    backgroundColor: "#FAFCFC",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 24px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const headingStyle = {
    fontSize: "2.25rem",
    fontWeight: 600,
    color: "#2A2A2A",
    marginBottom: "8px",
  };

  const subtitleStyle = {
    fontSize: "1rem",
    color: "#2A2A2A",
    opacity: 0.8,
    marginBottom: "48px",
  };

  const cardsWrapperStyle = {
    display: "flex",
    gap: "32px",
    flexWrap: "wrap",
    justifyContent: "center",
    maxWidth: "960px",
  };

  const cardStyle = {
    backgroundColor: "#222121",
    borderRadius: "12px",
    padding: "32px",
    width: "280px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.12)",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    border: "1px solid #E5E4E3",
    animationDuration: "0.9s",
    animationTimingFunction: "ease-out",
    animationFillMode: "both",
  };

  const iconStyle = {
    fontSize: "2.5rem",
    marginBottom: "16px",
  };

  const cardTitleStyle = {
    fontSize: "1.25rem",
    fontWeight: 600,
    color: "#FAFCFC",
    marginBottom: "12px",
  };

  const cardDescStyle = {
    fontSize: "0.9rem",
    color: "#FAFCFC",
    opacity: 0.85,
    lineHeight: 1.5,
    marginBottom: "24px",
    flex: 1,
  };

  const buttonStyle = {
    backgroundColor: "#4CD1D6",
    color: "#222121",
    border: "none",
    padding: "12px 24px",
    borderRadius: "8px",
    fontSize: "0.95rem",
    fontWeight: 600,
    cursor: "pointer",
  };

  return (
    <>
      {/* ANIMATIONS */}
      <style>{`
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-80px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(80px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(80px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={pageStyle}>
        <h1 style={headingStyle}>Visitor Management System</h1>
        <p style={subtitleStyle}>Select your role to continue</p>

        <div style={cardsWrapperStyle}>
          {roles.map((role, index) => (
            <div
              key={role.id}
              style={{
                ...cardStyle,
                animationName: role.animation,
                animationDelay: `${index * 0.15}s`,
              }}
            >
              <span style={iconStyle}>{role.icon}</span>
              <h2 style={cardTitleStyle}>{role.title}</h2>
              <p style={cardDescStyle}>{role.description}</p>
              <button
                style={buttonStyle}
                onClick={() => navigate(role.path)}
              >
                Continue
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MainLogin;