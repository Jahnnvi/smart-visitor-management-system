import React, { useState } from "react";
import { useLocation } from "react-router-dom";


export default function GuestRequest() {
  const location = useLocation();
  const loginRole = location.state?.loginRole || "guest";
  const loginType = loginRole; // backward compatibility

  const initialGuestForm = {
    guestName: "",
    guestEmail: "",
    guestPhone: location.state?.guestMobile || "",
    purpose: "",
    visitDate: "",
  };

  const [guestForm, setGuestForm] = useState(initialGuestForm);
  const [facultyId, setFacultyId] = useState(location.state?.facultyId || "");
  const [facultyName, setFacultyName] = useState(location.state?.facultyName || "");
  const [facultyEmail, setFacultyEmail] = useState("");
  const [facultyDepartment, setFacultyDepartment] = useState("");
  const [submitted, setSubmitted] = useState([]);
  const [showNotice, setShowNotice] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  function handleGuestChange(e) {
    const { name, value } = e.target;
    setGuestForm((p) => ({ ...p, [name]: value }));
  }

  function handleFacultyIdChange(e) {
    setFacultyId(e.target.value);
  }

  function handleFacultyNameChange(e) {
    setFacultyName(e.target.value);
  }

  function handleFacultyEmailChange(e) {
    setFacultyEmail(e.target.value);
  }

  function handleFacultyDepartmentChange(e) {
    setFacultyDepartment(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setShowNotice(false);
    setMessage({ type: "", text: "" });

    // Validate guest email (always required)
    if (!guestForm.guestEmail) {
      setShowNotice(true);
      return;
    }

    // Validate faculty fields if faculty login
    if (loginType === "faculty") {
      if (!facultyId.trim() || !facultyName.trim()) {
        setShowNotice(true);
        return;
      }
    }

    try {
      setLoading(true);

      // Prepare data for API
   const apiData = {
  createdByRole: loginType,

  facultyName: loginType === "faculty" ? facultyName : undefined,
  facultyEmail: loginType === "faculty" ? facultyEmail : undefined,
  facultyId: loginType === "faculty" ? facultyId : undefined,
  department: loginType === "faculty" ? facultyDepartment : undefined,

  guestName: guestForm.guestName,
  guestEmail: guestForm.guestEmail,
  guestPhone: guestForm.guestPhone,
  organization: "",
  purpose: guestForm.purpose,
  visitDate: guestForm.visitDate,
};

      // Send POST request to backend
      const response = await fetch("http://localhost:8000/api/visitors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit request");
      }

      // Show success message
      setMessage({ type: "success", text: "Request submitted successfully!" });

      // Update UI with new request
      const newReq = {
        guestName: guestForm.guestName || "—",
        guestEmail: guestForm.guestEmail,
        visitDate: guestForm.visitDate || "—",
        status: "Pending Admin Approval",
        id: Date.now(),
      };

      // Include faculty data if faculty login
      if (loginType === "faculty") {
        newReq.invitedByRole = "faculty";
        newReq.facultyId = facultyId;
        newReq.facultyName = facultyName;
        newReq.facultyDepartment = facultyDepartment;
      }

      setSubmitted((s) => [newReq, ...s]);
      setShowNotice(true);
      setGuestForm(initialGuestForm);
    } catch (error) {
      setMessage({ type: "error", text: `Error: ${error.message}` });
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  }

  // Palette
  const colors = {
    bg: "#FAFCFC",
    card: "#222121",
    textDark: "#2A2A2A",
    accent: "#4CD1D6",
    border: "#E5E4E3",
  };

  const page = {
    minHeight: "100vh",
    background: colors.bg,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const card = {
    width: "720px",
    maxWidth: "95%",
    background: colors.card,
    color: colors.bg,
    borderRadius: "10px",
    border: `1px solid ${colors.border}`,
    padding: "18px",
    display: "flex",
    flexDirection: "column",
  };

  const title = { color: colors.accent, margin: 0, fontSize: "22px" };
  const subtitle = { color: colors.bg, margin: 0, fontSize: "13px", opacity: 0.95 };

  const formBox = {
    marginTop: "12px",
    background: colors.bg,
    color: colors.textDark,
    padding: "14px",
    borderRadius: "8px",
    maxHeight: "420px",
    overflowY: "auto",
    border: `1px solid ${colors.border}`,
  };

  const section = { marginBottom: "12px" };
  const sectionTitle = { color: colors.textDark, fontWeight: 600, marginBottom: "8px" };
  const row = { display: "flex", gap: "10px", marginBottom: "10px" };
  const input = { flex: 1, padding: "8px 10px", borderRadius: "6px", border: `1px solid ${colors.border}`, fontSize: "14px" };
  const textarea = { width: "100%", minHeight: "80px", padding: "8px 10px", borderRadius: "6px", border: `1px solid ${colors.border}`, fontSize: "14px" };
  const submit = { marginTop: "12px", background: colors.accent, color: colors.card, padding: "10px 14px", borderRadius: "6px", border: "none", fontWeight: 600, cursor: "pointer", alignSelf: "flex-start", opacity: loading ? 0.6 : 1, pointerEvents: loading ? "none" : "auto" };
  const confirmCard = { marginTop: "14px", background: "#FFFFFF", color: colors.textDark, border: `1px solid ${colors.border}`, padding: "12px", borderRadius: "8px" };
  const messageCard = { marginTop: "14px", padding: "12px", borderRadius: "8px", border: `1px solid ${colors.border}`, fontWeight: 600 };
  const successCard = { ...messageCard, background: "#E8F5E9", color: "#2E7D32", borderColor: "#4CAF50" };
  const errorCard = { ...messageCard, background: "#FFEBEE", color: "#C62828", borderColor: "#F44336" };

  return (
    <div style={page}>
      <div style={card}>
        <div>
          <h2 style={title}>Enter Details</h2>
          <p style={subtitle}>Send request for admin approval</p>
        </div>

        <form onSubmit={handleSubmit} style={formBox}>
          {loginType === "faculty" && (
            <div style={section}>
              <div style={sectionTitle}>Faculty Details</div>
              <div style={row}>
                <input 
                  value={facultyName} 
                  onChange={handleFacultyNameChange} 
                  placeholder="Faculty Name" 
                  style={input} 
                />
                <input 
                  type="email" 
                  value={facultyEmail} 
                  onChange={handleFacultyEmailChange} 
                  placeholder="Faculty Email" 
                  style={input} 
                />
              </div>
              <div style={row}>
                <input 
                  value={facultyId} 
                  onChange={handleFacultyIdChange} 
                  placeholder="Faculty ID" 
                  style={input} 
                />
                <input 
                  value={facultyDepartment} 
                  onChange={handleFacultyDepartmentChange} 
                  placeholder="Department" 
                  style={input} 
                />
              </div>
            </div>
          )}

          <div style={section}>
            <div style={sectionTitle}>Guest Details</div>
            <div style={row}>
              <input 
                name="guestName" 
                value={guestForm.guestName} 
                onChange={handleGuestChange} 
                placeholder="Guest Name" 
                style={input} 
              />
              <input 
                name="guestEmail" 
                type="email" 
                value={guestForm.guestEmail} 
                onChange={handleGuestChange} 
                placeholder="Guest Email (required)" 
                style={input} 
                required 
              />
            </div>
            <div style={row}>
              <input 
                name="guestPhone" 
                value={guestForm.guestPhone} 
                onChange={handleGuestChange} 
                placeholder="Guest Phone Number" 
                style={input} 
              />
              <input 
                name="visitDate" 
                type="date" 
                value={guestForm.visitDate} 
                onChange={handleGuestChange} 
                style={input} 
              />
            </div>
            <div>
              <textarea 
                name="purpose" 
                value={guestForm.purpose} 
                onChange={handleGuestChange} 
                placeholder="Purpose of Visit" 
                style={textarea} 
              />
            </div>

            <button type="submit" style={submit} disabled={loading}>
              {loading ? "Submitting..." : "Send Request"}
            </button>
          </div>
        </form>

        <div>
          {message.text && (
            <div style={message.type === "success" ? successCard : errorCard}>
              {message.text}
            </div>
          )}

          {showNotice && submitted.length === 0 && (
            <div style={confirmCard}>
              <strong>Notice:</strong>
              <div style={{ marginTop: 8 }}>
                {loginType === "faculty"
                  ? "Please provide Faculty ID, Faculty Name, and Guest Email to submit a request."
                  : "Please provide a Guest Email to submit a request."}
              </div>
            </div>
          )}

          {submitted.map((s) => (
            <div key={s.id} style={confirmCard}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontWeight: 700 }}>{s.guestName}</div>
                <div style={{ color: colors.accent, fontWeight: 700 }}>{s.status}</div>
              </div>
              <div style={{ marginTop: 8 }}>
                {s.invitedByRole === "faculty" && (
                  <>
                    <div><strong style={{ color: colors.textDark }}>Faculty:</strong> {s.facultyName}</div>
                    <div><strong style={{ color: colors.textDark }}>Faculty ID:</strong> {s.facultyId}</div>
                    <div><strong style={{ color: colors.textDark }}>Department:</strong> {s.facultyDepartment || "—"}</div>
                  </>
                )}
                <div><strong style={{ color: colors.textDark }}>Email:</strong> {s.guestEmail}</div>
                <div><strong style={{ color: colors.textDark }}>Visit Date:</strong> {s.visitDate}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}