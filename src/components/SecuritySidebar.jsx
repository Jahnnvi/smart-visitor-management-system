import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./GuestSidebar.css";

export default function SecuritySidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname || "/security/verify";

  /* styles moved to GuestSidebar.css */

  return (
    <aside className="gsb-aside">
      <div className="gsb-header">Security Panel</div>
      <nav className="gsb-nav">
        <div
          className={`gsb-item ${path === "/security/verify" || path === "/security" ? "active" : ""}`}
          onClick={() => navigate("/security/verify")}
        >
          Pre-Registered visitor verification
        </div>

        <div
          className={`gsb-item ${path === "/security/on-spot-entry" ? "active" : ""}`}
          onClick={() => navigate("/security/on-spot-entry")}
        >
          On-the-Spot Entry
        </div>

         <div
          className={`gsb-item ${path === "/security/logs" ? "active" : ""}`}
          onClick={() => navigate("/security/logs")}
        >
          Today's Gate Log
        </div>
      </nav>
    </aside>
  );
}
