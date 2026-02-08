import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GuestLogin = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!phone.trim()) {
      setError("Phone number is required");
      return;
    }
    navigate("/guest");
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
    maxWidth: "420px",
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

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Guest Login</h1>
        <p style={subtitleStyle}>Verify your identity to continue</p>
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
            Verify & Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default GuestLogin;
