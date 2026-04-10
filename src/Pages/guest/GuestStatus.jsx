import React, { useEffect, useState } from "react";
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
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
  const fetchRequests = async () => {
    setLoading(true);
    setError(null);

    try {
      const facultyId = localStorage.getItem("facultyId");
      const guestEmail = localStorage.getItem("guestEmail");
const role = localStorage.getItem("loginRole");
      let url = "";

      // if (role === "faculty") {
      //   url = `http://localhost:9000/api/visitors/faculty/${facultyId}`;
      // } else if (role === "guest" && guestEmail) {
      //   url = `http://localhost:9000/api/visitors/guest/${guestEmail}`;
      // } else {
      //   setError("Login required");
      //   setLoading(false);
      //   return;
      // }
      // // ✅ now safe to log
      // console.log("Role:", role);
      // console.log("FacultyId:", facultyId);
      // console.log("GuestEmail:", guestEmail);
      // console.log("URL:", url);
      // const res = await fetch(url);
      // if (!res.ok) throw new Error("Failed to fetch data");

      const token = localStorage.getItem("token");

if (role === "faculty") {
  url = `http://localhost:9000/api/visitors/faculty/${facultyId}`;
} else if (role === "guest") {
  url = `http://localhost:9000/api/visitors/guest/me`; // ✅ FIXED
} else {
  setError("Login required");
  setLoading(false);
  return;
}

const res = await fetch(url, {
  headers: {
    Authorization: `Bearer ${token}`, // ✅ REQUIRED
  },
});
if (!res.ok) {
  throw new Error("Failed to fetch data");
}

      const result = await res.json();
      console.log("API RESPONSE:", result);
      setRequests(result.data || []);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchRequests();
}, []);
  // Badge color logic (do not break existing UI)
  const getBadgeStyle = (status) => {
    const s = (status || "").toLowerCase();
    if (s === "approved") {
      return { ...styles.badgeApproved, background: "#22c55e", color: "#fff" };
    }
    if (s === "pending") {
      return { ...styles.badgePending, background: "#f59e42", color: "#fff" };
    }
    if (s === "rejected") {
      return { ...styles.badgeDenied, background: "#ef4444", color: "#fff" };
    }
    // fallback to original
    return styles.badgePending;
  };

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
            {loading ? (
              <div style={{ color: vars.muted, textAlign: "center", padding: 40 }}>
                Loading...
              </div>
            ) : error ? (
              <div style={{ color: "#ef4444", textAlign: "center", padding: 40 }}>
                {error}
              </div>
            ) : requests.length === 0 ? (
              <div style={{ color: vars.muted, textAlign: "center", padding: 40 }}>
                No visit requests found.
              </div>
            ) : (
              requests.map((req) => (
                <div key={req._id || req.id} style={styles.card}>
                  <div style={styles.row}>
                    <span style={styles.label}>Request ID</span>
                    <span>{req._id || req.id}</span>
                  </div>
                  <div style={styles.row}>
                    <span style={styles.label}>Purpose</span>
                    <span style={styles.purpose}>{req.purpose}</span>
                  </div>
                  <div style={styles.row}>
                    <span style={styles.label}>Visiting Date</span>
                    <span>{new Date(req.visitDate).toLocaleDateString()}</span>
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
                      {req.status ? req.status.charAt(0).toUpperCase() + req.status.slice(1) : ""}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestStatus;
