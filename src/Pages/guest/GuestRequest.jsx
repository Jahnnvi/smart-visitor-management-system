import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import GuestSidebar from "../../components/GuestSidebar";
import "./GuestRequest.css";

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

  function handleSubmit(e) {
    e.preventDefault();
    setShowNotice(false);

    if (!guestForm.guestEmail) {
      setShowNotice(true);
      return;
    }

    if (loginType === "faculty") {
      if (!facultyId.trim() || !facultyName.trim()) {
        setShowNotice(true);
        return;
      }
    }

    const newReq = {
      guestName: guestForm.guestName || "—",
      guestEmail: guestForm.guestEmail,
      visitDate: guestForm.visitDate || "—",
      status: "Pending Admin Approval",
      id: Date.now(),
    };

    if (loginType === "faculty") {
      newReq.invitedByRole = "faculty";
      newReq.facultyId = facultyId;
      newReq.facultyName = facultyName;
      newReq.facultyDepartment = facultyDepartment;
    }

    setSubmitted((s) => [newReq, ...s]);
    setShowNotice(true);
    setGuestForm(initialGuestForm);
  }

  /* Styling moved to GuestRequest.css - visual-only changes */

  return (
    <div className="gr-page">
      <div className="gr-layout">
        <GuestSidebar />
        <div className="gr-main">
          <div className="gr-card">
            <div>
              <h2 className="gr-title">Enter Details</h2>
              <p className="gr-subtitle">Send request for admin approval</p>
            </div>

            <form onSubmit={handleSubmit} className="gr-formBox">
              {loginType === "faculty" && (
                <div className="gr-section">
                  <div className="gr-sectionTitle">Faculty Details</div>
                  <div className="gr-row">
                    <label className="gr-label">
                      Faculty Name
                      <input value={facultyName} onChange={handleFacultyNameChange} placeholder="Faculty Name" className="gr-input" />
                    </label>
                    <label className="gr-label">
                      Faculty Email
                      <input type="email" value={facultyEmail} onChange={handleFacultyEmailChange} placeholder="Faculty Email" className="gr-input" />
                    </label>
                  </div>
                  <div className="gr-row">
                    <label className="gr-label">
                      Faculty ID
                      <input value={facultyId} onChange={handleFacultyIdChange} placeholder="Faculty ID" className="gr-input" />
                    </label>
                    <label className="gr-label">
                      Department
                      <input value={facultyDepartment} onChange={handleFacultyDepartmentChange} placeholder="Department" className="gr-input" />
                    </label>
                  </div>
                </div>
              )}

              <div className="gr-section">
                <div className="gr-sectionTitle">Guest Details</div>
                <div className="gr-row">
                  <label className="gr-label">
                    Guest Name
                    <input name="guestName" value={guestForm.guestName} onChange={handleGuestChange} placeholder="Guest Name" className="gr-input" />
                  </label>
                  <label className="gr-label">
                    Guest Email
                    <input name="guestEmail" type="email" value={guestForm.guestEmail} onChange={handleGuestChange} placeholder="Guest Email (required)" className="gr-input" required />
                  </label>
                </div>
                <div className="gr-row">
                  <label className="gr-label">
                    Phone
                    <input name="guestPhone" value={guestForm.guestPhone} onChange={handleGuestChange} placeholder="Guest Phone Number" className="gr-input" />
                  </label>
                  <label className="gr-label">
                    Visit Date
                    <input name="visitDate" type="date" value={guestForm.visitDate} onChange={handleGuestChange} className="gr-input" />
                  </label>
                </div>
                <label className="gr-label">
                  Purpose of Visit
                  <textarea name="purpose" value={guestForm.purpose} onChange={handleGuestChange} placeholder="Purpose of Visit" className="gr-textarea" />
                </label>
                <button type="submit" className="gr-submit">Send Request</button>
              </div>
            </form>

            <div>
              {showNotice && submitted.length === 0 && (
                <div className="gr-confirmCard">
                  <strong>Notice:</strong>
                  <div style={{ marginTop: 8 }}>
                    {loginType === "faculty"
                      ? "Please provide Faculty ID, Faculty Name, and Guest Email to submit a request."
                      : "Please provide a Guest Email to submit a request."}
                  </div>
                </div>
              )}

              {submitted.map((s) => (
                <div key={s.id} className="gr-confirmCard">
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ fontWeight: 700 }}>{s.guestName}</div>
                    <div style={{ color: "#4CD1D6", fontWeight: 700 }}>{s.status}</div>
                  </div>
                  <div style={{ marginTop: 8 }}>
                    {s.invitedByRole === "faculty" && (
                      <>
                        <div><strong>Faculty:</strong> {s.facultyName}</div>
                        <div><strong>Faculty ID:</strong> {s.facultyId}</div>
                        <div><strong>Department:</strong> {s.facultyDepartment || "—"}</div>
                      </>
                    )}
                    <div><strong>Email:</strong> {s.guestEmail}</div>
                    <div><strong>Visit Date:</strong> {s.visitDate}</div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
