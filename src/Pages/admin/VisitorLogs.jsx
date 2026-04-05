import React, { useEffect, useMemo, useState} from "react";
import AdminSidebar from "../../components/AdminSidebar";
import VisitorStatsModal from "../../components/VisitorStatsModal";

const VisitorLogs = () => {
const [logs, setLogs]=useState([]);
const [loading, setLoading]=useState(true);

useEffect(()=> {
  const fetchLogs = async() => {
    try{
      const res= await fetch("http://localhost:9000/api/visitors/logs");
      const result= await res.json();

      if(result.success){
        setLogs(result.data);
      }
    }catch(error){
      console.error("Error loading data");
    }finally{
      setLoading(false);
    }
  };
  fetchLogs();
}, []);

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #071229, #050c1c)",
    padding: 28,
    fontFamily:
      "Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial",
    display: "flex",
    justifyContent: "center",
  },
  layout: {
    display: "flex",
    gap: 22,
    width: "100%",
    maxWidth: 1200,
  },
  main: { flex: 1 },
};


  const [dateFilter, setDateFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);

  const filteredLogs = useMemo(() => {
    if (dateFilter === "Today") {
      const today = new Date().toISOString().split("T")[0];

    return logs.filter(
      (log) =>
        log.visitDate &&
        new Date(log.visitDate).toISOString().split("T")[0] === today
    );
  }
    return logs;
  }, [dateFilter, logs]);

  /* ---- EXISTING STYLES (UNCHANGED) ---- */

  const headerStyle = {
    marginBottom: "24px",
  };

  const topRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "16px",
    marginBottom: "24px",
  };

  const titleStyle = {
    fontSize: "1.75rem",
    fontWeight: 600,
    color: "#FAFCFC",
    marginBottom: "8px",
  };

  const subtitleStyle = {
    fontSize: "0.95rem",
    color: "#9aa6b2",
  };

  const controlsStyle = {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    flexWrap: "wrap",
  };

  const statsButtonStyle = {
    backgroundColor: "#4CD1D6",
    color: "#222121",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    fontSize: "0.95rem",
    fontWeight: 600,
    cursor: "pointer",
  };

  const filterButtonStyle = (active) => ({
    padding: "8px 16px",
    borderRadius: "8px",
    border: `2px solid ${active ? "#4CD1D6" : "#E5E4E3"}`,
    backgroundColor: active ? "#4CD1D6" : "#FAFCFC",
    color: active ? "#222121" : "#2A2A2A",
    fontSize: "0.9rem",
    fontWeight: 600,
    cursor: "pointer",
  });

  const cardStyle = {
    backgroundColor: "#222121",
    borderRadius: "12px",
    padding: "24px",
    overflowX: "auto",
    border: "1px solid #E5E4E3",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "0.9rem",
  };

  const thStyle = {
    textAlign: "left",
    padding: "12px 16px",
    color: "#FAFCFC",
    fontWeight: 600,
    borderBottom: "2px solid #E5E4E3",
  };

  const tdStyle = {
    padding: "12px 16px",
    color: "#FAFCFC",
    borderBottom: "1px solid #E5E4E3",
  };

  const badgeBase = {
    padding: "4px 10px",
    borderRadius: "6px",
    fontSize: "0.8rem",
    fontWeight: 600,
  };

  const getStatusBadgeStyle = (status) => {
    if (status === "In")
      return { ...badgeBase, backgroundColor: "#4CD1D6", color: "#222121" };
    if (status === "Denied")
      return { ...badgeBase, backgroundColor: "#2A2A2A", color: "#FAFCFC" };
    return { ...badgeBase, backgroundColor: "#E5E4E3", color: "#2A2A2A" };
  };

  return (
    <div style={styles.page}>
      <div style={styles.layout}>
        {/* ✅ Admin Sidebar added */}
        <AdminSidebar />

        <div style={styles.main}>
          <div style={headerStyle}>
            <h1 style={titleStyle}>Visitor Logs</h1>
            <p style={subtitleStyle}>View and track visitor activity</p>
          </div>

          <div style={topRowStyle}>
            <div style={controlsStyle}>
              <button
                style={statsButtonStyle}
                onClick={() => setShowModal(true)}
              >
                See Statistics
              </button>
              <button
                style={filterButtonStyle(dateFilter === "Today")}
                onClick={() => setDateFilter("Today")}
              >
                Today
              </button>
              <button
                style={filterButtonStyle(dateFilter === "All")}
                onClick={() => setDateFilter("All")}
              >
                All
              </button>
            </div>
          </div>

          <div style={cardStyle}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Guest Name</th>
                  <th style={thStyle}>Phone</th>
                  <th style={thStyle}>Visitor Type</th>
                  <th style={thStyle}>Purpose</th>
                 
                  <th style={thStyle}>Visit Date</th>
                  <th style={thStyle}>Check-In</th>
                  <th style={thStyle}>Check-Out</th>
                  <th style={thStyle}>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log) => {
                  console.log("STATUS FROM DB:", log.status);
  return (
  <tr key={log._id}>
    <td style={tdStyle}>{log.guestName}</td>
    <td style={tdStyle}>{log.guestPhone}</td>
    <td style={tdStyle}>{log.visitorType}</td>
    <td style={tdStyle}>{log.purpose}</td>
   
    <td style={tdStyle}>
      {log.visitDate
        ? new Date(log.visitDate).toDateString()
        : "-"}
    </td>
    <td style={tdStyle}>{log.checkInTime ? new Date(log.checkInTime).toLocaleTimeString() : "-"}</td>
    <td style={tdStyle}>{log.checkOutTime ? new Date(log.checkOutTime).toLocaleTimeString() : "-"}</td>
    <td>
      {log.status === "checked-in" && <span style={getStatusBadgeStyle("In")}>In</span>}
      {log.status === "checked-out" && <span style={getStatusBadgeStyle("Out")}>Out</span>}
      {log.status === "rejected" && <span style={getStatusBadgeStyle("Denied")}>Denied</span>}
      {log.status === "pending" && <span style={getStatusBadgeStyle("Pending")}>Pending</span>}
    </td>
  </tr>);
})}

              </tbody>
            </table>
          </div>
        </div>
      </div>

      <VisitorStatsModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        visitorLogs={logs}
      />
    </div>
  );
};

export default VisitorLogs;
