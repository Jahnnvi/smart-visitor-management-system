import React, { useState } from "react";

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
export default function PendingRequest() {
  const [requests, setRequests] = useState(initialRequests);

  const handleApprove = (id) => {
    const req = requests.find((r) => r.id === id);

    setRequests((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: "Approved" } : r
      )
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
      prev.map((r) =>
        r.id === id ? { ...r, status: "Denied" } : r
      )
    );
  };

  const page = {
    minHeight: "100vh",
    background: "#FAFCFC",
    padding: "40px 24px",
    fontFamily: "Segoe UI, sans-serif",
  };

  const card = {
    background: "#222121",
    borderRadius: 12,
    padding: 24,
    marginBottom: 20,
    border: "1px solid #E5E4E3",
    color: "#FAFCFC",
  };

  const row = {
    display: "flex",
    gap: 24,
    flexWrap: "wrap",
    marginBottom: 12,
  };

  const field = { flex: "1 1 220px" };

  const label = {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 4,
  };

  const value = {
    fontSize: 15,
    fontWeight: 500,
  };

  const badgeBase = {
    padding: "4px 12px",
    borderRadius: 6,
    fontSize: 13,
    fontWeight: 600,
  };

  const badgePending = {
    ...badgeBase,
    background: "#E5E4E3",
    color: "#2A2A2A",
  };

  const badgeApproved = {
    ...badgeBase,
    background: "#4CD1D6",
    color: "#222121",
  };

  const badgeDenied = {
    ...badgeBase,
    background: "#2A2A2A",
    color: "#FAFCFC",
    opacity: 0.7,
  };

  const getBadge = (s) =>
    s === "Approved"
      ? badgeApproved
      : s === "Denied"
      ? badgeDenied
      : badgePending;

  const btnApprove = {
    background: "#4CD1D6",
    color: "#222121",
    border: "none",
    padding: "10px 20px",
    borderRadius: 8,
    fontWeight: 600,
    cursor: "pointer",
  };

  const btnDeny = {
    background: "#FAFCFC",
    color: "#2A2A2A",
    border: "2px solid #E5E4E3",
    padding: "8px 18px",
    borderRadius: 8,
    fontWeight: 600,
    cursor: "pointer",
  };

  return (
    <div style={page}>
      <h1 style={{ fontSize: 28, color: "#2A2A2A" }}>
        Pending Visit Requests
      </h1>
      <p style={{ color: "#555", marginBottom: 32 }}>
        Review and approve faculty-invited guest requests
      </p>

      {requests.map((req) => (
        <div key={req.id} style={card}>
          {/* Faculty Details */}
          <div style={row}>
            <div style={field}>
              <div style={label}>Faculty Name</div>
              <div style={value}>{req.facultyName}</div>
            </div>
            <div style={field}>
              <div style={label}>Faculty ID</div>
              <div style={value}>{req.facultyId}</div>
            </div>
            <div style={field}>
              <div style={label}>Department</div>
              <div style={value}>{req.department}</div>
            </div>
          </div>

          <div style={row}>
            <div style={field}>
              <div style={label}>Faculty Email</div>
              <div style={value}>{req.facultyEmail}</div>
            </div>
            <div style={field}>
              <div style={label}>Guest Email</div>
              <div style={value}>{req.guestEmail}</div>
            </div>
          </div>

          {/* Guest Details */}
          <div style={row}>
            <div style={field}>
              <div style={label}>Guest Name</div>
              <div style={value}>{req.guestName}</div>
            </div>
            <div style={field}>
              <div style={label}>Phone</div>
              <div style={value}>{req.phone}</div>
            </div>
            <div style={field}>
              <div style={label}>Organization</div>
              <div style={value}>{req.organization}</div>
            </div>
          </div>

          <div style={row}>
            <div style={{ ...field, flex: "1 1 100%" }}>
              <div style={label}>Purpose of Visit</div>
              <div style={value}>{req.purpose}</div>
            </div>
          </div>

          <div style={row}>
            <div style={field}>
              <div style={label}>Visit Date</div>
              <div style={value}>{req.visitDate}</div>
            </div>
            <div style={field}>
              <div style={label}>Status</div>
              <span style={getBadge(req.status)}>{req.status}</span>
            </div>
          </div>

          {req.status === "Pending" && (
            <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
              <button style={btnApprove} onClick={() => handleApprove(req.id)}>
                Approve
              </button>
              <button style={btnDeny} onClick={() => handleDeny(req.id)}>
                Deny
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}