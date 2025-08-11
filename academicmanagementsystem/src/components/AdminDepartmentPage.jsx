import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

export default function DepartmentPage() {
  const { token } = useAuth();

  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    departmentCode: "",
    departmentName: "",
    numberOfBatch: ""
  });
  const [isEditing, setIsEditing] = useState(false);

  const API_URL = "http://localhost:8080/api/admin/department";

  // Fetch departments when component mounts
  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDepartments(res.data);
      console.log(res.data);
    } catch (err) {
      console.error("Error fetching departments:", err);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        await axios.put(API_URL, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(API_URL, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      fetchDepartments();
      resetForm();
    } catch (err) {
      console.error("Error saving department:", err);
    }
  };

  const handleEdit = (dept) => {
    setFormData({
      departmentCode: dept.departmentCode,
      departmentName: dept.departmentName,
      numberOfBatch: dept.numberOfBatch || ""
    });
    setIsEditing(true);
  };

  const handleDelete = async (code) => {
    try {
      await axios.delete(`${API_URL}/${code}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchDepartments();
    } catch (err) {
      console.error("Error deleting department:", err);
    }
  };

  const resetForm = () => {
    setFormData({ departmentCode: "", departmentName: "", numberOfBatch: "" });
    setIsEditing(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Department Management</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="departmentCode"
          placeholder="Department Code"
          value={formData.departmentCode}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="departmentName"
          placeholder="Department Name"
          value={formData.departmentName}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="numberOfBatch"
          placeholder="No of Batches"
          value={formData.numberOfBatch}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {isEditing ? "Update Department" : "Add Department"}
        </button>
        {isEditing && (
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
        )}
      </form>

      {/* Table */}
      <table border="1" cellPadding="10" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>No of Batches</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dept) => (
            <tr key={dept.departmentCode}>
              <td>{dept.departmentCode}</td>
              <td>{dept.departmentName}</td>
              <td>{dept.numberOfBatch}</td>
              <td>
                <button onClick={() => handleEdit(dept)}>Edit</button>
                <button onClick={() => handleDelete(dept.departmentCode)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {departments.length === 0 && (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No departments found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}













// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth } from "./AuthContext"; // import the hook

// export default function DepartmentPage() {
//   const [departments, setDepartments] = useState([]);
//   const [departmentCode, setDepartmentCode] = useState("");
//   const [departmentName, setDepartmentName] = useState("");
//   const [isEditing, setIsEditing] = useState(false);

//   // Base API URL
//   const API_URL = "http://localhost:8080/api/admin/department";

//   const { token } = useAuth();

//   // Load all departments on mount
//   useEffect(() => {
//     fetchDepartments();
//   }, []);

//   const fetchDepartments = async () => {
//     try {
//       const res = await axios.get(API_URL, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setDepartments(res.data);
//     } catch (error) {
//       console.error("Error fetching departments", error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const department = { departmentCode, departmentName };

//     try {
//       if (isEditing) {
//         await axios.put(API_URL, department, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//       } else {
//         await axios.post(API_URL, department, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//       }
//       fetchDepartments();
//       resetForm();
//     } catch (error) {
//       console.error("Error saving department", error);
//     }
//   };

//   const handleEdit = (dept) => {
//     setDepartmentCode(dept.departmentCode);
//     setDepartmentName(dept.departmentName);
//     setIsEditing(true);
//   };

//   const handleDelete = async (code) => {
//     try {
//       await axios.delete(`${API_URL}/${code}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       fetchDepartments();
//     } catch (error) {
//       console.error("Error deleting department", error);
//     }
//   };

//   const resetForm = () => {
//     setDepartmentCode("");
//     setDepartmentName("");
//     setIsEditing(false);
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Department Management</h2>

//       {/* Department Form */}
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Department Code"
//           value={departmentCode}
//           onChange={(e) => setDepartmentCode(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Department Name"
//           value={departmentName}
//           onChange={(e) => setDepartmentName(e.target.value)}
//           required
//         />
//         <button type="submit">{isEditing ? "Update" : "Add"} Department</button>
//         {isEditing && <button onClick={resetForm}>Cancel</button>}
//       </form>

//       {/* Departments Table */}
//       <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
//         <thead>
//           <tr>
//             <th>Code</th>
//             <th>Name</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {departments.map((dept) => (
//             <tr key={dept.departmentCode}>
//               <td>{dept.departmentCode}</td>
//               <td>{dept.departmentName}</td>
//               <td>
//                 <button onClick={() => handleEdit(dept)}>Edit</button>
//                 <button onClick={() => handleDelete(dept.departmentCode)}>
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }










// export default function DepartmentPage() {
//   return <h2>Department Management Page (Demo)</h2>;
// }
