import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext"; // import the hook

export default function AdminStudentPage() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    enrollmentNo: "",
    studentName: "",
    email: "",
    phone: "",
    departmentCode: "",
    courseCode: "",
    academicYear: ""
  });
  const [isEditing, setIsEditing] = useState(false);

  const API_URL = "http://localhost:8080/api/admin/student";

  const { token } = useAuth();

  // Load students on mount
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStudents(res.data);
    } catch (err) {
      console.error("Error fetching students", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(API_URL, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(API_URL, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      fetchStudents();
      resetForm();
    } catch (err) {
      console.error("Error saving student", err);
    }
  };

  const handleEdit = (student) => {
    setForm(student);
    setIsEditing(true);
  };

  const handleDelete = async (enrollmentNo) => {
    try {
      await axios.delete(`${API_URL}/${enrollmentNo}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchStudents();
    } catch (err) {
      console.error("Error deleting student", err);
    }
  };

  const resetForm = () => {
    setForm({
      enrollmentNo: "",
      studentName: "",
      email: "",
      phone: "",
      departmentCode: "",
      courseCode: "",
      academicYear: ""
    });
    setIsEditing(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Student Management</h2>

      {/* Student Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="enrollmentNo"
          placeholder="Enrollment No"
          value={form.enrollmentNo}
          onChange={handleChange}
          required
          disabled={isEditing} // Prevent changing primary key on update
        />
        <input
          type="text"
          name="studentName"
          placeholder="Student Name"
          value={form.studentName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="departmentCode"
          placeholder="Department Code"
          value={form.departmentCode}
          onChange={handleChange}
        />
        <input
          type="text"
          name="courseCode"
          placeholder="Course Code"
          value={form.courseCode}
          onChange={handleChange}
        />
        <input
          type="number"
          name="academicYear"
          placeholder="Academic Year"
          value={form.academicYear}
          onChange={handleChange}
        />

        <button type="submit">{isEditing ? "Update" : "Add"} Student</button>
        {isEditing && <button onClick={resetForm}>Cancel</button>}
      </form>

      {/* Students Table */}
      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Enrollment No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Dept Code</th>
            <th>Course Code</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.enrollmentNo}>
              <td>{s.enrollmentNo}</td>
              <td>{s.studentName}</td>
              <td>{s.email}</td>
              <td>{s.phone}</td>
              <td>{s.departmentCode}</td>
              <td>{s.courseCode}</td>
              <td>{s.academicYear}</td>
              <td>
                <button onClick={() => handleEdit(s)}>Edit</button>
                <button onClick={() => handleDelete(s.enrollmentNo)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}













// import React from "react";

// export default function StudentPage() {
//   return <h2>Student Management Page (Demo)</h2>;
// }
