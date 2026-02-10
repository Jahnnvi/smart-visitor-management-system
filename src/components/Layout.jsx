import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  const pageWrapperStyle = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#FAFCFC",
    fontFamily: "'Segoe UI', Tahoma, sans-serif",
    margin: 0,
    padding: 0,
    overflowX: "hidden",
  };

  const contentStyle = {
    flex: 1,
  };

  return (
    <div style={pageWrapperStyle}>
      {/* 🔹 Navbar - Sticky */}
      <Navbar />

      {/* 🔹 Page Content */}
      <div style={contentStyle}>
        <Outlet />
      </div>

      {/* 🔹 Footer */}
      <Footer />
    </div>
  );
}