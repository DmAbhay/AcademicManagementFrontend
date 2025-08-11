import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // import the hook



export default function AdminDashboard() {
  const navigate = useNavigate();

  const { token, role, login, logout } = useAuth();

  const buttonStyle = {
    width: "180px",
    height: "80px",
    margin: "20px",
    fontSize: "24px",
    fontWeight: "600",
    borderRadius: "12px",
    border: "none",
    backgroundColor: "#007BFF",
    color: "white",
    cursor: "pointer",
    boxShadow: "0 5px 15px rgba(0, 123, 255, 0.4)",
    transition: "background-color 0.3s ease, transform 0.2s ease",
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: "50px",
  };

  const handleMouseEnter = (e) => {
    e.target.style.backgroundColor = "#0056b3";
    e.target.style.transform = "scale(1.05)";
  };

  const handleMouseLeave = (e) => {
    e.target.style.backgroundColor = "#007BFF";
    e.target.style.transform = "scale(1)";
  };

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1 style={{ fontSize: "36px", marginBottom: "40px" }}>
        Welcome to Dashboard! 
      </h1>
      <h2>your are {role}</h2>
      <div style={containerStyle}>
        <button
          style={buttonStyle}
          onClick={() => navigate("/student")}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Student
        </button>
        <button
          style={buttonStyle}
          onClick={() => navigate("/courses")}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Courses
        </button>
        <button
          style={buttonStyle}
          onClick={() => navigate("/teacher")}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Teacher
        </button>
        <button
          style={buttonStyle}
          onClick={() => navigate("/department")}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Department
        </button>
      </div>
    </div>
  );
}





// import React from "react";
// import { useNavigate } from "react-router-dom";

// export default function Dashboard() {
//   const navigate = useNavigate();

//   return (
//     <div>
//       <h2>Welcome to Dashboard!</h2>
//       <button onClick={() => navigate("/student")}>Student</button>
//       <button onClick={() => navigate("/courses")}>Courses</button>
//       <button onClick={() => navigate("/teacher")}>Teacher</button>
//       <button onClick={() => navigate("/department")}>Department</button>
//     </div>
//   );
// }
