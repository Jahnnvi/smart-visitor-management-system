import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLogin from "./Pages/MainLogin";
import GuestLogin from "./Pages/GuestLogin";
import AdminLogin from "./Pages/AdminLogin";
import SecurityLogin from "./Pages/SecurityLogin";
import GuestRequest from "./Pages/guest/GuestRequest";
import GuestPage from "./Pages/GuestPage";
import GuestStatus from "./Pages/guest/GuestStatus";
import AdminPage from "./Pages/AdminPage";
import PendingRequest from "./Pages/admin/PendingRequest";
import AssignAttendee from "./Pages/admin/AssignAttendee";
import VisitorLogs from "./Pages/admin/VisitorLogs";
import SecurityPage from "./Pages/SecurityPage";
import GateDashboard from "./Pages/security/GateDashboard";

// const SecurityPage = () => (
//   <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
//     <h1>Security Guard</h1>
//     <p>Security area - coming soon</p>
//   </div>
// );

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/requests" element={<PendingRequest />} />
        <Route path="/admin/assign" element={<AssignAttendee />} />
        <Route path="/admin/logs" element={<VisitorLogs />} />
        <Route path="/guest" element={<GuestPage />} />
        <Route path="/guest/request" element={<GuestRequest />} />
        <Route path="/guest/status" element={<GuestStatus />} />
        <Route path="/guest/login" element={<GuestLogin />} />
        <Route path="/security/login" element={<SecurityLogin />} />
        <Route path="/security" element={<SecurityPage />} />
        <Route path="/security/dashboard" element={<GateDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
