import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

export default function StudentDetailsPage() {
  const { token, loggedInEmail } = useAuth();

  const [activeTab, setActiveTab] = useState("personal");

  // -------- Personal Details State --------
  const [personalDetails, setPersonalDetails] = useState(null);
  const [personalFormData, setPersonalFormData] = useState({
    email: loggedInEmail || "",
    relationship: "",
    parents: "",
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    street: "",
    cityCode: "",
    stateCode: "",
    postalCode: "",
    country: ""
  });
  const [isPersonalEditing, setIsPersonalEditing] = useState(false);

  // -------- Academic Details State --------
  const [academicDetails, setAcademicDetails] = useState(null);
  const [academicFormData, setAcademicFormData] = useState({
    email: loggedInEmail || "",
    course: "",
    enrollmentYear: "",
    graduationYear: "",
    gpa: ""
  });


  const [otherDetails, setOtherDetails] = useState({
    email: "",
    enrollmentYear: "",
    graduationYear: "",
    departmentName: "",
    subjectName: "",
    marks: "",
    enrollmentNo: "",
  });



  const [isAcademicEditing, setIsAcademicEditing] = useState(false);

  // Fetch personal details when loggedInEmail changes or on tab switch
  useEffect(() => {
    setPersonalFormData((prev) => ({ ...prev, email: loggedInEmail || "" }));
    if (activeTab === "personal") fetchPersonalDetailsByEmail();
  }, [loggedInEmail, activeTab]);

  // Fetch academic details when loggedInEmail changes or on tab switch
  useEffect(() => {
    setAcademicFormData((prev) => ({ ...prev, email: loggedInEmail || "" }));
    if (activeTab === "academic") fetchAcademicDetailsByEmail();
  }, [loggedInEmail, activeTab]);

  // Fetch Personal Details
  const fetchPersonalDetailsByEmail = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/student/personal-details/${loggedInEmail}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPersonalDetails(res.data && Object.keys(res.data).length > 0 ? res.data : null);
    } catch (err) {
      console.error("Error fetching personal details:", err);
      setPersonalDetails(null);
    }
    setIsPersonalEditing(false);
  };

  // Fetch Academic Details (stub API endpoint, replace with real)
  const fetchAcademicDetailsByEmail = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/student/academic-details/${loggedInEmail}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAcademicDetails(res.data && Object.keys(res.data).length > 0 ? res.data : null);
    } catch (err) {
      console.error("Error fetching academic details:", err);
      setAcademicDetails(null);
    }
    setIsAcademicEditing(false);
  };

  // Personal form handlers
  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setPersonalFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handlePersonalSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isPersonalEditing) {
        await axios.put(
          "http://localhost:8080/api/student/personal-details",
          personalFormData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          "http://localhost:8080/api/student/personal-details",
          personalFormData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      fetchPersonalDetailsByEmail();
      resetPersonalForm();
    } catch (err) {
      console.error("Error saving personal details:", err);
    }
  };
  const handlePersonalEdit = () => {
    setPersonalFormData({ ...personalDetails, email: loggedInEmail || "" });
    setIsPersonalEditing(true);
  };
  const handlePersonalDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this personal record?")) return;
    try {
      await axios.delete(
        `http://localhost:8080/api/student/personal-details/${loggedInEmail}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPersonalDetails(null);
    } catch (err) {
      console.error("Error deleting personal details:", err);
    }
  };
  const resetPersonalForm = () => {
    setPersonalFormData({
      email: loggedInEmail || "",
      relationship: "",
      parents: "",
      firstName: "",
      lastName: "",
      dob: "",
      gender: "",
      street: "",
      cityCode: "",
      stateCode: "",
      postalCode: "",
      country: ""
    });
    setIsPersonalEditing(false);
  };

  // Academic form handlers (similar to personal, stub logic)
  const handleAcademicChange = (e) => {
    const { name, value } = e.target;
    setAcademicFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleAcademicSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isAcademicEditing) {
        await axios.put(
          "http://localhost:8080/api/student/academic-details",
          academicFormData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          "http://localhost:8080/api/student/academic-details",
          academicFormData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      fetchAcademicDetailsByEmail();
      resetAcademicForm();
    } catch (err) {
      console.error("Error saving academic details:", err);
    }
  };
  const handleAcademicEdit = () => {
    setAcademicFormData({ ...academicDetails, email: loggedInEmail || "" });
    setIsAcademicEditing(true);
  };
  const handleAcademicDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this academic record?")) return;
    try {
      await axios.delete(
        `http://localhost:8080/api/student/academic-details/${loggedInEmail}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAcademicDetails(null);
    } catch (err) {
      console.error("Error deleting academic details:", err);
    }
  };
  const resetAcademicForm = () => {
    setAcademicFormData({
      email: loggedInEmail || "",
      course: "",
      enrollmentYear: "",
      graduationYear: "",
      gpa: ""
    });
    setIsAcademicEditing(false);
  };

  // Tab buttons styling
  const tabBtnStyle = (tab) => ({
    padding: "10px 20px",
    cursor: "pointer",
    backgroundColor: activeTab === tab ? "#3498db" : "#eee",
    color: activeTab === tab ? "white" : "#555",
    border: "none",
    borderRadius: "5px",
    marginRight: "10px",
    fontWeight: activeTab === tab ? "bold" : "normal"
  });





  //=============================================================================================================================
  const handleOtherDetailsChange = (e) => {
  const { name, value } = e.target;
  setOtherDetails((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const handleOtherDetailsSubmit = (e) => {
  e.preventDefault();
  // handle saving otherDetails data here
};

const resetOtherDetailsForm = () => {
  // reset otherDetails form to initial state or empty
  setOtherDetails({
    email: "",
    enrollmentYear: "",
    graduationYear: "",
    departmentName: "",
    subjectName: "",
    marks: "",
    enrollmentNo: "",
  });
};

const handleOtherDetailsEdit = () => {
  // toggle edit mode for otherDetails
  setIsAcademicEditing(true); // or rename isAcademicEditing to isOtherDetailsEditing if you want clarity
};

const handleOtherDetailsDelete = () => {
  // handle delete otherDetails
};

//=============================================================================================================================

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>🎓 Student Details Dashboard</h1>

      {/* Tabs */}
      <div style={{ marginBottom: "20px" }}>
        <button style={tabBtnStyle("personal")} onClick={() => setActiveTab("personal")}>
          Personal Details
        </button>
        <button style={tabBtnStyle("academic")} onClick={() => setActiveTab("academic")}>
          Academic Details
        </button>

        <button style={tabBtnStyle("other")} onClick={() => setActiveTab("other")}>
          Other
        </button>

        <button style={tabBtnStyle("otherDetail")} onClick={() => setActiveTab("otherDetail")}>
          Other Details
        </button>
        {/* Add more tabs here like Other Details if needed */}
      </div>

      {/* Tab Contents */}
      {activeTab === "personal" && (
        <>
          {(!personalDetails || isPersonalEditing) && (
            <div style={styles.card}>
              <h2 style={styles.subHeader}>
                {isPersonalEditing ? "✏️ Edit Personal Details" : "➕ Add Personal Details"}
              </h2>
              <form onSubmit={handlePersonalSubmit} style={styles.form}>
                {Object.keys(personalFormData)
                  .filter((key) => key !== "id")
                  .map((key) => (
                    <div key={key} style={styles.inputGroup}>
                      <label style={styles.label}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}:
                      </label>
                      <input
                        type={
                          key === "dob"
                            ? "date"
                            : key === "email"
                            ? "email"
                            : "text"
                        }
                        name={key}
                        value={personalFormData[key]}
                        onChange={handlePersonalChange}
                        disabled={key === "email"}
                        style={styles.input}
                      />
                    </div>
                  ))}
                <div style={styles.buttonGroup}>
                  <button type="submit" style={styles.primaryBtn}>
                    {isPersonalEditing ? "Update" : "Save"}
                  </button>
                  {isPersonalEditing && (
                    <button
                      type="button"
                      onClick={resetPersonalForm}
                      style={styles.secondaryBtn}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}

          {personalDetails && !isPersonalEditing && (
            <div style={styles.card}>
              <h2 style={styles.subHeader}>📋 Personal Details Summary</h2>
              <div style={styles.summaryGrid}>
                {Object.entries(personalDetails)
                  .filter(([key]) => key !== "id")
                  .map(([key, value]) => (
                    <div key={key} style={styles.summaryItem}>
                      <span style={styles.summaryLabel}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}:
                      </span>
                      <span style={styles.summaryValue}>{value}</span>
                    </div>
                  ))}
              </div>
              <div style={styles.buttonGroup}>
                <button onClick={handlePersonalEdit} style={styles.primaryBtn}>
                  Edit
                </button>
                <button onClick={handlePersonalDelete} style={styles.dangerBtn}>
                  Delete
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {activeTab === "academic" && (
        <>
          {(!academicDetails || isAcademicEditing) && (
            <div style={styles.card}>
              <h2 style={styles.subHeader}>
                {isAcademicEditing ? "✏️ Edit Academic Details" : "➕ Add Academic Details"}
              </h2>
              <form onSubmit={handleAcademicSubmit} style={styles.form}>
                {Object.keys(academicFormData)
                  .filter((key) => key !== "id")
                  .map((key) => (
                    <div key={key} style={styles.inputGroup}>
                      <label style={styles.label}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}:
                      </label>
                      <input
                        type={key === "enrollmentYear" || key === "graduationYear" ? "number" : "text"}
                        name={key}
                        value={academicFormData[key]}
                        onChange={handleAcademicChange}
                        disabled={key === "email"}
                        style={styles.input}
                      />
                    </div>
                  ))}
                <div style={styles.buttonGroup}>
                  <button type="submit" style={styles.primaryBtn}>
                    {isAcademicEditing ? "Update" : "Save"}
                  </button>
                  {isAcademicEditing && (
                    <button
                      type="button"
                      onClick={resetAcademicForm}
                      style={styles.secondaryBtn}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}

          {academicDetails && !isAcademicEditing && (
            <div style={styles.card}>
              <h2 style={styles.subHeader}>📋 Academic Details Summary</h2>
              <div style={styles.summaryGrid}>
                {Object.entries(academicDetails)
                  .filter(([key]) => key !== "id")
                  .map(([key, value]) => (
                    <div key={key} style={styles.summaryItem}>
                      <span style={styles.summaryLabel}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}:
                      </span>
                      <span style={styles.summaryValue}>{value}</span>
                    </div>
                  ))}
              </div>
              <div style={styles.buttonGroup}>
                <button onClick={handleAcademicEdit} style={styles.primaryBtn}>
                  Edit
                </button>
                <button onClick={handleAcademicDelete} style={styles.dangerBtn}>
                  Delete
                </button>
              </div>
            </div>
          )}
        </>
      )}

    {/*=====================================================OTHER TABS===================================================*/}

      {activeTab === "other" && (
        <>
          {(!academicDetails || isAcademicEditing) && (
            <div style={styles.card}>
              <h2 style={styles.subHeader}>
                {isAcademicEditing ? "✏️ Edit Academic Details" : "➕ Add Academic Details"}
              </h2>
              <form onSubmit={handleAcademicSubmit} style={styles.form}>
                {Object.keys(academicFormData)
                  .filter((key) => key !== "id")
                  .map((key) => (
                    <div key={key} style={styles.inputGroup}>
                      <label style={styles.label}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}:
                      </label>
                      <input
                        type={key === "enrollmentYear" || key === "graduationYear" ? "number" : "text"}
                        name={key}
                        value={academicFormData[key]}
                        onChange={handleAcademicChange}
                        disabled={key === "email"}
                        style={styles.input}
                      />
                    </div>
                  ))}
                <div style={styles.buttonGroup}>
                  <button type="submit" style={styles.primaryBtn}>
                    {isAcademicEditing ? "Update" : "Save"}
                  </button>
                  {isAcademicEditing && (
                    <button
                      type="button"
                      onClick={resetAcademicForm}
                      style={styles.secondaryBtn}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}

          {academicDetails && !isAcademicEditing && (
            <div style={styles.card}>
              <h2 style={styles.subHeader}>📋 Academic Details Summary</h2>
              <div style={styles.summaryGrid}>
                {Object.entries(academicDetails)
                  .filter(([key]) => key !== "id")
                  .map(([key, value]) => (
                    <div key={key} style={styles.summaryItem}>
                      <span style={styles.summaryLabel}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}:
                      </span>
                      <span style={styles.summaryValue}>{value}</span>
                    </div>
                  ))}
              </div>
              <div style={styles.buttonGroup}>
                <button onClick={handleAcademicEdit} style={styles.primaryBtn}>
                  Edit
                </button>
                <button onClick={handleAcademicDelete} style={styles.dangerBtn}>
                  Delete
                </button>
              </div>
            </div>
          )}
        </>
      )}



      {/* =========================================================================================================== */}
      {activeTab === "otherDetail" && (
        <>
            {(!academicDetails || isAcademicEditing) && (
            <div style={styles.card}>
                <h2 style={styles.subHeader}>
                {isAcademicEditing ? "✏️ Edit Other Details" : "➕ Add Other Details"}
                </h2>
                <form onSubmit={handleOtherDetailsSubmit} style={styles.form}>
                {Object.keys(otherDetails)
                    .filter((key) => key !== "id")
                    .map((key) => (
                    <div key={key} style={styles.inputGroup}>
                        <label style={styles.label}>
                        {key === "departmentName"
                            ? "Name of Department"
                            : key === "subjectName"
                            ? "Subject's Name"
                            : key === "marks"
                            ? "Marks"
                            : key === "enrollmentNo"
                            ? "Enrollment No"
                            : key.charAt(0).toUpperCase() + key.slice(1)}:
                        </label>
                        <input
                        type={
                            key === "enrollmentYear" || key === "graduationYear" || key === "marks"
                            ? "number"
                            : "text"
                        }
                        name={key}
                        value={otherDetails[key]}
                        onChange={handleOtherDetailsChange}
                        disabled={key === "email"}
                        style={styles.input}
                        />
                    </div>
                    ))}
                <div style={styles.buttonGroup}>
                    <button type="submit" style={styles.primaryBtn}>
                    {isAcademicEditing ? "Update" : "Save"}
                    </button>
                    {isAcademicEditing && (
                    <button
                        type="button"
                        onClick={resetOtherDetailsForm}
                        style={styles.secondaryBtn}
                    >
                        Cancel
                    </button>
                    )}
                </div>
                </form>
            </div>
            )}

            {academicDetails && !isAcademicEditing && (
            <div style={styles.card}>
                <h2 style={styles.subHeader}>📋 Other Details Summary</h2>
                <div style={styles.summaryGrid}>
                {Object.entries(academicDetails)
                    .filter(([key]) => key !== "id")
                    .map(([key, value]) => (
                    <div key={key} style={styles.summaryItem}>
                        <span style={styles.summaryLabel}>
                        {key === "departmentName"
                            ? "Name of Department"
                            : key === "subjectName"
                            ? "Subject's Name"
                            : key === "marks"
                            ? "Marks"
                            : key === "enrollmentNo"
                            ? "Enrollment No"
                            : key.charAt(0).toUpperCase() + key.slice(1)}:
                        </span>
                        <span style={styles.summaryValue}>{value}</span>
                    </div>
                    ))}
                </div>
                <div style={styles.buttonGroup}>
                <button onClick={handleOtherDetailsEdit} style={styles.primaryBtn}>
                    Edit
                </button>
                <button onClick={handleOtherDetailsDelete} style={styles.dangerBtn}>
                    Delete
                </button>
                </div>
            </div>
            )}
        </>
        )}

    </div>
  );
}

const styles = {
  container: {
    padding: "5px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f4f6f8",
    minHeight: "80vh"
  },
  header: {
    textAlign: "center",
    color: "#2c3e50",
    marginBottom: "20px"
  },
  subHeader: {
    color: "#34495e",
    marginBottom: "15px",
    borderBottom: "2px solid #eee",
    paddingBottom: "5px"
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "20px",
    marginBottom: "20px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
  },
  form: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "15px"
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column"
  },
  label: {
    fontWeight: "bold",
    marginBottom: "5px",
    color: "#555"
  },
  input: {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },
  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px"
  },
  summaryItem: {
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    padding: "12px 15px",
    boxShadow: "inset 0 0 5px rgba(0,0,0,0.03)"
  },
  summaryLabel: {
    fontWeight: "600",
    color: "#34495e",
    display: "block",
    marginBottom: "6px"
  },
  summaryValue: {
    color: "#2c3e50",
    fontSize: "1rem"
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
    marginTop: "20px"
  },
  primaryBtn: {
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer"
  },
  secondaryBtn: {
    backgroundColor: "#95a5a6",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer"
  },
  dangerBtn: {
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer"
  }
};










// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth } from "./AuthContext";

// export default function PersonalDetailsPage() {
//   const { token, loggedInEmail } = useAuth();
//   const [personalDetails, setPersonalDetails] = useState(null);

//   const [formData, setFormData] = useState({
//     email: loggedInEmail || "",
//     relationship: "",
//     parents: "",
//     firstName: "",
//     lastName: "",
//     dob: "",
//     gender: "",
//     street: "",
//     cityCode: "",
//     stateCode: "",
//     postalCode: "",
//     country: ""
//   });

//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     setFormData((prev) => ({ ...prev, email: loggedInEmail || "" }));
//     fetchPersonalDetailsByEmail();
//   }, [loggedInEmail]);

//   const fetchPersonalDetailsByEmail = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:8080/api/student/personal-details/${loggedInEmail}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setPersonalDetails(res.data && Object.keys(res.data).length > 0 ? res.data : null);
//     } catch (err) {
//       console.error("Error fetching personal details:", err);
//       setPersonalDetails(null);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (isEditing) {
//         await axios.put(
//           "http://localhost:8080/api/student/personal-details",
//           formData,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//       } else {
//         await axios.post(
//           "http://localhost:8080/api/student/personal-details",
//           formData,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//       }
//       fetchPersonalDetailsByEmail();
//       resetForm();
//     } catch (err) {
//       console.error("Error saving personal details:", err);
//     }
//   };

//   const handleEdit = () => {
//     setFormData({ ...personalDetails, email: loggedInEmail || "" });
//     setIsEditing(true);
//   };

//   const handleDelete = async () => {
//     if (!window.confirm("Are you sure you want to delete this record?")) return;
//     try {
//       await axios.delete(
//         `http://localhost:8080/api/student/personal-details/${loggedInEmail}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setPersonalDetails(null);
//     } catch (err) {
//       console.error("Error deleting personal details:", err);
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       email: loggedInEmail || "",
//       relationship: "",
//       parents: "",
//       firstName: "",
//       lastName: "",
//       dob: "",
//       gender: "",
//       street: "",
//       cityCode: "",
//       stateCode: "",
//       postalCode: "",
//       country: ""
//     });
//     setIsEditing(false);
//   };

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.header}>🎓 My Personal Details</h1>

//       {(!personalDetails || isEditing) && (
//         <div style={styles.card}>
//           <h2 style={styles.subHeader}>
//             {isEditing ? "✏️ Edit Personal Details" : "➕ Add Personal Details"}
//           </h2>
//           <form onSubmit={handleSubmit} style={styles.form}>
//             {Object.keys(formData)
//               .filter((key) => key !== "id")
//               .map((key) => (
//                 <div key={key} style={styles.inputGroup}>
//                   <label style={styles.label}>
//                     {key.charAt(0).toUpperCase() + key.slice(1)}:
//                   </label>
//                   <input
//                     type={
//                       key === "dob"
//                         ? "date"
//                         : key === "email"
//                         ? "email"
//                         : "text"
//                     }
//                     name={key}
//                     value={formData[key]}
//                     onChange={handleChange}
//                     disabled={key === "email"}
//                     style={styles.input}
//                   />
//                 </div>
//               ))}
//             <div style={styles.buttonGroup}>
//               <button type="submit" style={styles.primaryBtn}>
//                 {isEditing ? "Update" : "Save"}
//               </button>
//               {isEditing && (
//                 <button
//                   type="button"
//                   onClick={resetForm}
//                   style={styles.secondaryBtn}
//                 >
//                   Cancel
//                 </button>
//               )}
//             </div>
//           </form>
//         </div>
//       )}

//       {personalDetails && !isEditing && (
//         <div style={styles.card}>
//           <h2 style={styles.subHeader}>📋 Personal Details Summary</h2>
//           <div style={styles.summaryGrid}>
//             {Object.entries(personalDetails)
//               .filter(([key]) => key !== "id")
//               .map(([key, value]) => (
//                 <div key={key} style={styles.summaryItem}>
//                   <span style={styles.summaryLabel}>
//                     {key.charAt(0).toUpperCase() + key.slice(1)}:
//                   </span>
//                   <span style={styles.summaryValue}>{value}</span>
//                 </div>
//               ))}
//           </div>
//           <div style={styles.buttonGroup}>
//             <button onClick={handleEdit} style={styles.primaryBtn}>
//               Edit
//             </button>
//             <button onClick={handleDelete} style={styles.dangerBtn}>
//               Delete
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// const styles = {
//   container: {
//     padding: "5px",
//     fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//     backgroundColor: "#f4f6f8",
//     minHeight: "80vh"
//   },
//   header: {
//     textAlign: "center",
//     color: "#2c3e50",
//     marginBottom: "20px"
//   },
//   subHeader: {
//     color: "#34495e",
//     marginBottom: "15px",
//     borderBottom: "2px solid #eee",
//     paddingBottom: "5px"
//   },
//   card: {
//     backgroundColor: "#fff",
//     borderRadius: "10px",
//     padding: "20px",
//     marginBottom: "20px",
//     boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
//   },
//   form: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//     gap: "15px"
//   },
//   inputGroup: {
//     display: "flex",
//     flexDirection: "column"
//   },
//   label: {
//     fontWeight: "bold",
//     marginBottom: "5px",
//     color: "#555"
//   },
//   input: {
//     padding: "8px",
//     borderRadius: "6px",
//     border: "1px solid #ccc"
//   },
//   summaryGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//     gap: "20px"
//   },
//   summaryItem: {
//     backgroundColor: "#f9f9f9",
//     borderRadius: "8px",
//     padding: "12px 15px",
//     boxShadow: "inset 0 0 5px rgba(0,0,0,0.03)"
//   },
//   summaryLabel: {
//     fontWeight: "600",
//     color: "#34495e",
//     display: "block",
//     marginBottom: "6px"
//   },
//   summaryValue: {
//     color: "#2c3e50",
//     fontSize: "1rem"
//   },
//   buttonGroup: {
//     display: "flex",
//     gap: "10px",
//     marginTop: "20px"
//   },
//   primaryBtn: {
//     backgroundColor: "#3498db",
//     color: "white",
//     border: "none",
//     padding: "8px 14px",
//     borderRadius: "6px",
//     cursor: "pointer"
//   },
//   secondaryBtn: {
//     backgroundColor: "#95a5a6",
//     color: "white",
//     border: "none",
//     padding: "8px 14px",
//     borderRadius: "6px",
//     cursor: "pointer"
//   },
//   dangerBtn: {
//     backgroundColor: "#e74c3c",
//     color: "white",
//     border: "none",
//     padding: "8px 14px",
//     borderRadius: "6px",
//     cursor: "pointer"
//   }
// };















// import React from "react";
// import { useNavigate } from "react-router-dom";

// export default function StudentDashboard() {
  
//   return (
//     <div style={{ textAlign: "center", padding: "40px" }}>
//       <h1 style={{ fontSize: "36px", marginBottom: "40px" }}>Student Dashboard</h1>
      
//     </div>
//   );
// }
