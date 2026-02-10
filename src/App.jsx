import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import MainLogin from "./Pages/MainLogin";
import GuestLogin from "./Pages/GuestLogin";
import AdminLogin from "./Pages/AdminLogin";
import SecurityLogin from "./Pages/SecurityLogin";
import GuestRequest from "./Pages/guest/GuestRequest";
import GuestPage from "./Pages/GuestPage";
import GuestStatus from "./Pages/guest/GuestStatus";
import AdminPage from "./Pages/AdminPage";
import PendingRequest from "./Pages/admin/PendingRequest";
//import AssignAttendee from "./Pages/admin/AssignAttendee";
import VisitorLogs from "./Pages/admin/VisitorLogs";
import GateDashboard from "./Pages/security/GateDashboard";
import VerifyVisitor from "./Pages/security/VerifyVisitor";
import OnSpotEntry from "./Pages/security/OnSpotEntry";
import GateLogs from "./Pages/security/GateLogs";
import About from "./Pages/About";
import Contact from "./Pages/Contact";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ALL PAGES WRAPPED IN LAYOUT - NAVBAR + FOOTER ON EVERY PAGE */}
        <Route element={<Layout />}>
          {/* Public Pages */}
          <Route path="/" element={<About />} />
          <Route path="/login" element={<MainLogin />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/requests" element={<PendingRequest />} />
          {/* <Route path="/admin/assign" element={<AssignAttendee />} /> */}
          <Route path="/admin/logs" element={<VisitorLogs />} />

          {/* Guest */}
          <Route path="/guest/login" element={<GuestLogin />} />
          <Route path="/guest" element={<GuestPage />} />
          <Route path="/guest/request" element={<GuestRequest />} />
          <Route path="/guest/status" element={<GuestStatus />} />

          {/* Security */}
          <Route path="/security/login" element={<SecurityLogin />} />
          <Route path="/security/dashboard" element={<GateDashboard />} />
          <Route path="/security/verify" element={<VerifyVisitor />} />
          <Route path="/security/on-spot-entry" element={<OnSpotEntry />} />
          <Route path="/security/logs" element={<GateLogs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;