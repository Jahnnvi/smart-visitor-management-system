import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const VisitorStatsModal = ({ isOpen, onClose, visitorLogs }) => {

  const chartData = useMemo(() => {
    const dateCounts = {};
    (visitorLogs || []).forEach((log) => {
      if (log.visitDate) {
        dateCounts[log.visitDate] =
          (dateCounts[log.visitDate] || 0) + 1;
      }
    });
    const dates = Object.keys(dateCounts).sort();
    const counts = dates.map((d) => dateCounts[d]);
    return {
      labels: dates,
      datasets: [
        {
          label: "Visitors",
          data: counts,
          backgroundColor: "#4CD1D6",
          borderColor: "#E5E4E3",
          borderWidth: 1,
        },
      ],
    };
  }, [visitorLogs]);

  if (!isOpen) return null;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: { display: false },
      legend: { display: false },
    },
    scales: {
      x: {
        ticks: { color: "#2A2A2A", font: { size: 12 } },
        grid: { color: "#E5E4E3" },
      },
      y: {
        ticks: { color: "#2A2A2A", font: { size: 12 } },
        grid: { color: "#E5E4E3" },
        beginAtZero: true,
      },
    },
  };

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: "24px",
  };

  const modalStyle = {
    backgroundColor: "#FAFCFC",
    borderRadius: "12px",
    padding: "32px",
    width: "70%",
    height: "70%",
    maxWidth: "800px",
    maxHeight: "85vh",
    overflow: "auto",
    boxShadow: "0 8px 40px rgba(0, 0, 0, 0.2)",
    border: "1px solid #E5E4E3",
  };

  const modalHeaderStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  };

  const modalTitleStyle = {
    fontSize: "1.5rem",
    fontWeight: 600,
    color: "#2A2A2A",
  };

  const closeButtonStyle = {
    backgroundColor: "transparent",
    border: "2px solid #E5E4E3",
    color: "#2A2A2A",
    width: "40px",
    height: "40px",
    borderRadius: "8px",
    fontSize: "1.25rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 1,
  };

  const chartContainerStyle = {
    height: "350px",
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div style={modalHeaderStyle}>
          <h2 style={modalTitleStyle}>Visitor Statistics</h2>
          <button
            style={closeButtonStyle}
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div style={chartContainerStyle}>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default VisitorStatsModal;
