import React from "react";

const Footer = () => {
  const footerStyle = {
    width: "100%",
    backgroundColor: "#222121",
    color: "#FAFCFC",
    padding: "48px 24px",
    textAlign: "center",
    fontFamily: "'Segoe UI', Tahoma, sans-serif",
    marginTop: "auto",
    borderTop: "1px solid #3a3a3a",
  };

  const contentStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
  };

  const websiteNameStyle = {
    fontSize: "18px",
    fontWeight: 700,
    color: "#4CD1D6",
    marginBottom: "12px",
  };

  const taglineStyle = {
    fontSize: "14px",
    color: "#FAFCFC",
    opacity: 0.9,
    marginBottom: "16px",
  };

  const infoStyle = {
    fontSize: "13px",
    opacity: 0.75,
    marginBottom: "16px",
    lineHeight: "1.6",
  };

  const copyrightStyle = {
    fontSize: "12px",
    opacity: 0.6,
    borderTop: "1px solid #3a3a3a",
    paddingTop: "16px",
    marginTop: "16px",
  };

  return (
    <footer style={footerStyle}>
      <div style={contentStyle}>
        <div style={websiteNameStyle}>VisitorX</div>
        <div style={taglineStyle}>Visitor Management System</div>

        <div style={infoStyle}>
          <p style={{ margin: "0 0 8px 0" }}>
            📧 Email: contact@visitorx.com | 📞 Phone: +91 98765 43210
          </p>
          <p style={{ margin: 0 }}>Secure guest management for modern institutions</p>
        </div>

        <div style={copyrightStyle}>
          © {new Date().getFullYear()} <strong>VisitorX</strong>. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;