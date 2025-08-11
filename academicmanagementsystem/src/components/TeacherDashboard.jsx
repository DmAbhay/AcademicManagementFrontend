import React from "react";
import { useNavigate } from "react-router-dom";

export default function TeacherDashboard() {
  const navigate = useNavigate();

  const buttonStyle = {
    width: "180px",
    height: "80px",
    margin: "20px",
    fontSize: "24px",
    fontWeight: "600",
    borderRadius: "12px",
    border: "none",
    backgroundColor: "#28a745",
    color: "white",
    cursor: "pointer",
    boxShadow: "0 5px 15px rgba(40, 167, 69, 0.4)",
    transition: "background-color 0.3s ease, transform 0.2s ease",
  };

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1 style={{ fontSize: "36px", marginBottom: "40px" }}>Teacher Dashboard</h1>
      <button style={buttonStyle} onClick={() => navigate("/student")}>
        My Courses 
      </button>
    </div>
  );
}