import React, { useState } from "react";

const GuestStatus = () => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const getMockStatus = (phoneNum) => {
    const lastDigit = phoneNum.trim().slice(-1);
    if (lastDigit === "2" || lastDigit === "5" || lastDigit === "8") return "Approved";
    if (lastDigit === "3" || lastDigit === "6" || lastDigit === "9") return "Denied";
    return "Pending";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setResult(null);
    if (!phone.trim()) {
      setError("Phone number is required");
      return;
    }
    const status = getMockStatus(phone);
    setResult({
      guestName: "John Doe",
      phone: phone.trim(),
      purpose: "Campus tour and admissions meeting",
      visitingDate: "2025-02-15",
      assignedAttendee: status === "Approved" ? "Dr. Jane Smith" : null,
      status,
    });
  };

  const pageStyle = {
    minHeight: "100vh",
    backgroundColor: "#FAFCFC",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const cardStyle = {
    backgroundColor: "#222121",
    borderRadius: "12px",
    padding: "40px",
    width: "100%",
    maxWidth: "480px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    border: "1px solid #E5E4E3",
  };

  const titleStyle = {
    fontSize: "1.75rem",
    fontWeight: 600,
    color: "#FAFCFC",
    marginBottom: "8px",
    letterSpacing: "-0.02em",
  };

  const subtitleStyle = {
    fontSize: "0.95rem",
    color: "#FAFCFC",
    opacity: 0.85,
    marginBottom: "32px",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  };

  const inputWrapperStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  };

  const labelStyle = {
    fontSize: "0.9rem",
    fontWeight: 500,
    color: "#FAFCFC",
    opacity: 0.9,
  };

  const inputStyle = {
    padding: "12px 16px",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "1px solid #E5E4E3",
    backgroundColor: "#FAFCFC",
    color: "#2A2A2A",
    outline: "none",
  };

  const buttonStyle = {
    backgroundColor: "#4CD1D6",
    color: "#222121",
    border: "none",
    padding: "14px 24px",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: 600,
    cursor: "pointer",
    marginTop: "8px",
  };

  const errorStyle = {
    fontSize: "0.85rem",
    color: "#E57373",
  };

  const statusCardStyle = {
    marginTop: "32px",
    padding: "24px",
    backgroundColor: "#FAFCFC",
    borderRadius: "8px",
    border: "1px solid #E5E4E3",
  };

  const rowStyle = {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 0",
    borderBottom: "1px solid #E5E4E3",
    fontSize: "0.95rem",
  };

  const rowLastStyle = {
    ...rowStyle,
    borderBottom: "none",
  };

  const labelDarkStyle = {
    color: "#2A2A2A",
    fontWeight: 500,
  };

  const valueDarkStyle = {
    color: "#2A2A2A",
    opacity: 0.9,
    textAlign: "right",
  };

  const statusBadgeBase = {
    display: "inline-block",
    padding: "6px 14px",
    borderRadius: "6px",
    fontSize: "0.9rem",
    fontWeight: 600,
  };

  const statusBadgePending = {
    ...statusBadgeBase,
    backgroundColor: "#E5E4E3",
    color: "#2A2A2A",
  };

  const statusBadgeApproved = {
    ...statusBadgeBase,
    backgroundColor: "#4CD1D6",
    color: "#222121",
  };

  const statusBadgeDenied = {
    ...statusBadgeBase,
    backgroundColor: "#222121",
    color: "#FAFCFC",
    opacity: 0.7,
  };

  const getStatusBadgeStyle = (status) => {
    if (status === "Approved") return statusBadgeApproved;
    if (status === "Denied") return statusBadgeDenied;
    return statusBadgePending;
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Request Status</h1>
        <p style={subtitleStyle}>Check the status of your visit request</p>
        <form style={formStyle} onSubmit={handleSubmit}>
          <div style={inputWrapperStyle}>
            <label style={labelStyle} htmlFor="phone">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={inputStyle}
              autoComplete="tel"
            />
            {error && <span style={errorStyle}>{error}</span>}
          </div>
          <button type="submit" style={buttonStyle}>
            Check Status
          </button>
        </form>
        {result && (
          <div style={statusCardStyle}>
            <div style={rowStyle}>
              <span style={labelDarkStyle}>Guest Name</span>
              <span style={valueDarkStyle}>{result.guestName}</span>
            </div>
            <div style={rowStyle}>
              <span style={labelDarkStyle}>Phone Number</span>
              <span style={valueDarkStyle}>{result.phone}</span>
            </div>
            <div style={rowStyle}>
              <span style={labelDarkStyle}>Purpose of Visit</span>
              <span style={{ ...valueDarkStyle, maxWidth: "55%" }}>{result.purpose}</span>
            </div>
            <div style={rowStyle}>
              <span style={labelDarkStyle}>Visiting Date</span>
              <span style={valueDarkStyle}>{result.visitingDate}</span>
            </div>
            {result.assignedAttendee && (
              <div style={rowStyle}>
                <span style={labelDarkStyle}>Assigned Attendee</span>
                <span style={valueDarkStyle}>{result.assignedAttendee}</span>
              </div>
            )}
            <div style={rowLastStyle}>
              <span style={labelDarkStyle}>Current Status</span>
              <span style={getStatusBadgeStyle(result.status)}>{result.status}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuestStatus;
