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
import GateDashboard from "./Pages/security/GateDashboard";
import VerifyVisitor from "./Pages/security/VerifyVisitor";
import OnSpotEntry from "./Pages/security/OnSpotEntry";
import GateLogs from "./Pages/security/GateLogs";



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
        <Route path="/security/dashboard" element={<GateDashboard />} />
        <Route path="/security/verify" element={<VerifyVisitor />} />
        <Route path="/security/on-spot-entry" element={<OnSpotEntry />} />
        <Route path="/security/logs" element={<GateLogs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
