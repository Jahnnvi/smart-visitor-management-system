import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import GuestSidebar from "../../components/GuestSidebar";

const vars = {
  bg: "#071229",
  cardBg: "#ffffff",
  panelBg: "#071022",
  muted: "#9aa6b2",
  accent: "#06b6d4",
  text: "#0b1220",
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, rgba(7,18,41,1) 0%, rgba(5,12,28,1) 100%)",
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
    background: vars.cardBg,
    borderRadius: 12,
    padding: 22,
    boxShadow: "0 22px 60px rgba(2,6,23,0.6)",
    border: "1px solid rgba(255,255,255,0.04)",
  },
  title: {
    color: vars.accent,
    margin: "0 0 4px 0",
    fontSize: 20,
    fontWeight: 700,
  },
  subtitle: {
    margin: 0,
    color: vars.muted,
    fontSize: 13,
  },
  section: {
    marginBottom: 18,
    padding: 14,
    borderRadius: 10,
    background:
      "linear-gradient(180deg, rgba(245,249,251,0.9), rgba(250,251,252,0.86))",
    border: "1px solid rgba(2,6,23,0.06)",
  },
  sectionTitle: {
    color: vars.text,
    fontWeight: 700,
    marginBottom: 10,
    fontSize: 14,
  },
  row: {
    display: "flex",
    gap: 12,
    marginBottom: 12,
    alignItems: "center",
  },
  label: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    flex: 1,
    fontSize: 13,
    color: vars.muted,
  },
  input: {
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid rgba(15,23,42,0.06)",
    fontSize: 14,
    color: vars.text,
    background: "#fff",
  },
  textarea: {
    width: "100%",
    minHeight: 110,
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid rgba(15,23,42,0.06)",
    fontSize: 14,
    color: vars.text,
    resize: "vertical",
    background: "#fff",
  },
  submit: {
    marginTop: 14,
    background: vars.accent,
    color: "#fff",
    padding: "11px 18px",
    borderRadius: 12,
    border: "none",
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 16px 40px rgba(6,182,212,0.14)",
  },
  confirm: {
    marginTop: 14,
    background: "#fff",
    color: vars.text,
    border: "1px solid rgba(15,23,42,0.04)",
    padding: 14,
    borderRadius: 10,
    boxShadow: "0 12px 30px rgba(2,6,23,0.06)",
  },
};

export default function GuestRequest() {
  const location = useLocation();
  const loginType = location.state?.loginRole || "guest";

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

  function handleGuestChange(e) {
    const { name, value } = e.target;
    setGuestForm((p) => ({ ...p, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setShowNotice(false);

    if (!guestForm.guestEmail) {
      setShowNotice(true);
      return;
    }

    if (loginType === "faculty" && (!facultyId.trim() || !facultyName.trim())) {
      setShowNotice(true);
      return;
    }

    const newReq = {
      guestName: guestForm.guestName || "—",
      guestEmail: guestForm.guestEmail,
      visitDate: guestForm.visitDate || "—",
      status: "Pending Admin Approval",
      id: Date.now(),
      facultyName,
      facultyId,
      facultyDepartment,
      invitedByRole: loginType === "faculty" ? "faculty" : undefined,
    };

    setSubmitted((s) => [newReq, ...s]);
    setShowNotice(true);
    setGuestForm(initialGuestForm);
  }

  return (
    <div style={styles.page}>
      <div style={styles.layout}>
        <GuestSidebar />
        <div style={styles.main}>
          <div style={styles.card}>
            <h2 style={styles.title}>Enter Details</h2>
            <p style={styles.subtitle}>Send request for admin approval</p>

            <form onSubmit={handleSubmit}>
              {loginType === "faculty" && (
                <div style={styles.section}>
                  <div style={styles.sectionTitle}>Faculty Details</div>
                  <div style={styles.row}>
                    <label style={styles.label}>
                      Faculty Name
                      <input style={styles.input} value={facultyName} onChange={(e) => setFacultyName(e.target.value)} />
                    </label>
                    <label style={styles.label}>
                      Faculty Email
                      <input style={styles.input} type="email" value={facultyEmail} onChange={(e) => setFacultyEmail(e.target.value)} />
                    </label>
                  </div>
                  <div style={styles.row}>
                    <label style={styles.label}>
                      Faculty ID
                      <input style={styles.input} value={facultyId} onChange={(e) => setFacultyId(e.target.value)} />
                    </label>
                    <label style={styles.label}>
                      Department
                      <input style={styles.input} value={facultyDepartment} onChange={(e) => setFacultyDepartment(e.target.value)} />
                    </label>
                  </div>
                </div>
              )}

              <div style={styles.section}>
                <div style={styles.sectionTitle}>Guest Details</div>
                <div style={styles.row}>
                  <label style={styles.label}>
                    Guest Name
                    <input name="guestName" style={styles.input} value={guestForm.guestName} onChange={handleGuestChange} />
                  </label>
                  <label style={styles.label}>
                    Guest Email
                    <input name="guestEmail" type="email" required style={styles.input} value={guestForm.guestEmail} onChange={handleGuestChange} />
                  </label>
                </div>
                <div style={styles.row}>
                  <label style={styles.label}>
                    Phone
                    <input name="guestPhone" style={styles.input} value={guestForm.guestPhone} onChange={handleGuestChange} />
                  </label>
                  <label style={styles.label}>
                    Visit Date
                    <input name="visitDate" type="date" style={styles.input} value={guestForm.visitDate} onChange={handleGuestChange} />
                  </label>
                </div>
                <label style={styles.label}>
                  Purpose of Visit
                  <textarea name="purpose" style={styles.textarea} value={guestForm.purpose} onChange={handleGuestChange} />
                </label>
                <button style={styles.submit}>Send Request</button>
              </div>
            </form>

            {showNotice && submitted.length === 0 && (
              <div style={styles.confirm}>
                <strong>Notice:</strong>
                <div style={{ marginTop: 8 }}>
                  {loginType === "faculty"
                    ? "Please provide Faculty ID, Faculty Name, and Guest Email."
                    : "Please provide a Guest Email."}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
