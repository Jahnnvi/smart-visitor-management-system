import React, { useState, useMemo } from "react";
import VisitorStatsModal from "../../components/VisitorStatsModal";

const MOCK_TODAY = "2025-02-15";

const mockLogs = [
  {
    id: 1,
    guestName: "John Doe",
    phone: "9876543210",
    visitorType: "Pre-Registered",
    purpose: "Campus tour and admissions meeting",
    assignedHost: "Dr. Jane Smith",
    visitDate: "2025-02-15",
    checkInTime: "09:15",
    checkOutTime: "11:30",
    status: "Out",
  },
  {
    id: 2,
    guestName: "Jane Smith",
    phone: "9123456789",
    visitorType: "On-the-Spot",
    purpose: "Vendor meeting",
    assignedHost: "Prof. David Lee",
    visitDate: "2025-02-15",
    checkInTime: "10:00",
    checkOutTime: "-",
    status: "In",
  },
  {
    id: 3,
    guestName: "Robert Wilson",
    phone: "9988776655",
    visitorType: "Pre-Registered",
    purpose: "Guest lecture",
    assignedHost: "Ms. Sarah Johnson",
    visitDate: "2025-02-14",
    checkInTime: "14:00",
    checkOutTime: "16:00",
    status: "Out",
  },
  {
    id: 4,
    guestName: "Alice Brown",
    phone: "9554433221",
    visitorType: "Pre-Registered",
    purpose: "Interview",
    assignedHost: "-",
    visitDate: "2025-02-14",
    checkInTime: "-",
    checkOutTime: "-",
    status: "Denied",
  },
  {
    id: 5,
    guestName: "Charlie Davis",
    phone: "9332211000",
    visitorType: "On-the-Spot",
    purpose: "Delivery",
    assignedHost: "Dr. Michael Brown",
    visitDate: "2025-02-15",
    checkInTime: "08:45",
    checkOutTime: "09:00",
    status: "Out",
  },
];

const VisitorLogs = () => {
  const [dateFilter, setDateFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);

  const filteredLogs = useMemo(() => {
    if (dateFilter === "Today") {
      return mockLogs.filter((log) => log.visitDate === MOCK_TODAY);
    }
    return mockLogs;
  }, [dateFilter]);

  const pageStyle = {
    minHeight: "100vh",
    backgroundColor: "#FAFCFC",
    padding: "40px 24px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const headerStyle = {
    maxWidth: "1200px",
    margin: "0 auto 24px",
  };

  const topRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "16px",
    marginBottom: "24px",
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

  const controlsStyle = {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    flexWrap: "wrap",
  };

  const statsButtonStyle = {
    backgroundColor: "#4CD1D6",
    color: "#222121",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    fontSize: "0.95rem",
    fontWeight: 600,
    cursor: "pointer",
  };

  const filterButtonStyle = (active) => ({
    padding: "8px 16px",
    borderRadius: "8px",
    border: `2px solid ${active ? "#4CD1D6" : "#E5E4E3"}`,
    backgroundColor: active ? "#4CD1D6" : "#FAFCFC",
    color: active ? "#222121" : "#2A2A2A",
    fontSize: "0.9rem",
    fontWeight: 600,
    cursor: "pointer",
  });

  const containerStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
  };

  const cardStyle = {
    backgroundColor: "#222121",
    borderRadius: "12px",
    padding: "24px",
    overflowX: "auto",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    border: "1px solid #E5E4E3",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "0.9rem",
  };

  const thStyle = {
    textAlign: "left",
    padding: "12px 16px",
    color: "#FAFCFC",
    fontWeight: 600,
    borderBottom: "2px solid #E5E4E3",
  };

  const tdStyle = {
    padding: "12px 16px",
    color: "#FAFCFC",
    opacity: 0.95,
    borderBottom: "1px solid #E5E4E3",
  };

  const statusBadgeBase = {
    display: "inline-block",
    padding: "4px 10px",
    borderRadius: "6px",
    fontSize: "0.8rem",
    fontWeight: 600,
  };

  const statusBadgeIn = {
    ...statusBadgeBase,
    backgroundColor: "#4CD1D6",
    color: "#222121",
  };

  const statusBadgeOut = {
    ...statusBadgeBase,
    backgroundColor: "#E5E4E3",
    color: "#2A2A2A",
  };

  const statusBadgeDenied = {
    ...statusBadgeBase,
    backgroundColor: "#2A2A2A",
    color: "#FAFCFC",
    opacity: 0.85,
  };

  const getStatusBadgeStyle = (status) => {
    if (status === "In") return statusBadgeIn;
    if (status === "Denied") return statusBadgeDenied;
    return statusBadgeOut;
  };

  const typeBadgePre = {
    ...statusBadgeBase,
    backgroundColor: "#4CD1D6",
    color: "#222121",
  };

  const typeBadgeSpot = {
    ...statusBadgeBase,
    backgroundColor: "#E5E4E3",
    color: "#2A2A2A",
  };

  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Visitor Logs</h1>
        <p style={subtitleStyle}>View and track visitor activity</p>
      </div>
      <div style={containerStyle}>
        <div style={topRowStyle}>
          <div style={controlsStyle}>
            <button
              style={statsButtonStyle}
              onClick={() => setShowModal(true)}
            >
              See Statistics
            </button>
            <button
              style={filterButtonStyle(dateFilter === "Today")}
              onClick={() => setDateFilter("Today")}
            >
              Today
            </button>
            <button
              style={filterButtonStyle(dateFilter === "All")}
              onClick={() => setDateFilter("All")}
            >
              All
            </button>
          </div>
        </div>
        <div style={cardStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Guest Name</th>
                <th style={thStyle}>Phone</th>
                <th style={thStyle}>Visitor Type</th>
                <th style={thStyle}>Purpose</th>
                <th style={thStyle}>Assigned Host</th>
                <th style={thStyle}>Visit Date</th>
                <th style={thStyle}>Check-In</th>
                <th style={thStyle}>Check-Out</th>
                <th style={thStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id}>
                  <td style={tdStyle}>{log.guestName}</td>
                  <td style={tdStyle}>{log.phone}</td>
                  <td style={tdStyle}>
                    <span
                      style={
                        log.visitorType === "Pre-Registered"
                          ? typeBadgePre
                          : typeBadgeSpot
                      }
                    >
                      {log.visitorType}
                    </span>
                  </td>
                  <td style={tdStyle}>{log.purpose}</td>
                  <td style={tdStyle}>{log.assignedHost}</td>
                  <td style={tdStyle}>{log.visitDate}</td>
                  <td style={tdStyle}>{log.checkInTime}</td>
                  <td style={tdStyle}>{log.checkOutTime}</td>
                  <td style={tdStyle}>
                    <span style={getStatusBadgeStyle(log.status)}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <VisitorStatsModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        visitorLogs={mockLogs}
      />
    </div>
  );
};

export default VisitorLogs;
