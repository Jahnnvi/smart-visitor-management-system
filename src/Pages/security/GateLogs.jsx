import React, { useState } from "react";
import SecuritySidebar from "../../components/SecuritySidebar";

export default function GateLogs() {
  const PALETTE = {
    background: "#FAFCFC",
    tableDark: "#222121",
    textDark: "#2A2A2A",
    accent: "#4CD1D6",
    border: "#E5E4E3",
  };

  const [mockToday, setMockToday] = useState([
    {
      id: "1",
      name: "Alex Morgan",
      phone: "+1 555 0123",
      type: "Pre-Registered",
      purpose: "Campus Meeting - Orientation",
      checkIn: "08:15 AM",
      checkOut: "-",
      status: "In",
    },
    {
      id: "2",
      name: "Priya Nair",
      phone: "+1 555 0456",
      type: "On-the-Spot",
      purpose: "Parent - Pick up student",
      checkIn: "09:02 AM",
      checkOut: "11:10 AM",
      status: "Out",
    },
    {
      id: "3",
      name: "Samir Patel",
      phone: "+1 555 0789",
      type: "Pre-Registered",
      purpose: "Vendor Visit",
      checkIn: "10:22 AM",
      checkOut: "-",
      status: "Denied",
    },
    {
      id: "4",
      name: "Maria Lopez",
      phone: "+1 555 0990",
      type: "On-the-Spot",
      purpose: "Campus Tour",
      checkIn: "01:05 PM",
      checkOut: "-",
      status: "In",
    },
  ]);

  /* ---------- LAYOUT (MATCH OTHER SECURITY PAGES) ---------- */

  const pageStyle = {
    minHeight: "100vh",
    background:
      "linear-gradient(180deg, rgba(7,18,41,1) 0%, rgba(5,12,28,1) 100%)",
    display: "flex",
    justifyContent: "center",
    padding: 28,
    fontFamily:
      "Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial",
  };

  const layoutStyle = {
    display: "flex",
    gap: 22,
    width: "100%",
    maxWidth: 1200,
  };

  const mainStyle = {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  /* ---------- EXISTING UI (UNCHANGED) ---------- */

  const card = {
    width: "100%",
    maxWidth: 1100,
    borderRadius: 10,
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
    background: PALETTE.tableDark,
    color: "#fff",
    border: `1px solid ${PALETTE.border}`,
  };

  const header = {
    padding: "22px 28px",
    borderBottom: `1px solid ${PALETTE.border}`,
  };

  const title = { margin: 0, fontSize: 22, color: PALETTE.accent };
  const subtitle = { marginTop: 6, color: "#ddd", fontSize: 13 };

  const tableWrap = { padding: 20, overflowX: "auto" };
  const table = { width: "100%", borderCollapse: "collapse", minWidth: 880 };
  const th = {
    textAlign: "left",
    padding: "10px 12px",
    color: "#ccc",
    fontSize: 13,
    borderBottom: `1px solid ${PALETTE.border}`,
  };
  const td = {
    padding: "12px",
    borderBottom: `1px solid ${PALETTE.border}`,
    fontSize: 14,
    color: "#f5f5f5",
  };

  const badge = () => ({
    display: "inline-block",
    padding: "6px 10px",
    borderRadius: 999,
    background: "#111",
    color: "#eee",
    fontSize: 12,
    fontWeight: 700,
  });

  function statusStyle(s) {
    if (s === "In")
      return {
        background: PALETTE.accent,
        color: "#072022",
        padding: "6px 10px",
        borderRadius: 8,
        fontWeight: 800,
      };
    if (s === "Out")
      return {
        background: "#efefef",
        color: PALETTE.textDark,
        padding: "6px 10px",
        borderRadius: 8,
        fontWeight: 700,
      };
    return {
      background: "#3b2b2b",
      color: "#fff",
      padding: "6px 10px",
      borderRadius: 8,
      fontWeight: 700,
    };
  }

  const checkoutBtn = {
    background: PALETTE.accent,
    color: "#072022",
    border: "none",
    padding: "8px 12px",
    borderRadius: 8,
    fontWeight: 800,
    cursor: "pointer",
  };

  function getCurrentTime() {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function handleCheckout(id) {
    const outTime = getCurrentTime();

    setMockToday((prev) =>
      prev.map((v) =>
        v.id === id
          ? {
              ...v,
              status: "Out",
              checkOut: outTime,
            }
          : v
      )
    );
  }

  return (
    <div style={pageStyle}>
      <div style={layoutStyle}>
        {/* ✅ Security Sidebar */}
        <SecuritySidebar />

        <div style={mainStyle}>
          <div style={card}>
            <div style={header}>
              <h1 style={title}>Today's Gate Log</h1>
              <div style={subtitle}>All visitor movements recorded today</div>
            </div>

            <div style={tableWrap}>
              <table style={table}>
                <thead>
                  <tr>
                    <th style={th}>Visitor Name</th>
                    <th style={th}>Phone Number</th>
                    <th style={th}>Visitor Type</th>
                    <th style={th}>Purpose of Visit</th>
                    <th style={th}>Check-In Time</th>
                    <th style={th}>Check-Out Time</th>
                    <th style={th}>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {mockToday.map((v) => (
                    <tr key={v.id}>
                      <td style={td}>{v.name}</td>
                      <td style={td}>{v.phone}</td>
                      <td style={td}>
                        <span style={badge()}>{v.type}</span>
                      </td>
                      <td style={td}>{v.purpose}</td>
                      <td style={td}>{v.checkIn}</td>
                      <td style={td}>{v.checkOut || "-"}</td>

                      <td style={td}>
                        {v.status === "In" ? (
                          <button
                            style={checkoutBtn}
                            onClick={() => handleCheckout(v.id)}
                          >
                            CheckOut
                          </button>
                        ) : (
                          <span style={statusStyle(v.status)}>{v.status}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
