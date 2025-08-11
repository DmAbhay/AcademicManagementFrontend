import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext"; // import the hook

export default function CoursePage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { token } = useAuth();

  const [newCourse, setNewCourse] = useState({
    courseCode: "",
    courseName: "",
    description: "",
    numberOfBatch: "",
    departmentCode: "",
  });

  const [editCourseCode, setEditCourseCode] = useState(null);
  const [editCourseData, setEditCourseData] = useState({
    courseName: "",
    description: "",
    numberOfBatch: "",
    departmentCode: "",
  });

  // Fetch all courses
  useEffect(() => {
    fetchCourses();
  }, []);

  async function fetchCourses() {

    console.log(`token is ${token}`);
    


    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8080/api/admin/course", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(res.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  }

  const handleNewChange = (e) => {
    setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditCourseData({ ...editCourseData, [e.target.name]: e.target.value });
  };

  // Add new course
  async function addCourse(e) {
    e.preventDefault();
    try {
      // Convert numberOfBatch to integer if needed
      const payload = {
        ...newCourse,
        numberOfBatch: newCourse.numberOfBatch ? Number(newCourse.numberOfBatch) : null,
      };

      await axios.post("http://localhost:8080/api/admin/course", payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setNewCourse({
        courseCode: "",
        courseName: "",
        description: "",
        numberOfBatch: "",
        departmentCode: "",
      });
      fetchCourses();
      setError("");
    } catch (err) {
      setError("Failed to add course");
    }
  }

  // Start editing course
  const startEdit = (course) => {
    setEditCourseCode(course.courseCode);
    setEditCourseData({
      courseName: course.courseName,
      description: course.description,
      numberOfBatch: course.numberOfBatch ?? course.NOfBatches ?? "",
      departmentCode: course.departmentCode,
    });
  };

  const cancelEdit = () => {
    setEditCourseCode(null);
    setEditCourseData({
      courseName: "",
      description: "",
      numberOfBatch: "",
      departmentCode: "",
    });
  };

  // Save edited course
  async function saveEdit(courseCode) {
    try {
      const payload = {
        courseCode,
        courseName: editCourseData.courseName,
        description: editCourseData.description,
        numberOfBatch: editCourseData.numberOfBatch
          ? Number(editCourseData.numberOfBatch)
          : null,
        departmentCode: editCourseData.departmentCode,
      };

      console.log(localStorage.getItem("token"));
      

      await axios.put("http://localhost:8080/api/admin/course", payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setEditCourseCode(null);
      setEditCourseData({
        courseName: "",
        description: "",
        numberOfBatch: "",
        departmentCode: "",
      });
      fetchCourses();
      setError("");
    } catch (err) {
      setError("Failed to update course");
    }
  }

  // Delete course
  async function deleteCourse(courseCode) {
    if (!window.confirm("Are you sure to delete this course?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/admin/course/${courseCode}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchCourses();
      setError("");
    } catch (err) {
      setError("Failed to delete course");
    }
  }

  return (
    <div style={{ maxWidth: 900, margin: "auto", padding: 20 }}>
      <h1>Subject Management</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Loading...</p>}

      <form onSubmit={addCourse} style={{ marginBottom: 30 }}>
        <h3>Add New Course</h3>
        <input
          type="text"
          name="courseCode"
          placeholder="Course Code"
          value={newCourse.courseCode}
          onChange={handleNewChange}
          required
          style={{ marginRight: 10 }}
        />
        <input
          type="text"
          name="courseName"
          placeholder="Course Name"
          value={newCourse.courseName}
          onChange={handleNewChange}
          required
          style={{ marginRight: 10 }}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newCourse.description}
          onChange={handleNewChange}
          style={{ marginRight: 10 }}
        />
        <input
          type="number"
          name="numberOfBatch"
          placeholder="Number of Batches"
          value={newCourse.numberOfBatch}
          onChange={handleNewChange}
          style={{ marginRight: 10, width: 150 }}
        />
        <input
          type="text"
          name="departmentCode"
          placeholder="Department Code"
          value={newCourse.departmentCode}
          onChange={handleNewChange}
          required
          style={{ marginRight: 10, width: 150 }}
        />
        <button type="submit">Add Course</button>
      </form>

      <table border="1" cellPadding="10" cellSpacing="0" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Course Name</th>
            <th>Description</th>
            <th>Number of Batches</th>
            <th>Department Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.length === 0 && (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No courses found.
              </td>
            </tr>
          )}

          {courses.map((course) => (
            <tr key={course.courseCode}>
              <td>{course.courseCode}</td>
              <td>
                {editCourseCode === course.courseCode ? (
                  <input
                    type="text"
                    name="courseName"
                    value={editCourseData.courseName}
                    onChange={handleEditChange}
                  />
                ) : (
                  course.courseName
                )}
              </td>
              <td>
                {editCourseCode === course.courseCode ? (
                  <input
                    type="text"
                    name="description"
                    value={editCourseData.description}
                    onChange={handleEditChange}
                  />
                ) : (
                  course.description
                )}
              </td>
              <td>
                {editCourseCode === course.courseCode ? (
                  <input
                    type="number"
                    name="numberOfBatch"
                    value={editCourseData.numberOfBatch}
                    onChange={handleEditChange}
                    style={{ width: "80px" }}
                  />
                ) : (
                  course.numberOfBatch ?? course.NOfBatches ?? "-"
                )}
              </td>
              <td>
                {editCourseCode === course.courseCode ? (
                  <input
                    type="text"
                    name="departmentCode"
                    value={editCourseData.departmentCode}
                    onChange={handleEditChange}
                    style={{ width: "100px" }}
                  />
                ) : (
                  course.departmentCode
                )}
              </td>
              <td>
                {editCourseCode === course.courseCode ? (
                  <>
                    <button onClick={() => saveEdit(course.courseCode)}>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEdit(course)}>Edit</button>
                    <button onClick={() => deleteCourse(course.courseCode)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}






// import React from "react";

// export default function CoursesPage() {
//   return <h2>Courses Management Page (Demo)</h2>;
// }
