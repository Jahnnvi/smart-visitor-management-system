import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

const SecurityLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [guardId, setGuardId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  if (!guardId.trim()) {
    setError("Guard ID is required");
    return;
  }

  if (!password.trim()) {
    setError("Password is required");
    return;
  }

  try {
    const res = await fetch(
      "http://localhost:9000/api/auth/guard-login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ guardId, password }),
      }
    );

    const data = await res.json();

    if (data.success) {
      login({ role: "guard", guardId }); // optional: store role
      navigate("/security/dashboard");
    } else {
      setError(data.message || "Invalid credentials");
    }
  } catch (err) {
    setError("Server error");
  }
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
        <h1 style={titleStyle}>Security Login</h1>
        <p style={subtitleStyle}>Authorized personnel only</p>
        <form style={formStyle} onSubmit={handleSubmit}>
          <div style={inputWrapperStyle}>
            <label style={labelStyle} htmlFor="guardId">
              Guard ID
            </label>
            <input
              id="guardId"
              type="text"
              placeholder="Enter your Guard ID"
              value={guardId}
              onChange={(e) => setGuardId(e.target.value)}
              style={inputStyle}
              autoComplete="username"
            />
          </div>
          <div style={inputWrapperStyle}>
            <label style={labelStyle} htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              autoComplete="current-password"
            />
          </div>
          {error && <span style={errorStyle}>{error}</span>}
          <button type="submit" style={buttonStyle}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default SecurityLogin;
