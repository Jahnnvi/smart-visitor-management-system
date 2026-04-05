import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const navbarStyle = {
    position: "sticky",
    top: 0,
    zIndex: 999,
    height: "60px",
    backgroundColor: "#222121",
    padding: "0 32px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    fontFamily: "'Segoe UI', Tahoma, sans-serif",
  };

  const logoStyle = {
    color: "#4CD1D6",
    fontSize: "1.5rem",
    fontWeight: 700,
    textDecoration: "none",
  };

  const menuStyle = {
    display: "flex",
    gap: "32px",
    listStyle: "none",
    margin: 0,
    padding: 0,
  };

  const linkStyle = {
    color: "#FAFCFC",
    textDecoration: "none",
    fontSize: "15px",
    fontWeight: 500,
    cursor: "pointer",
  };

  const handleLogout = () => {
  logout();

  localStorage.removeItem("facultyId");
localStorage.removeItem("facultyName");
localStorage.removeItem("facultyEmail");
localStorage.removeItem("guestEmail");
localStorage.removeItem("loginRole");

  navigate("/login");
};

  return (
    <nav style={navbarStyle}>
      <Link to="/" style={logoStyle}>VisitorX</Link>

      <ul style={menuStyle}>
        <li>
          <Link to="/" style={linkStyle}>Home</Link>
        </li>

        <li>
          {!isLoggedIn ? (
            <Link to="/login" style={linkStyle}>Login</Link>
          ) : (
            <span onClick={handleLogout} style={linkStyle}>
              Logout
            </span>
          )}
        </li>

        <li>
          <Link to="/contact" style={linkStyle}>Contact Us</Link>
        </li>
      </ul>
    </nav>
  );
}