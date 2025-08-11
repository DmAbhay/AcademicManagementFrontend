import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
    role: "STUDENT",
    phone: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await axios.post("http://localhost:8080/api/auth/register", form);
      setMessage("✅ Registered successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500); // go to login after registration
    } catch (error) {
      setMessage("❌ Registration failed!");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="userName"
          placeholder="Username"
          value={form.userName}
          onChange={handleChange}
          required
        /><br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        /><br />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
        /><br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        /><br />
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="ADMIN">ADMIN</option>
          <option value="STUDENT">STUDENT</option>
          <option value="TEACHER">TEACHER</option>
        </select><br />
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}




// import React, { useState } from "react";
// import axios from "axios";

// export default function Register() {
//   const [form, setForm] = useState({
//     userName: "",
//     email: "",
//     password: "",
//     role: "STUDENT",
//     phone: "",
//   });
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:8080/api/auth/register", form);
//       setMessage("✅ Registered successfully!");
//     } catch (error) {
//       setMessage("❌ Registration failed!");
//     }
//   };

//   return (
//     <div style={{ maxWidth: "400px", margin: "auto" }}>
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="userName"
//           placeholder="Username"
//           value={form.userName}
//           onChange={handleChange}
//           required
//         /><br />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           required
//         /><br />
//         <input
//           type="phone"
//           name="phone"
//           placeholder="Phone"
//           value={form.phone}
//           onChange={handleChange}
//           required
//         /><br />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           required
//         /><br />
//         <select name="role" value={form.role} onChange={handleChange}>
//           <option value="ADMIN">ADMIN</option>
//           <option value="STUDENT">STUDENT</option>
//           <option value="TEACHER">TEACHER</option>
//         </select><br />
//         <button type="submit">Register</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// }
