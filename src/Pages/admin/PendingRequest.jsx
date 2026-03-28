import React, { useState, useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";
export default function PendingRequest() {


const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, rgba(7,18,41,1), rgba(5,12,28,1))",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 28,
    fontFamily:
      "Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial",
  },
  layout: {
    display: "flex",
    gap: 22,
    width: "100%",
    maxWidth: 1100,
  },
  main: { flex: 1 },
  card: {
    background: "#222121",
    borderRadius: 12,
    padding: 24,
    marginBottom: 20,
    border: "1px solid #E5E4E3",
    color: "#FAFCFC",
  },
  row: {
    display: "flex",
    gap: 24,
    flexWrap: "wrap",
    marginBottom: 12,
  },
  field: { flex: "1 1 220px" },
  label: { fontSize: 12, opacity: 0.7, marginBottom: 4 },
  value: { fontSize: 15, fontWeight: 500 },
};

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all visitors on mount
  useEffect(() => {
    async function fetchVisitors() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("http://localhost:9000/api/visitors");
        if (!res.ok) throw new Error("Failed to fetch visitors");
        const data = await res.json();
        // Filter only pending requests (status: "pending")
        const pending = (Array.isArray(data.data) ? data.data : []).filter(
          (v) => (v.status || "").toLowerCase() === "pending"
        );
        setRequests(pending);
      } catch (err) {
        setError(err.message || "Error fetching requests");
      } finally {
        setLoading(false);
      }
    }
    fetchVisitors();
  }, []);

  // Approve handler
  const handleApprove = async (visitorId) => {
    try {
      const res = await fetch(`http://localhost:9000/api/visitors/${visitorId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "approved" }),
      });
      if (!res.ok) throw new Error("Failed to approve request");
      setRequests((prev) => prev.filter((r) => r.visitorId !== visitorId));
    } catch (err) {
      alert("Error approving request: " + (err.message || "Unknown error"));
    }
  };

  // Reject handler
  const handleDeny = async (visitorId) => {
    try {
      const res = await fetch(`http://localhost:9000/api/visitors/${visitorId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "rejected" }),
      });
      if (!res.ok) throw new Error("Failed to reject request");
      setRequests((prev) => prev.filter((r) => r.visitorId !== visitorId));
    } catch (err) {
      alert("Error rejecting request: " + (err.message || "Unknown error"));
    }
  };

  const badgeBase = {
    padding: "4px 12px",
    borderRadius: 6,
    fontSize: 13,
    fontWeight: 600,
  };

  const getBadge = (s) =>
    s === "Approved"
      ? { ...badgeBase, background: "#4CD1D6", color: "#222121" }
      : s === "Denied"
      ? { ...badgeBase, background: "#2A2A2A", color: "#FAFCFC", opacity: 0.7 }
      : { ...badgeBase, background: "#E5E4E3", color: "#2A2A2A" };

  return (
    <div style={styles.page}>
      <div style={styles.layout}>
        {/* ✅ Admin Sidebar added correctly */}
        <AdminSidebar />

        <div style={styles.main}>
          <h1 style={{ fontSize: 28, color: "#FAFCFC" }}>
            Pending Visit Requests
          </h1>
          <p style={{ color: "#9aa6b2", marginBottom: 32 }}>
            Review and approve faculty-invited guest requests
          </p>

          {loading && <div style={{ color: '#FAFCFC', marginTop: 32 }}>Loading...</div>}
          {error && <div style={{ color: '#F44336', marginTop: 32 }}>{error}</div>}
          {!loading && !error && requests.length === 0 && (
            <div style={{ color: '#FAFCFC', marginTop: 32 }}>No pending requests.</div>
          )}
          {requests.map((req) => (
            <div key={req.visitorId || req.id} style={styles.card}>
              <div style={styles.row}>
                <Field label="Faculty Name" value={req.facultyName} />
                <Field label="Faculty ID" value={req.facultyId} />
                <Field label="Department" value={req.department} />
              </div>

              <div style={styles.row}>
                <Field label="Faculty Email" value={req.facultyEmail} />
                <Field label="Guest Email" value={req.guestEmail || req.email} />
              </div>

              <div style={styles.row}>
                <Field label="Guest Name" value={req.guestName || req.visitorName} />
                <Field label="Phone" value={req.guestPhone || req.phone} />
                <Field label="Organization" value={req.organization} />
              </div>

              <div style={styles.row}>
                <Field label="Purpose of Visit" value={req.purpose} full />
              </div>

              <div style={styles.row}>
                <Field label="Visit Date" value={req.visitDate} />
                <div style={styles.field}>
                  <div style={styles.label}>Status</div>
                  <span style={getBadge(req.status)}>{req.status}</span>
                </div>
              </div>

              {req.status && req.status.toLowerCase() === "pending" && (
                <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
                  <button
                    style={{
                      background: "#4CD1D6",
                      color: "#222121",
                      border: "none",
                      padding: "10px 20px",
                      borderRadius: 8,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                    onClick={() => handleApprove(req.visitorId)}
                  >
                    Approve
                  </button>
                  <button
                    style={{
                      background: "#FAFCFC",
                      color: "#2A2A2A",
                      border: "2px solid #E5E4E3",
                      padding: "8px 18px",
                      borderRadius: 8,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                    onClick={() => handleDeny(req.visitorId)}
                  >
                    Deny
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* UI-only helper */
function Field({ label, value, full }) {
  return (
    <div style={{ flex: full ? "1 1 100%" : "1 1 220px" }}>
      <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 4 }}>
        {label}
      </div>
      <div style={{ fontSize: 15, fontWeight: 500 }}>{value}</div>
    </div>
  );
}
