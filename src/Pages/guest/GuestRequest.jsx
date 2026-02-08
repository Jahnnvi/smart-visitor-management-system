import React, { useState } from "react";

const GuestRequest = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    organization: "",
    purpose: "",
    visitingDate: "",
    expectedTime: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const { fullName, phone, organization, purpose, visitingDate, expectedTime } = formData;
    if (!fullName.trim() || !phone.trim() || !organization.trim() || !purpose.trim() || !visitingDate || !expectedTime) {
      setError("All fields are required");
      return;
    }

    const requestData = {
      fullName: fullName.trim(),
      phone: phone.trim(),
      organization: organization.trim(),
      purpose: purpose.trim(),
      visitingDate,
      expectedTime,
    };

    console.log(requestData);
    alert("Request submitted successfully");
  };

  const pageStyle = {
    minHeight: "100vh",
    backgroundColor: "#FAFCFC",
    display: "flex",
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

  const textareaStyle = {
    ...inputStyle,
    minHeight: "80px",
    resize: "vertical",
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

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Visitor Pre-Registration</h1>
        <p style={subtitleStyle}>Submit your visit request for approval</p>
        <form style={formStyle} onSubmit={handleSubmit}>
          <div style={inputWrapperStyle}>
            <label style={labelStyle} htmlFor="fullName">
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div style={inputWrapperStyle}>
            <label style={labelStyle} htmlFor="phone">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div style={inputWrapperStyle}>
            <label style={labelStyle} htmlFor="organization">
              Organization / Institution
            </label>
            <input
              id="organization"
              name="organization"
              type="text"
              placeholder="Enter your organization"
              value={formData.organization}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div style={inputWrapperStyle}>
            <label style={labelStyle} htmlFor="purpose">
              Purpose of Visit
            </label>
            <textarea
              id="purpose"
              name="purpose"
              placeholder="Describe the purpose of your visit"
              value={formData.purpose}
              onChange={handleChange}
              style={textareaStyle}
            />
          </div>
          <div style={inputWrapperStyle}>
            <label style={labelStyle} htmlFor="visitingDate">
              Visiting Date
            </label>
            <input
              id="visitingDate"
              name="visitingDate"
              type="date"
              value={formData.visitingDate}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div style={inputWrapperStyle}>
            <label style={labelStyle} htmlFor="expectedTime">
              Expected Time
            </label>
            <input
              id="expectedTime"
              name="expectedTime"
              type="time"
              value={formData.expectedTime}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          {error && <span style={errorStyle}>{error}</span>}
          <button type="submit" style={buttonStyle}>
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default GuestRequest;
