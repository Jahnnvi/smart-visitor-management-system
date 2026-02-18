import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

export default function GuestLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [activeTab, setActiveTab] = useState("guest");
  const [loginRole, setLoginRole] = useState("guest");
  const [mobile, setMobile] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [facultyId, setFacultyId] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const colors = {
    background: "#FAFCFC",
    card: "#222121",
    cardText: "#FAFCFC",
    darkText: "#2A2A2A",
    accent: "#4CD1D6",
    border: "#E5E4E3",
    errorColor: "#E57373",
  };

  const pageStyle = {
    minHeight: "100vh",
    backgroundColor: colors.background,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: 24,
  };

  const cardStyle = {
    width: "100%",
    maxWidth: 450,
    backgroundColor: colors.card,
    borderRadius: 16,
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
    border: `1px solid ${colors.border}`,
    overflow: "hidden",
  };

  const tabsContainerStyle = {
    display: "flex",
    borderBottom: `1px solid ${colors.border}`,
  };

  const tabStyle = (active) => ({
    flex: 1,
    padding: "16px 24px",
    textAlign: "center",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 15,
    background: active ? colors.accent : "transparent",
    color: active ? colors.darkText : colors.cardText,
    border: "none",
    transition: "all 0.3s ease",
  });

  const contentStyle = {
    padding: 40,
  };

  const titleStyle = {
    fontSize: 28,
    fontWeight: 700,
    color: colors.cardText,
    margin: "0 0 8px 0",
  };

  const subtitleStyle = {
    fontSize: 14,
    color: "rgba(250, 252, 252, 0.75)",
    margin: "0 0 32px 0",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  };

  const fieldGroupStyle = {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  };

  const labelStyle = {
    fontSize: 13,
    fontWeight: 600,
    color: colors.cardText,
  };

  const inputStyle = {
    padding: "12px 14px",
    fontSize: 14,
    borderRadius: 10,
    border: `1px solid ${colors.border}`,
    backgroundColor: "#FFFFFF",
    color: colors.darkText,
    outline: "none",
    fontWeight: 500,
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  };

  const buttonStyle = {
    backgroundColor: colors.accent,
    color: colors.darkText,
    border: "none",
    padding: "12px 24px",
    borderRadius: 10,
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    marginTop: 4,
    transition: "all 0.2s ease",
  };

  const buttonSecondaryStyle = {
    backgroundColor: "transparent",
    color: colors.cardText,
    border: `1.5px solid ${colors.border}`,
    padding: "12px 24px",
    borderRadius: 10,
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    marginTop: 4,
    transition: "all 0.2s ease",
  };

  const errorStyle = {
    color: colors.errorColor,
    fontSize: 13,
    marginTop: 4,
    fontWeight: 500,
  };

  const helperTextStyle = {
    color: "rgba(250, 252, 252, 0.65)",
    fontSize: 12,
    marginTop: 8,
    fontStyle: "italic",
  };

  const buttonGroupStyle = {
    display: "flex",
    gap: 10,
    marginTop: 8,
  };

  // Guest mode handlers
  function handleSendOtp(e) {
    e.preventDefault();
    setErrors({});
    if (!mobile.trim()) {
      setErrors({ mobile: "Mobile number is required" });
      return;
    }
    if (!/^\d{6,15}$/.test(mobile.trim())) {
      setErrors({ mobile: "Enter a valid mobile number" });
      return;
    }
    setOtpSent(true);
  }

  function handleVerifyOtp(e) {
    e.preventDefault();
    setErrors({});
    if (!otp.trim()) {
      setErrors({ otp: "OTP is required" });
      return;
    }
    if (!/^\d{6}$/.test(otp.trim())) {
      setErrors({ otp: "OTP must be 6 digits" });
      return;
    }
    login(); 
    navigate("/guest", { 
      state: { 
        loginRole: "guest",
        guestMobile: mobile 
      } 
    });
  }

  // Faculty mode handlers
  function handleFacultyLogin(e) {
    e.preventDefault();
    setErrors({});
    if (!facultyId.trim()) {
      setErrors({ facultyId: "Faculty ID is required" });
      return;
    }
    if (!password.trim()) {
      setErrors({ password: "Password is required" });
      return;
    }
    login();
    navigate("/guest", { 
      state: { 
        loginRole: "faculty",
        facultyId: facultyId 
      } 
    });
  }

  function switchTab(tab) {
    setActiveTab(tab);
    setLoginRole(tab);
    setErrors({});
    setOtpSent(false);
    setOtp("");
    setMobile("");
    setFacultyId("");
    setPassword("");
  }

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        {/* Tabs */}
        <div style={tabsContainerStyle}>
          <button
            style={tabStyle(activeTab === "guest")}
            onClick={() => switchTab("guest")}
          >
            Guest
          </button>
          <button
            style={tabStyle(activeTab === "faculty")}
            onClick={() => switchTab("faculty")}
          >
            Faculty
          </button>
        </div>

        {/* Guest Mode */}
        {activeTab === "guest" && (
          <div style={contentStyle}>
            <h1 style={titleStyle}>Guest Login</h1>
            <p style={subtitleStyle}>Verify your identity to continue</p>

            <form style={formStyle} onSubmit={(e) => e.preventDefault()}>
              {/* Mobile Number Field */}
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>Mobile Number</label>
                <input
                  style={inputStyle}
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="Enter your mobile number"
                  inputMode="numeric"
                />
                {errors.mobile && <div style={errorStyle}>{errors.mobile}</div>}
              </div>

              {/* OTP Field - shown after Send OTP clicked */}
              {otpSent && (
                <div style={fieldGroupStyle}>
                  <label style={labelStyle}>OTP</label>
                  <input
                    style={inputStyle}
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 6-digit OTP"
                    inputMode="numeric"
                  />
                  {errors.otp && <div style={errorStyle}>{errors.otp}</div>}
                </div>
              )}

              {/* Buttons */}
              {!otpSent ? (
                <div style={buttonGroupStyle}>
                  <button style={buttonStyle} onClick={handleSendOtp}>
                    Send OTP
                  </button>
                  <button
                    style={buttonSecondaryStyle}
                    onClick={(e) => {
                      e.preventDefault();
                      setMobile("");
                      setErrors({});
                    }}
                  >
                    Clear
                  </button>
                </div>
              ) : (
                <div style={buttonGroupStyle}>
                  <button style={buttonStyle} onClick={handleVerifyOtp}>
                    Verify & Continue
                  </button>
                  <button
                    style={buttonSecondaryStyle}
                    onClick={(e) => {
                      e.preventDefault();
                      setOtpSent(false);
                      setOtp("");
                      setErrors({});
                    }}
                  >
                    Back
                  </button>
                </div>
              )}

              <div style={helperTextStyle}>
                (Mock OTP: Enter any 6-digit number)
              </div>
            </form>
          </div>
        )}

        {/* Faculty Mode */}
        {activeTab === "faculty" && (
          <div style={contentStyle}>
            <h1 style={titleStyle}>Faculty Login</h1>
            <p style={subtitleStyle}>Login to invite a guest</p>

            <form style={formStyle} onSubmit={handleFacultyLogin}>
              {/* Faculty ID Field */}
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>Faculty ID</label>
                <input
                  style={inputStyle}
                  type="text"
                  value={facultyId}
                  onChange={(e) => setFacultyId(e.target.value)}
                  placeholder="e.g. 25MSP0987"
                />
                {errors.facultyId && (
                  <div style={errorStyle}>{errors.facultyId}</div>
                )}
              </div>

              {/* Password Field */}
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>Password</label>
                <input
                  style={inputStyle}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <div style={errorStyle}>{errors.password}</div>
                )}
              </div>

              {/* Buttons */}
              <div style={buttonGroupStyle}>
                <button style={buttonStyle} type="submit">
                  Login & Continue
                </button>
                <button
                  style={buttonSecondaryStyle}
                  onClick={(e) => {
                    e.preventDefault();
                    setFacultyId("");
                    setPassword("");
                    setErrors({});
                  }}
                >
                  Clear
                </button>
              </div>

              <div style={helperTextStyle}>
                (Mock login: Any non-empty values accepted)
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
