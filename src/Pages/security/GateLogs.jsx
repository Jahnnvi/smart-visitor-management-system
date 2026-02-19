import React, { useEffect, useState } from "react";
import SecuritySidebar from "../../components/SecuritySidebar";

export default function GateLogs() {
  const PALETTE = {
    background: "#FAFCFC",
    tableDark: "#222121",
    textDark: "#2A2A2A",
    accent: "#4CD1D6",
    border: "#E5E4E3",
  };

  const [mockToday, setMockToday] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchTodayLogs() {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8000/api/visitors/logs/today");
      const data = await res.json();

      if (!res.ok || !data.success) {
        setMockToday([]);
        return;
      }

      const mapped = (data.data || []).map((log) => ({
        id: log._id,
        name: log.guestName,
        phone: log.guestPhone,
        type: log.visitorType || "Pre-Registered",
        purpose: log.purpose || "-",
        checkIn: log.checkInTime
          ? new Date(log.checkInTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "-",
        checkOut: log.checkOutTime
          ? new Date(log.checkOutTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "-",
        status: log.status === "checked-in" ? "In" : "Out",
        visitorId: log.visitorId,
      }));

      setMockToday(mapped);
    } catch (err) {
      setMockToday([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTodayLogs();
  }, []);

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
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
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

  async function handleCheckout(visitorId) {
    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:8000/api/visitors/${visitorId}/checkout`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(data.message || "Checkout failed");
        return;
      }

      await fetchTodayLogs();
    } catch (err) {
      alert("Backend not reachable. Is server running?");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={pageStyle}>
      <div style={layoutStyle}>
        {/* ✅ Security Sidebar */}
        <SecuritySidebar />

        <div style={mainStyle}>
          <div style={card}>
            <div style={header}>
              <div>
                <h1 style={title}>Today's Gate Log</h1>
                <div style={subtitle}>
                  All visitor movements recorded today
                </div>
              </div>

              {/* tiny refresh without changing layout */}
              <button
                onClick={fetchTodayLogs}
                style={{
                  ...checkoutBtn,
                  padding: "8px 10px",
                  opacity: loading ? 0.7 : 1,
                }}
                disabled={loading}
              >
                {loading ? "Loading..." : "Refresh"}
              </button>
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
                            onClick={() => handleCheckout(v.visitorId)}
                            disabled={loading}
                          >
                            CheckOut
                          </button>
                        ) : (
                          <span style={statusStyle(v.status)}>{v.status}</span>
                        )}
                      </td>
                    </tr>
                  ))}

                  {!loading && mockToday.length === 0 && (
                    <tr>
                      <td style={td} colSpan={7}>
                        No gate logs found for today.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
