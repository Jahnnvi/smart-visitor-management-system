import React, { useState } from "react";

const mockFaculty = [
  { id: "f1", name: "Dr. Jane Smith" },
  { id: "f2", name: "Prof. David Lee" },
  { id: "f3", name: "Ms. Sarah Johnson" },
  { id: "f4", name: "Dr. Michael Brown" },
  { id: "f5", name: "Prof. Emily Davis" },
];

const initialApprovedRequests = [
  {
    id: 1,
    guestName: "John Doe",
    phone: "9876543210",
    purpose: "Campus tour and admissions meeting",
    visitDate: "2025-02-15",
    assignedHost: null,
    status: "Unassigned",
  },
  {
    id: 2,
    guestName: "Jane Smith",
    phone: "9123456789",
    purpose: "Vendor meeting with IT department",
    visitDate: "2025-02-16",
    assignedHost: null,
    status: "Unassigned",
  },
  {
    id: 3,
    guestName: "Robert Wilson",
    phone: "9988776655",
    purpose: "Guest lecture for Computer Science",
    visitDate: "2025-02-17",
    assignedHost: null,
    status: "Unassigned",
  },
];

const AssignAttendee = () => {
  const [requests, setRequests] = useState(initialApprovedRequests);
  const [selectedHosts, setSelectedHosts] = useState({});

  const handleHostChange = (requestId, hostId) => {
    setSelectedHosts((prev) => ({ ...prev, [requestId]: hostId }));
  };

  const handleAssign = (requestId) => {
    const hostId = selectedHosts[requestId];
    if (!hostId) return;
    const host = mockFaculty.find((f) => f.id === hostId);
    if (!host) return;
    setRequests((prev) =>
      prev.map((req) =>
        req.id === requestId
          ? { ...req, assignedHost: host.name, status: "Assigned" }
          : req
      )
    );
    setSelectedHosts((prev) => {
      const next = { ...prev };
      delete next[requestId];
      return next;
    });
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

  const actionsRowStyle = {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    marginTop: "16px",
    flexWrap: "wrap",
  };

  const selectStyle = {
    padding: "10px 16px",
    fontSize: "0.95rem",
    borderRadius: "8px",
    border: "1px solid #E5E4E3",
    backgroundColor: "#FAFCFC",
    color: "#2A2A2A",
    outline: "none",
    minWidth: "200px",
  };

  const buttonStyle = {
    backgroundColor: "#4CD1D6",
    color: "#222121",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    fontSize: "0.9rem",
    fontWeight: 600,
    cursor: "pointer",
  };

  const statusBadgeUnassigned = {
    display: "inline-block",
    padding: "4px 12px",
    borderRadius: "6px",
    fontSize: "0.85rem",
    fontWeight: 600,
    backgroundColor: "#E5E4E3",
    color: "#2A2A2A",
  };

  const statusBadgeAssigned = {
    display: "inline-block",
    padding: "4px 12px",
    borderRadius: "6px",
    fontSize: "0.85rem",
    fontWeight: 600,
    backgroundColor: "#4CD1D6",
    color: "#222121",
  };

  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Assign Attendee / Host</h1>
        <p style={subtitleStyle}>Assign a faculty or staff member to approved guests</p>
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
                <div style={labelStyle}>Visit Date</div>
                <div style={valueStyle}>{req.visitDate}</div>
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
                <div style={labelStyle}>Status</div>
                <span
                  style={
                    req.status === "Assigned"
                      ? statusBadgeAssigned
                      : statusBadgeUnassigned
                  }
                >
                  {req.status}
                </span>
              </div>
              {req.assignedHost && (
                <div style={fieldStyle}>
                  <div style={labelStyle}>Assigned Host</div>
                  <div style={valueStyle}>{req.assignedHost}</div>
                </div>
              )}
            </div>
            {req.status === "Unassigned" && (
              <div style={actionsRowStyle}>
                <select
                  value={selectedHosts[req.id] || ""}
                  onChange={(e) => handleHostChange(req.id, e.target.value)}
                  style={selectStyle}
                >
                  <option value="">Select Host</option>
                  {mockFaculty.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name}
                    </option>
                  ))}
                </select>
                <button
                  style={{
                    ...buttonStyle,
                    opacity: selectedHosts[req.id] ? 1 : 0.5,
                    cursor: selectedHosts[req.id] ? "pointer" : "not-allowed",
                  }}
                  onClick={() => handleAssign(req.id)}
                  disabled={!selectedHosts[req.id]}
                >
                  Assign Host
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignAttendee;
