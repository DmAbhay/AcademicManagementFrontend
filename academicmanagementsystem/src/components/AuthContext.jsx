import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({
    token: null,
    role: null, 
    loggedInEmail: null
  });

  const login = (newToken, newRole, email) => {
    setAuthData({
      token: newToken,
      role: newRole,
      loggedInEmail: email,
    });
  };

  const logout = () => {
    setAuthData({
      token: null,
      role: null,
      loggedInEmail: null,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easier use of AuthContext
export const useAuth = () => useContext(AuthContext);






// import React, { createContext, useState, useContext } from "react";

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(null);

//   const login = (newToken) => {
//     setToken(newToken);
//   };

//   const logout = () => {
//     setToken(null);
//   };

//   return (
//     <AuthContext.Provider value={{ token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook for easier use of AuthContext
// export const useAuth = () => useContext(AuthContext);
