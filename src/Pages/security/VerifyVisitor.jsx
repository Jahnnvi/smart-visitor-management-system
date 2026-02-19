import React, { useState } from "react";
import SecuritySidebar from "../../components/SecuritySidebar";

export default function VerifyVisitor() {
  const PALETTE = {
    background: "#FAFCFC",
    cardDark: "#222121",
    textDark: "#2A2A2A",
    accent: "#4CD1D6",
    border: "#E5E4E3",
  };

  const [visitorId, setVisitorId] = useState("");
  const [requestId, setRequestId] = useState(""); // kept for UI only
  const [visitor, setVisitor] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function isToday(dateString) {
    const d = new Date(dateString);
    const today = new Date();

    d.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return d.getTime() === today.getTime();
  }

  async function handleVerify(e) {
    e.preventDefault();
    setError("");
    setVisitor(null);

    const key = visitorId.trim();

    if (!key) {
      setError("Enter visitor id or request ID to verify.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`http://localhost:8000/api/visitors/${key}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Visitor not found");
        return;
      }

      const v = data.data;

      // Validate: status must be approved
      if (v.status !== "approved") {
        setVisitor({
          guestName: v.guestName,
          visitorId: v.visitorId,
          visitorType: "Pre-Registered",
          purpose: v.purpose,
          assignedHost: v.facultyName || "-",
          visitDate: new Date(v.visitDate).toLocaleDateString(),
          approvalStatus: "Denied",
          checkedIn: false,
          requestId: requestId || "-",
          raw: v,
        });

        setError(
          `Not allowed. Visitor status is "${v.status}". Must be approved.`
        );
        return;
      }

      // Validate: visitDate must be today
      if (!isToday(v.visitDate)) {
        setVisitor({
          guestName: v.guestName,
          visitorId: v.visitorId,
          visitorType: "Pre-Registered",
          purpose: v.purpose,
          assignedHost: v.facultyName || "-",
          visitDate: new Date(v.visitDate).toLocaleDateString(),
          approvalStatus: "Denied",
          checkedIn: false,
          requestId: requestId || "-",
          raw: v,
        });

        setError("Not allowed. Visitor is not scheduled for today.");
        return;
      }

      // If already checked-in or checked-out
      if (v.status === "checked-in") {
        setVisitor({
          guestName: v.guestName,
          visitorId: v.visitorId,
          visitorType: "Pre-Registered",
          purpose: v.purpose,
          assignedHost: v.facultyName || "-",
          visitDate: new Date(v.visitDate).toLocaleDateString(),
          approvalStatus: "Checked In",
          checkedIn: true,
          requestId: requestId || "-",
          raw: v,
        });
        return;
      }

      if (v.status === "checked-out") {
        setVisitor({
          guestName: v.guestName,
          visitorId: v.visitorId,
          visitorType: "Pre-Registered",
          purpose: v.purpose,
          assignedHost: v.facultyName || "-",
          visitDate: new Date(v.visitDate).toLocaleDateString(),
          approvalStatus: "Denied",
          checkedIn: true,
          requestId: requestId || "-",
          raw: v,
        });

        setError("Visitor already checked out.");
        return;
      }

      // Valid approved visitor for today
      setVisitor({
        guestName: v.guestName,
        visitorId: v.visitorId,
        visitorType: "Pre-Registered",
        purpose: v.purpose,
        assignedHost: v.facultyName || "-",
        visitDate: new Date(v.visitDate).toLocaleDateString(),
        approvalStatus: "Approved",
        checkedIn: false,
        requestId: requestId || "-",
        raw: v,
      });
    } catch (err) {
      setError("Backend not reachable. Is server running on port 8000?");
    } finally {
      setLoading(false);
    }
  }

  async function handleAllowEntry() {
    if (!visitor) return;
    setError("");

    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:8000/api/visitors/${visitor.visitorId}/checkin`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Check-in failed");
        return;
      }

      setVisitor({
        ...visitor,
        approvalStatus: "Checked In",
        checkedIn: true,
      });
    } catch (err) {
      setError("Backend not reachable. Is server running on port 8000?");
    } finally {
      setLoading(false);
    }
  }

  /* ---- LAYOUT STYLES (MATCH GuestRequest) ---- */

  const pageStyle = {
    minHeight: "100vh",
    background:
      "linear-gradient(180deg, rgba(7,18,41,1) 0%, rgba(5,12,28,1) 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 28,
    fontFamily:
      "Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial",
  };

  const layoutStyle = {
    display: "flex",
    gap: 22,
    width: "100%",
    maxWidth: 1100,
  };

  const mainStyle = {
    flex: 1,
    display: "flex",
    alignItems: "center", // vertical center
    justifyContent: "center", // horizontal center
  };

  /* ---- EXISTING UI STYLES (UNCHANGED) ---- */

  const cardStyle = {
    background: PALETTE.cardDark,
    color: "#fff",
    borderRadius: 10,
    maxWidth: "100%",
    boxShadow: "0 6px 22px rgba(0,0,0,0.25)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "row",
    border: `1px solid ${PALETTE.border}`,
  };

  const leftStyle = {
    flex: 1,
    padding: 28,
    borderRight: `1px solid ${PALETTE.border}`,
    background: PALETTE.cardDark,
  };

  const rightStyle = {
    width: 360,
    padding: 24,
    background: PALETTE.cardDark,
  };

  const titleStyle = { margin: 0, fontSize: 28, color: PALETTE.accent };
  const subtitleStyle = { marginTop: 6, marginBottom: 18, color: "#ddd" };

  const labelStyle = {
    display: "block",
    color: "#ddd",
    marginBottom: 6,
    fontSize: 13,
  };
  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 6,
    border: `1px solid ${PALETTE.border}`,
    marginBottom: 14,
    outline: "none",
    fontSize: 14,
    background: "#fff",
    color: PALETTE.textDark,
  };

  const buttonStyle = {
    background: PALETTE.accent,
    border: "none",
    color: "#222",
    padding: "10px 14px",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 14,
  };

  const infoCardStyle = {
    marginTop: 18,
    background: "#fff",
    color: PALETTE.textDark,
    padding: 16,
    borderRadius: 8,
    border: `1px solid ${PALETTE.border}`,
  };

  const infoRow = (label, value) => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "6px 0",
      }}
    >
      <div style={{ color: "#6b6b6b", fontSize: 13 }}>{label}</div>
      <div style={{ fontWeight: 600 }}>{value}</div>
    </div>
  );

  return (
    <div style={pageStyle}>
      <div style={layoutStyle}>
        {/* ✅ Security Sidebar added */}
        <SecuritySidebar />

        <div style={mainStyle}>
          <div style={cardStyle}>
            <div style={leftStyle}>
              <h1 style={titleStyle}>Verify Visitor</h1>
              <div style={subtitleStyle}>
                Verify pre-registered visitors before entry
              </div>

              <form onSubmit={handleVerify}>
                <label style={labelStyle}>Visitor ID</label>
                <input
                  style={inputStyle}
                  value={visitorId}
                  onChange={(e) => setVisitorId(e.target.value)}
                  placeholder="Enter visitor id"
                />

                <label style={labelStyle}>Request ID (optional)</label>
                <input
                  style={inputStyle}
                  value={requestId}
                  onChange={(e) => setRequestId(e.target.value)}
                  placeholder="Optional request ID"
                />

                <button type="submit" style={buttonStyle} disabled={loading}>
                  {loading ? "Verifying..." : "Verify Visitor"}
                </button>
              </form>

              {error && (
                <div
                  style={{
                    marginTop: 12,
                    color: "#ffdddd",
                    background: "#3a1515",
                    padding: 10,
                    borderRadius: 6,
                  }}
                >
                  {error}
                </div>
              )}

              {visitor && (
                <div style={infoCardStyle}>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>
                    Visitor Details
                  </div>

                  {infoRow("Guest Name", visitor.guestName)}
                  {infoRow("Visitor ID", visitor.visitorId)}
                  {infoRow("Visitor Type", visitor.visitorType)}
                  {infoRow("Purpose", visitor.purpose)}
                  {infoRow("Assigned Host", visitor.assignedHost)}
                  {infoRow("Visit Date", visitor.visitDate)}

                  <div style={{ marginTop: 10 }}>
                    {visitor.approvalStatus === "Approved" && (
                      <div
                        style={{
                          display: "flex",
                          gap: 10,
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            background: PALETTE.accent,
                            color: "#072022",
                            padding: "6px 10px",
                            borderRadius: 6,
                            fontWeight: 700,
                          }}
                        >
                          Approved
                        </div>

                        {!visitor.checkedIn && (
                          <button
                            onClick={handleAllowEntry}
                            style={{ ...buttonStyle, padding: "8px 10px" }}
                            disabled={loading}
                          >
                            {loading ? "Checking In..." : "Allow Entry"}
                          </button>
                        )}

                        {visitor.checkedIn && (
                          <div style={{ fontWeight: 700 }}>Checked In</div>
                        )}
                      </div>
                    )}

                    {visitor.approvalStatus === "Denied" && (
                      <div
                        style={{
                          marginTop: 6,
                          padding: 10,
                          borderRadius: 6,
                          background: "#3b2b2b",
                          color: "#fff",
                        }}
                      >
                        Entry Denied
                      </div>
                    )}

                    {visitor.approvalStatus === "Checked In" && (
                      <div style={{ fontWeight: 700 }}>Checked In</div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div style={rightStyle}>
              <div
                style={{
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 700,
                  marginBottom: 12,
                }}
              >
                Gate Tools
              </div>
              <div style={{ color: "#ccc", fontSize: 13, lineHeight: 1.5 }}>
                - Verify using visitor id or optional Request ID.
                <br />- Approved visitors can be checked in from this panel.
                <br />- For any issues, contact the front desk or admin office.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
