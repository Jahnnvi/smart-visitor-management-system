import React, { useState } from "react";

const initialRequests = [
  {
    id: 1,
    guestName: "John Doe",
    phone: "9876543210",
    organization: "ABC University",
    purpose: "Campus tour and admissions meeting",
    visitDate: "2025-02-15",
    status: "Pending",
  },
  {
    id: 2,
    guestName: "Jane Smith",
    phone: "9123456789",
    organization: "XYZ Corp",
    purpose: "Vendor meeting with IT department",
    visitDate: "2025-02-16",
    status: "Pending",
  },
  {
    id: 3,
    guestName: "Robert Wilson",
    phone: "9988776655",
    organization: "Tech Solutions Ltd",
    purpose: "Guest lecture for Computer Science",
    visitDate: "2025-02-17",
    status: "Pending",
  },
];

const PendingRequest = () => {
  const [requests, setRequests] = useState(initialRequests);

  const handleApprove = (id) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: "Approved" } : req))
    );
  };

  const handleDeny = (id) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: "Denied" } : req))
    );
  };

  const pageStyle = {
    minHeight: "100vh",
    backgroundColor: "#FAFCFC",
    padding: "40px 24px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const headerStyle = {
    maxWidth: "960px",
    margin: "0 auto 32px",
  };

  const titleStyle = {
    fontSize: "1.75rem",
    fontWeight: 600,
    color: "#2A2A2A",
    marginBottom: "8px",
    letterSpacing: "-0.02em",
  };

  const subtitleStyle = {
    fontSize: "0.95rem",
    color: "#2A2A2A",
    opacity: 0.8,
  };

  const containerStyle = {
    maxWidth: "960px",
    margin: "0 auto",
  };

  const cardStyle = {
    backgroundColor: "#222121",
    borderRadius: "12px",
    padding: "24px",
    marginBottom: "16px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    border: "1px solid #E5E4E3",
  };

  const rowStyle = {
    display: "flex",
    gap: "24px",
    flexWrap: "wrap",
    marginBottom: "12px",
  };

  const fieldStyle = {
    flex: "1 1 200px",
  };

  const labelStyle = {
    fontSize: "0.75rem",
    color: "#FAFCFC",
    opacity: 0.7,
    marginBottom: "4px",
  };

  const valueStyle = {
    fontSize: "0.95rem",
    color: "#FAFCFC",
    fontWeight: 500,
  };

  const actionsStyle = {
    display: "flex",
    gap: "12px",
    marginTop: "16px",
    flexWrap: "wrap",
  };

  const approveButtonStyle = {
    backgroundColor: "#4CD1D6",
    color: "#222121",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    fontSize: "0.9rem",
    fontWeight: 600,
    cursor: "pointer",
  };

  const denyButtonStyle = {
    backgroundColor: "#FAFCFC",
    color: "#2A2A2A",
    border: "2px solid #E5E4E3",
    padding: "8px 18px",
    borderRadius: "8px",
    fontSize: "0.9rem",
    fontWeight: 600,
    cursor: "pointer",
  };

  const statusBadgeBase = {
    display: "inline-block",
    padding: "4px 12px",
    borderRadius: "6px",
    fontSize: "0.85rem",
    fontWeight: 600,
  };

  const statusBadgePending = {
    ...statusBadgeBase,
    backgroundColor: "#E5E4E3",
    color: "#2A2A2A",
  };

  const statusBadgeApproved = {
    ...statusBadgeBase,
    backgroundColor: "#4CD1D6",
    color: "#222121",
  };

  const statusBadgeDenied = {
    ...statusBadgeBase,
    backgroundColor: "#2A2A2A",
    color: "#FAFCFC",
    opacity: 0.8,
  };

  const getStatusBadgeStyle = (status) => {
    if (status === "Approved") return statusBadgeApproved;
    if (status === "Denied") return statusBadgeDenied;
    return statusBadgePending;
  };

  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Pending Visit Requests</h1>
        <p style={subtitleStyle}>Review and manage guest visit requests</p>
      </div>
      <div style={containerStyle}>
        {requests.map((req) => (
          <div key={req.id} style={cardStyle}>
            <div style={rowStyle}>
              <div style={fieldStyle}>
                <div style={labelStyle}>Guest Name</div>
                <div style={valueStyle}>{req.guestName}</div>
              </div>
              <div style={fieldStyle}>
                <div style={labelStyle}>Phone Number</div>
                <div style={valueStyle}>{req.phone}</div>
              </div>
              <div style={fieldStyle}>
                <div style={labelStyle}>Organization</div>
                <div style={valueStyle}>{req.organization}</div>
              </div>
            </div>
            <div style={rowStyle}>
              <div style={{ ...fieldStyle, flex: "1 1 100%" }}>
                <div style={labelStyle}>Purpose of Visit</div>
                <div style={valueStyle}>{req.purpose}</div>
              </div>
            </div>
            <div style={rowStyle}>
              <div style={fieldStyle}>
                <div style={labelStyle}>Visit Date</div>
                <div style={valueStyle}>{req.visitDate}</div>
              </div>
              <div style={fieldStyle}>
                <div style={labelStyle}>Current Status</div>
                <span style={getStatusBadgeStyle(req.status)}>{req.status}</span>
              </div>
            </div>
            {req.status === "Pending" && (
              <div style={actionsStyle}>
                <button
                  style={approveButtonStyle}
                  onClick={() => handleApprove(req.id)}
                >
                  Approve
                </button>
                <button
                  style={denyButtonStyle}
                  onClick={() => handleDeny(req.id)}
                >
                  Deny
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingRequest;
