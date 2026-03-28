import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

export default function GuestLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [activeTab, setActiveTab] = useState("guest");
  const [loginRole, setLoginRole] = useState("guest");

  // 🔥 CHANGED: mobile → email
  const [email, setEmail] = useState("");

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
    width: "100%",
    padding: "10px 12px",
    borderRadius: 6,
    border: `1px solid ${colors.border}`,
    marginBottom: 14,
    outline: "none",
    fontSize: 14,
    background: "#fff",
    color: colors.darkText,
  };

  const buttonStyle = {
    background: colors.accent,
    border: "none",
    color: "#222",
    padding: "10px 14px",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 14,
  };

  const buttonSecondaryStyle = {
    background: "transparent",
    color: colors.cardText,
    border: `1.5px solid ${colors.border}`,
    padding: "10px 14px",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 14,
  };

  const errorStyle = {
    color: colors.errorColor,
    fontSize: 13,
    marginTop: 4,
  };

  const buttonGroupStyle = {
    display: "flex",
    gap: 10,
    marginTop: 8,
  };

  /* =========================
     GUEST (EMAIL OTP LOGIC)
     ========================= */

  async function handleSendOtp(e) {
    e.preventDefault();
    setErrors({});

    if (!email.trim()) {
      setErrors({ email: "Email is required" });
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setErrors({ email: "Enter a valid email" });
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:9000/api/auth/send-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (data.success) {
        setOtpSent(true);
      } else {
        setErrors({ email: data.message });
      }
    } catch {
      setErrors({ email: "Server error" });
    }
  }

  async function handleVerifyOtp(e) {
    e.preventDefault();
    setErrors({});

    if (!otp.trim()) {
      setErrors({ otp: "OTP is required" });
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:9000/api/auth/verify-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        }
      );

      const data = await res.json();

      if (data.success) {
      localStorage.setItem("loginRole", "guest");
      localStorage.setItem("guestEmail", email);
      
        login();

        navigate("/guest", {
          state: {
            loginRole: "guest",
            guestEmail: email,
          },
        });
      } else {
        setErrors({ otp: "Invalid OTP" });
      }
    } catch {
      setErrors({ otp: "Server error" });
    }
  }

  /* =========================
     FACULTY (UNCHANGED)
     ========================= */

  // Faculty mode handlers
async function handleFacultyLogin(e) {
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

  try {
    const res = await fetch(
      "http://localhost:9000/api/auth/faculty-login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ facultyId, password }),
      }
    );

    const data = await res.json();

    if (data.success) {
      localStorage.setItem("loginRole", "faculty");
      localStorage.setItem("facultyId", facultyId);

      login();

      navigate("/guest", {
        state: {
          loginRole: "faculty",
          facultyId,
        },
      });
    } else {
      setErrors({ password: data.message || "Invalid credentials" });
    }
  } catch {
    setErrors({ password: "Server error" });
  }
}

  function switchTab(tab) {
    setActiveTab(tab);
    setLoginRole(tab);
    setErrors({});
    setOtpSent(false);
    setOtp("");
    setEmail("");
    setFacultyId("");
    setPassword("");
  }

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
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

        {/* ================= GUEST ================= */}
        {activeTab === "guest" && (
          <div style={contentStyle}>
            <h1 style={titleStyle}>Guest Login</h1>
            <p style={subtitleStyle}>Verify your identity to continue</p>

            <form style={formStyle}>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>Email</label>
                <input
                  style={inputStyle}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
                {errors.email && <div style={errorStyle}>{errors.email}</div>}
              </div>

              {otpSent && (
                <div style={fieldGroupStyle}>
                  <label style={labelStyle}>OTP</label>
                  <input
                    style={inputStyle}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 6-digit OTP"
                  />
                  {errors.otp && <div style={errorStyle}>{errors.otp}</div>}
                </div>
              )}

              {!otpSent ? (
                <div style={buttonGroupStyle}>
                  <button style={buttonStyle} onClick={handleSendOtp}>
                    Send OTP
                  </button>
                  <button
                    style={buttonSecondaryStyle}
                    onClick={(e) => {
                      e.preventDefault();
                      setEmail("");
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
            </form>
          </div>
        )}

        {/* ================= FACULTY ================= */}
        {activeTab === "faculty" && (
          <div style={contentStyle}>
            <h1 style={titleStyle}>Faculty Login</h1>
            <p style={subtitleStyle}>Login to invite a guest</p>

            <form style={formStyle} onSubmit={handleFacultyLogin}>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>Faculty ID</label>
                <input
                  style={inputStyle}
                  value={facultyId}
                  onChange={(e) => setFacultyId(e.target.value)}
                  placeholder="e.g. 25MSP0987"
                />
                {errors.facultyId && (
                  <div style={errorStyle}>{errors.facultyId}</div>
                )}
              </div>

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
            </form>
          </div>
        )}
      </div>
    </div>
  );}
