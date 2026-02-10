import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./GuestSidebar.css";

export default function GuestSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname || "/guest/request";

  /* styles moved to GuestSidebar.css */

  return (
    <aside className="gsb-aside">
      <div className="gsb-header">Guest Panel</div>
      <nav className="gsb-nav">
        <div
          className={`gsb-item ${path === "/guest/request" || path === "/guest" ? "active" : ""}`}
          onClick={() => navigate("/guest/request")}
        >
          Request Visit
        </div>

        <div
          className={`gsb-item ${path === "/guest/status" ? "active" : ""}`}
          onClick={() => navigate("/guest/status")}
        >
          Check Status
        </div>
      </nav>
    </aside>
  );
}
