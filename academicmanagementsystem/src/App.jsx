import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./components/AuthContext";

// Components
import Login from "./components/Login";
import Register from "./components/Register";
import AdminDashboard from "./components/AdminDashboard";
import StudentDashboard from "./components/StudentDashboard";
import AdminStudentPage from "./components/AdminStudentPage";
import AdminCoursePage from "./components/AdminCoursePage";
import AdminTeacherPage from "./components/AdminTeacherPage";
import AdminDepartmentPage from "./components/AdminDepartmentPage";
import TeacherDashboard from "./components/TeacherDashboard";

export default function App() {
  const { token, role } = useAuth(); // Get token and role from context

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        {token ? (
          <>
            {/* Role-based dashboards */}
            {role === "ADMIN" && (
              <Route path="/dashboard" element={<AdminDashboard />} />
            )}
            {role === "STUDENT" && (
              <Route path="/dashboard" element={<StudentDashboard />} />
            )}
            {/* You can add TEACHER dashboard here */}
            {role === "TEACHER" && <Route path="/dashboard" element={<TeacherDashboard />} />}

            {/* Common pages (accessible to logged-in users) */}
            <Route path="/student" element={<AdminStudentPage />} />
            <Route path="/courses" element={<AdminCoursePage />} />
            <Route path="/teacher" element={<AdminTeacherPage />} />
            <Route path="/department" element={<AdminDepartmentPage />} />
            
            

            {/* Catch-all for unknown routes when logged in */}
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </>
        ) : (
          // Redirect any unknown route to login if not logged in
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
}









// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import Dashboard from "./components/Dashboard";
// import StudentPage from "./components/StudentPage";
// import CoursesPage from "./components/CoursePage";
// import TeacherPage from "./components/TeacherPage";
// import DepartmentPage from "./components/DepartmentPage";
// import { useAuth } from "./components/AuthContext";  // import the hook


// export default function App() {
//   const { token } = useAuth();   // get token from context
  

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Navigate to="/login" />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         {token ? (
//           <>
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/student" element={<StudentPage />} />
//             <Route path="/courses" element={<CoursesPage />} />
//             <Route path="/teacher" element={<TeacherPage />} />
//             <Route path="/department" element={<DepartmentPage />} />
//           </>
//         ) : (
//           <Route path="*" element={<Navigate to="/login" />} />
//         )}
//       </Routes>
//     </Router>
//   );
// }




// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import Dashboard from "./components/Dashboard";
// import StudentPage from "./components/StudentPage";
// import CoursesPage from "./components/CoursePage";
// import TeacherPage from "./components/TeacherPage";
// import DepartmentPage from "./components/DepartmentPage";
// import { useAuth } from "./components/AuthContext";  // import the hook


// export default function App() {
//   const { token } = useAuth();   // get token from context

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Navigate to="/login" />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         {token ? (
//           <>
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/student" element={<StudentPage />} />
//             <Route path="/courses" element={<CoursesPage />} />
//             <Route path="/teacher" element={<TeacherPage />} />
//             <Route path="/department" element={<DepartmentPage />} />
//           </>
//         ) : (
//           <Route path="*" element={<Navigate to="/login" />} />
//         )}
//       </Routes>
//     </Router>
//   );
// }












// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import Dashboard from "./components/Dashboard";
// import StudentPage from "./components/StudentPage";
// import CoursesPage from "./components/CoursePage";
// import TeacherPage from "./components/TeacherPage";
// import DepartmentPage from "./components/DepartmentPage";

// export default function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // Persist login state on refresh
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       setIsAuthenticated(true);
//     }
//   }, []);

//   const handleLogin = () => {
//     setIsAuthenticated(true);
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Navigate to="/login" />} />
//         <Route path="/login" element={<Login onLogin={handleLogin} />} />
//         <Route path="/register" element={<Register />} />

//         {isAuthenticated ? (
//           <>
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/student" element={<StudentPage />} />
//             <Route path="/courses" element={<CoursesPage />} />
//             <Route path="/teacher" element={<TeacherPage />} />
//             <Route path="/department" element={<DepartmentPage />} />
//           </>
//         ) : (
//           <Route path="*" element={<Navigate to="/login" />} />
//         )}
//       </Routes>
//     </Router>
//   );
// }









// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import Dashboard from "./components/Dashboard";
// import StudentPage from "./components/StudentPage";
// import CoursesPage from "./components/CoursePage";
// import TeacherPage from "./components/TeacherPage";
// import DepartmentPage from "./components/DepartmentPage";

// export default function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Navigate to="/login" />} />
//         <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
//         <Route path="/register" element={<Register />} />
//         {isAuthenticated ? (
//           <>
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/student" element={<StudentPage />} />
//             <Route path="/courses" element={<CoursesPage />} />
//             <Route path="/teacher" element={<TeacherPage />} />
//             <Route path="/department" element={<DepartmentPage />} />
//           </>
//         ) : (
//           <Route path="*" element={<Navigate to="/login" />} />
//         )}
//       </Routes>
//     </Router>
//   );
// }






// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import Login from "./components/Login";
// import Register from "./components/Register";

// function Dashboard() {
//   return <h2>Welcome to Dashboard!</h2>;
// }

// export default function App() {
//   return (
//     <Router>
//       <nav>
//         <Link to="/login">Login</Link> |{" "}
//         <Link to="/register">Register</Link>
//       </nav>

//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//       </Routes>
//     </Router>
//   );
// }
