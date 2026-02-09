import React from "react";

const GuestStatus = () => {
  // Mock requests for the logged-in guest
  const requests = [
    {
      id: "REQ-101",
      guestName: "John Doe",
      purpose: "Campus tour and admissions meeting",
      visitingDate: "2025-02-15",
      assignedAttendee: "Dr. Jane Smith",
      status: "Approved",
    },
    {
      id: "REQ-102",
      guestName: "John Doe",
      purpose: "Guest lecture discussion",
      visitingDate: "2025-02-20",
      assignedAttendee: null,
      status: "Pending",
    },
    {
      id: "REQ-103",
      guestName: "John Doe",
      purpose: "Vendor meeting",
      visitingDate: "2025-02-10",
      assignedAttendee: null,
      status: "Denied",
    },
  ];

  /* ---------- STYLES ---------- */

  const pageStyle = {
    minHeight: "100vh",
    backgroundColor: "#FAFCFC",
    padding: "40px 24px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const headerStyle = {
    maxWidth: "900px",
    margin: "0 auto 32px",
  };

  const titleStyle = {
    fontSize: "2rem",
    fontWeight: 600,
    color: "#2A2A2A",
    marginBottom: 6,
  };

  const subtitleStyle = {
    fontSize: "1rem",
    color: "#2A2A2A",
    opacity: 0.8,
  };

  const listStyle = {
    maxWidth: "900px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  };

  const cardStyle = {
    backgroundColor: "#222121",
    borderRadius: "12px",
    padding: "24px",
    border: "1px solid #E5E4E3",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  };

  const rowStyle = {
    display: "flex",
    justifyContent: "space-between",
    padding: "6px 0",
    fontSize: "0.95rem",
    color: "#FAFCFC",
  };

  const labelStyle = {
    opacity: 0.75,
  };

  const statusBadgeBase = {
    display: "inline-block",
    padding: "6px 14px",
    borderRadius: "6px",
    fontSize: "0.9rem",
    fontWeight: 600,
  };

  const statusStyles = {
    Approved: {
      ...statusBadgeBase,
      backgroundColor: "#4CD1D6",
      color: "#222121",
    },
    Pending: {
      ...statusBadgeBase,
      backgroundColor: "#E5E4E3",
      color: "#2A2A2A",
    },
    Denied: {
      ...statusBadgeBase,
      backgroundColor: "#111111",
      color: "#FAFCFC",
      opacity: 0.8,
    },
  };

  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>My Requests</h1>
        <p style={subtitleStyle}>
          Track the status of all visit requests you have submitted
        </p>
      </div>

      <div style={listStyle}>
        {requests.map((req) => (
          <div key={req.id} style={cardStyle}>
            <div style={rowStyle}>
              <span style={labelStyle}>Request ID</span>
              <span>{req.id}</span>
            </div>

            <div style={rowStyle}>
              <span style={labelStyle}>Purpose</span>
              <span style={{ maxWidth: "55%", textAlign: "right" }}>
                {req.purpose}
              </span>
            </div>

            <div style={rowStyle}>
              <span style={labelStyle}>Visiting Date</span>
              <span>{req.visitingDate}</span>
            </div>

            {req.assignedAttendee && (
              <div style={rowStyle}>
                <span style={labelStyle}>Attendee</span>
                <span>{req.assignedAttendee}</span>
              </div>
            )}

            <div style={{ ...rowStyle, marginTop: 8 }}>
              <span style={labelStyle}>Status</span>
              <span style={statusStyles[req.status]}>{req.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuestStatus;