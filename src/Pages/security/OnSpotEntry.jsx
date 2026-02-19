import React, { useState } from "react";
import SecuritySidebar from "../../components/SecuritySidebar";

export default function OnSpotEntry() {
  const PALETTE = {
    background: "#FAFCFC",
    cardDark: "#222121",
    textDark: "#2A2A2A",
    accent: "#4CD1D6",
    border: "#E5E4E3",
  };

  const [visitorName, setVisitorName] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("Campus Visitor");
  const [studentName, setStudentName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [reason, setReason] = useState("");
  const [errors, setErrors] = useState({});
  const [confirmation, setConfirmation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  function validate() {
    const e = {};
    if (!visitorName.trim()) e.visitorName = "Visitor name is required";
    if (!phone.trim()) e.phone = "Phone number is required";
    if (!reason.trim()) e.reason = "Reason for visit is required";
    if (type === "Parent") {
      if (!studentName.trim()) e.studentName = "Student name required for parents";
      if (!studentId.trim()) e.studentId = "Student ID required for parents";
    }
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const eObj = validate();
    setErrors(eObj);
    setApiError("");
    if (Object.keys(eObj).length > 0) {
      setConfirmation(null);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/visitors/walkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          visitorName,
          phone,
          type,
          studentName: type === "Parent" ? studentName : undefined,
          studentId: type === "Parent" ? studentId : undefined,
          reason,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to register entry");
      }

      // Show success confirmation
      setConfirmation({
        visitorName: data.data.visitor.guestName,
        phone: data.data.visitor.guestPhone,
        visitorType: "On-the-Spot",
        reason: data.data.visitor.purpose,
        entryStatus: "Checked In",
        entryTime: new Date(data.data.log.checkInTime).toLocaleString(),
      });

      // Clear form
      setVisitorName("");
      setPhone("");
      setType("Campus Visitor");
      setStudentName("");
      setStudentId("");
      setReason("");
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  }

  /* ---------- LAYOUT (same as before) ---------- */

  const pageStyle = {
    minHeight: "100vh",
    background:
      "linear-gradient(180deg, rgba(7,18,41,1) 0%, rgba(5,12,28,1) 100%)",
    display: "flex",
    justifyContent: "center",
    padding: 28,
    fontFamily:
      "Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial",
  };

  const layoutStyle = {
    display: "flex",
    gap: 22,
    width: "100%",
    maxWidth: 1100,
  };

  const mainStyle = {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const card = {
    width: 840,
    maxWidth: "100%",
    display: "flex",
    borderRadius: 10,
    overflow: "hidden",
    boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
    background: PALETTE.cardDark,
    color: "#fff",
    border: `1px solid ${PALETTE.border}`,
  };

  const left = { flex: 1, padding: 28, borderRight: `1px solid ${PALETTE.border}` };
  const right = { width: 340, padding: 24 };

  const title = { margin: 0, fontSize: 26, color: PALETTE.accent };
  const subtitle = { marginTop: 6, color: "#ddd", marginBottom: 18 };

  const label = { display: "block", color: "#ddd", fontSize: 13, marginBottom: 6 };
  const input = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 6,
    border: `1px solid ${PALETTE.border}`,
    marginBottom: 12,
    background: "#fff",
    color: PALETTE.textDark,
    fontSize: 14,
  };

  const select = { ...input, appearance: "none" };
  const textarea = { ...input, minHeight: 90, resize: "vertical" };

  const btn = {
    background: PALETTE.accent,
    color: "#222",
    border: "none",
    padding: "10px 14px",
    borderRadius: 8,
    fontWeight: 700,
    cursor: "pointer",
    opacity: loading ? 0.7 : 1,
  };

  const errorStyle = {
    color: "#ffdddd",
    background: "#3a1515",
    padding: 8,
    borderRadius: 6,
    marginBottom: 8,
  };

  return (
    <div style={pageStyle}>
      <div style={layoutStyle}>
        <SecuritySidebar />

        <div style={mainStyle}>
          <div style={card}>
            <div style={left}>
              <h1 style={title}>On-the-Spot Entry</h1>
              <div style={subtitle}>
                Register visitors arriving without pre-registration
              </div>

              <form onSubmit={handleSubmit}>
                <label style={label}>Visitor Name</label>
                <input
                  style={input}
                  value={visitorName}
                  onChange={(e) => setVisitorName(e.target.value)}
                />
                {errors.visitorName && <div style={errorStyle}>{errors.visitorName}</div>}

                <label style={label}>Phone Number</label>
                <input
                  style={input}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {errors.phone && <div style={errorStyle}>{errors.phone}</div>}

                <label style={label}>Visitor Type</label>
                <select
                  style={select}
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option>Parent</option>
                  <option>Campus Visitor</option>
                </select>

                {type === "Parent" && (
                  <>
                    <label style={label}>Student Name</label>
                    <input
                      style={input}
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                    />
                    {errors.studentName && <div style={errorStyle}>{errors.studentName}</div>}

                    <label style={label}>Student ID</label>
                    <input
                      style={input}
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                    />
                    {errors.studentId && <div style={errorStyle}>{errors.studentId}</div>}
                  </>
                )}

                <label style={label}>Reason for Visit</label>
                <textarea
                  style={textarea}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
                {errors.reason && <div style={errorStyle}>{errors.reason}</div>}

                {apiError && <div style={errorStyle}>{apiError}</div>}

                <button type="submit" style={btn} disabled={loading}>
                  {loading ? "Registering..." : "Allow Entry"}
                </button>
              </form>

              {confirmation && (
                <div style={{ marginTop: 18, background: "#fff", color: PALETTE.textDark, padding: 16, borderRadius: 8 }}>
                  <strong>Entry Confirmed</strong>
                  <div style={{ marginTop: 6 }}>
                    <div>Visitor: {confirmation.visitorName}</div>
                    <div>Phone: {confirmation.phone}</div>
                    <div>Reason: {confirmation.reason}</div>
                    <div>Time: {confirmation.entryTime}</div>
                  </div>
                  <div style={{ fontWeight: 700, color: PALETTE.accent, marginTop: 8 }}>
                    {confirmation.entryStatus}
                  </div>
                </div>
              )}
            </div>

            <div style={right}>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#fff", marginBottom: 12 }}>
                Gate Helper
              </div>
              <div style={{ color: "#ccc", fontSize: 13, lineHeight: 1.5 }}>
                - Use this form to register visitors who arrive without pre-registration.
                <br />- Parents must provide student details.
                <br />- After submission, the visitor appears in Today's Gate Log with check‑in time.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}