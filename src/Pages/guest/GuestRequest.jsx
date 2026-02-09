import React, { useState } from "react";


export default function GuestRequest() {
  const initialForm = {
    facultyName: "",
    facultyEmail: "",
    facultyId: "",
    department: "",
    guestName: "",
    guestEmail: "",
    guestPhone: "",
    purpose: "",
    visitDate: "",
  };

  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState([]);
  const [showNotice, setShowNotice] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setShowNotice(false);

    // Basic required field: guestEmail
    if (!form.guestEmail) {
      setShowNotice(true);
      return;
    }

    const newReq = {
      guestName: form.guestName || "—",
      guestEmail: form.guestEmail,
      visitDate: form.visitDate || "—",
      status: "Pending Admin Approval",
      id: Date.now(),
    };

    setSubmitted((s) => [newReq, ...s]);
    setShowNotice(true);
    setForm(initialForm);
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
  const submit = { marginTop: "12px", background: colors.accent, color: colors.card, padding: "10px 14px", borderRadius: "6px", border: "none", fontWeight: 600, cursor: "pointer", alignSelf: "flex-start" };
  const confirmCard = { marginTop: "14px", background: "#FFFFFF", color: colors.textDark, border: `1px solid ${colors.border}`, padding: "12px", borderRadius: "8px" };

  return (
    <div style={page}>
      <div style={card}>
        <div>
          <h2 style={title}>Invite Guest</h2>
          <p style={subtitle}>Send request for admin approval</p>
        </div>

        <form onSubmit={handleSubmit} style={formBox}>
          <div style={section}>
            <div style={sectionTitle}>Faculty Details</div>
            <div style={row}>
              <input name="facultyName" value={form.facultyName} onChange={handleChange} placeholder="Faculty Name" style={input} />
              <input name="facultyEmail" type="email" value={form.facultyEmail} onChange={handleChange} placeholder="Faculty Email" style={input} />
            </div>
            <div style={row}>
              <input name="facultyId" value={form.facultyId} onChange={handleChange} placeholder="Faculty ID" style={input} />
              <input name="department" value={form.department} onChange={handleChange} placeholder="Department" style={input} />
            </div>
          </div>

          <div style={section}>
            <div style={sectionTitle}>Guest Details</div>
            <div style={row}>
              <input name="guestName" value={form.guestName} onChange={handleChange} placeholder="Guest Name" style={input} />
              <input name="guestEmail" type="email" value={form.guestEmail} onChange={handleChange} placeholder="Guest Email (required)" style={input} required />
            </div>
            <div style={row}>
              <input name="guestPhone" value={form.guestPhone} onChange={handleChange} placeholder="Guest Phone Number" style={input} />
              <input name="visitDate" type="date" value={form.visitDate} onChange={handleChange} style={input} />
            </div>
            <div>
              <textarea name="purpose" value={form.purpose} onChange={handleChange} placeholder="Purpose of Visit" style={textarea} />
            </div>

            <button type="submit" style={submit}>Send Request</button>
          </div>
        </form>

        <div>
          {showNotice && submitted.length === 0 && (
            <div style={confirmCard}>
              <strong>Notice:</strong>
              <div style={{ marginTop: 8 }}>Please provide a Guest Email to submit a request.</div>
            </div>
          )}

          {submitted.map((s) => (
            <div key={s.id} style={confirmCard}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontWeight: 700 }}>{s.guestName}</div>
                <div style={{ color: colors.accent, fontWeight: 700 }}>{s.status}</div>
              </div>
              <div style={{ marginTop: 8 }}>
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
