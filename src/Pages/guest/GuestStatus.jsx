import React from "react";
import GuestSidebar from "../../components/GuestSidebar";
import "./GuestStatus.css";

const GuestStatus = () => {
  // Mock requests for the logged-in guest
  const requests = [
    {
      id: "REQ-101",
      guestName: "John Doe",
      purpose: "Campus tour and admissions meeting",
      visitingDate: "2025-02-15",
      assignedAttendee: "Dr. Jane Smith",
      status: "Approved",
    },
    {
      id: "REQ-102",
      guestName: "John Doe",
      purpose: "Guest lecture discussion",
      visitingDate: "2025-02-20",
      assignedAttendee: null,
      status: "Pending",
    },
    {
      id: "REQ-103",
      guestName: "John Doe",
      purpose: "Vendor meeting",
      visitingDate: "2025-02-10",
      assignedAttendee: null,
      status: "Denied",
    },
  ];

  /* Presentation styles moved to GuestStatus.css */

  return (
    <div className="gs-page">
      <div className="gs-layout">
        <GuestSidebar />
        <div className="gs-main">
          <div className="gs-header">
            <h1 className="gs-title">My Requests</h1>
            <p className="gs-subtitle">Track the status of all visit requests you have submitted</p>
          </div>

          <div className="gs-list">
            {requests.map((req) => (
              <div key={req.id} className="gs-card">
                <div className="gs-row">
                  <span className="gs-label">Request ID</span>
                  <span>{req.id}</span>
                </div>

                <div className="gs-row">
                  <span className="gs-label">Purpose</span>
                  <span className="gs-purpose">{req.purpose}</span>
                </div>

                <div className="gs-row">
                  <span className="gs-label">Visiting Date</span>
                  <span>{req.visitingDate}</span>
                </div>

                {req.assignedAttendee && (
                  <div className="gs-row">
                    <span className="gs-label">Attendee</span>
                    <span>{req.assignedAttendee}</span>
                  </div>
                )}

                <div className="gs-row gs-row--spaced">
                  <span className="gs-label">Status</span>
                  <span className={`gs-badge gs-badge--${req.status.toLowerCase()}`}>{req.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestStatus;