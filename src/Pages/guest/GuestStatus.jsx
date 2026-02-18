import React from "react";
import GuestSidebar from "../../components/GuestSidebar";

const vars = {
  bgStart: "#071229",
  bgEnd: "#050c1c",
  cardBg: "#0f1723",
  muted: "#9aa6b2",
  accent: "#06b6d4",
  textLight: "#f8fafc",
  borderSoft: "rgba(255,255,255,0.04)",
};

const styles = {
  page: {
    minHeight: "100vh",
    background: `linear-gradient(180deg, ${vars.bgStart}, ${vars.bgEnd})`,
    padding: "40px 20px",
    color: vars.textLight,
    fontFamily:
      "Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial",
  },
  layout: {
    display: "flex",
    gap: 20,
    alignItems: "flex-start",
    width: "100%",
    maxWidth: 1100,
    margin: "0 auto",
  },
  main: { flex: 1 },
  header: {
    maxWidth: 900,
    margin: "0 auto 28px",
  },
  title: {
    fontSize: 28,
    margin: "0 0 6px 0",
    fontWeight: 700,
    color: vars.textLight,
  },
  subtitle: {
    margin: 0,
    color: vars.muted,
    fontSize: 14,
  },
  list: {
    maxWidth: 900,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },
  card: {
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
    borderRadius: 12,
    padding: 18,
    border: `1px solid ${vars.borderSoft}`,
    boxShadow: "0 10px 30px rgba(2,6,23,0.6)",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 0",
    fontSize: "0.95rem",
    color: vars.textLight,
  },
  rowSpaced: {
    marginTop: 8,
  },
  label: {
    opacity: 0.8,
    color: vars.muted,
  },
  purpose: {
    maxWidth: "55%",
    textAlign: "right",
  },
  badge: {
    display: "inline-block",
    padding: "6px 14px",
    borderRadius: 8,
    fontWeight: 700,
  },
  badgeApproved: {
    background: vars.accent,
    color: "#081018",
  },
  badgePending: {
    background: "#e6e7e8",
    color: "#0b1220",
  },
  badgeDenied: {
    background: "#111213",
    color: vars.textLight,
    opacity: 0.9,
  },
};

const GuestStatus = () => {
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

  const getBadgeStyle = (status) =>
    status === "Approved"
      ? styles.badgeApproved
      : status === "Denied"
      ? styles.badgeDenied
      : styles.badgePending;

  return (
    <div style={styles.page}>
      <div style={styles.layout}>
        <GuestSidebar />

        <div style={styles.main}>
          <div style={styles.header}>
            <h1 style={styles.title}>My Requests</h1>
            <p style={styles.subtitle}>
              Track the status of all visit requests you have submitted
            </p>
          </div>

          <div style={styles.list}>
            {requests.map((req) => (
              <div key={req.id} style={styles.card}>
                <div style={styles.row}>
                  <span style={styles.label}>Request ID</span>
                  <span>{req.id}</span>
                </div>

                <div style={styles.row}>
                  <span style={styles.label}>Purpose</span>
                  <span style={styles.purpose}>{req.purpose}</span>
                </div>

                <div style={styles.row}>
                  <span style={styles.label}>Visiting Date</span>
                  <span>{req.visitingDate}</span>
                </div>

                {req.assignedAttendee && (
                  <div style={styles.row}>
                    <span style={styles.label}>Attendee</span>
                    <span>{req.assignedAttendee}</span>
                  </div>
                )}

                <div style={{ ...styles.row, ...styles.rowSpaced }}>
                  <span style={styles.label}>Status</span>
                  <span
                    style={{
                      ...styles.badge,
                      ...getBadgeStyle(req.status),
                    }}
                  >
                    {req.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestStatus;
