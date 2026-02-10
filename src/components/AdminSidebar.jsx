import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./GuestSidebar.css";

export default function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname || "/admin/requests";

  /* styles moved to AdminSidebar.css */

  return (
    <aside className="gsb-aside">
      <div className="gsb-header">Admin Panel</div>
      <nav className="gsb-nav">
        <div
          className={`gsb-item ${path === "/admin/requests" ? "active" : ""}`}
          onClick={() => navigate("/admin/requests")}
        >
          Pending Requests
        </div>

        <div
          className={`gsb-item ${path === "/admin/visitor-logs" ? "active" : ""}`}
          onClick={() => navigate("/admin/visitor-logs")}
        >
          Visitor Logs
        </div>
      </nav>
    </aside>
  );
}
