import React, { useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";

const initialRequests = [
  {
    id: 1,
    guestName: "John Doe",
    guestEmail: "john.doe@gmail.com",
    phone: "9876543210",
    organization: "ABC University",
    purpose: "Campus tour and admissions meeting",
    visitDate: "2025-02-15",
    facultyName: "Dr. Ananya Rao",
    facultyEmail: "ananya.rao@college.edu",
    facultyId: "25MCA0129",
    department: "Computer Science",
    status: "Pending",
  },
  {
    id: 2,
    guestName: "Jane Smith",
    guestEmail: "jane.smith@gmail.com",
    phone: "9123456789",
    organization: "XYZ Corp",
    purpose: "Vendor meeting with IT department",
    visitDate: "2025-02-16",
    facultyName: "Prof. Rahul Mehta",
    facultyEmail: "rahul.mehta@college.edu",
    facultyId: "24IT0098",
    department: "Information Technology",
    status: "Pending",
  },
];

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

export default function PendingRequest() {
  const [requests, setRequests] = useState(initialRequests);

  const handleApprove = (id) => {
    const req = requests.find((r) => r.id === id);

    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Approved" } : r))
    );

    alert(
      `✅ REQUEST APPROVED

Guest Email Sent To:
${req.guestEmail}

Faculty Email Sent To:
${req.facultyEmail}

Visit Date:
${req.visitDate}`
    );
  };

  const handleDeny = (id) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Denied" } : r))
    );
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

          {requests.map((req) => (
            <div key={req.id} style={styles.card}>
              <div style={styles.row}>
                <Field label="Faculty Name" value={req.facultyName} />
                <Field label="Faculty ID" value={req.facultyId} />
                <Field label="Department" value={req.department} />
              </div>

              <div style={styles.row}>
                <Field label="Faculty Email" value={req.facultyEmail} />
                <Field label="Guest Email" value={req.guestEmail} />
              </div>

              <div style={styles.row}>
                <Field label="Guest Name" value={req.guestName} />
                <Field label="Phone" value={req.phone} />
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

              {req.status === "Pending" && (
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
                    onClick={() => handleApprove(req.id)}
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
