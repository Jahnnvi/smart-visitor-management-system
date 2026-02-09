import React from "react";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();

  const actions = [
    {
      id: "requests",
      title: "Pending Visit Requests",
      icon: "📋",
      description: "Review and approve visitor pre-registration requests.",
      path: "/admin/requests",
    },
    // {
    //   id: "assign",
    //   title: "Assign Attendee / Host",
    //   icon: "👤",
    //   description: "Assign hosts or attendees to approved guest visits.",
    //   path: "/admin/assign",
    // },
    {
      id: "logs",
      title: "Visitor Logs",
      icon: "📊",
      description: "View today's and past visitor check-in records.",
      path: "/admin/logs",
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
    letterSpacing: "-0.02em",
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
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    border: "1px solid #E5E4E3",
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

  const handleOpen = (path) => {
    navigate(path);
  };

  return (
    <div style={pageStyle}>
      <h1 style={headingStyle}>Admin Dashboard</h1>
      <p style={subtitleStyle}>Manage visitor requests and campus access</p>
      <div style={cardsWrapperStyle}>
        {actions.map((action) => (
          <div key={action.id} style={cardStyle}>
            <span style={iconStyle}>{action.icon}</span>
            <h2 style={cardTitleStyle}>{action.title}</h2>
            <p style={cardDescStyle}>{action.description}</p>
            <button
              style={buttonStyle}
              onClick={() => handleOpen(action.path)}
            >
              Open
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
