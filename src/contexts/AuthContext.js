import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    email: null,
  });

  const login = (token, email) => {
    setAuthState({ token, email });
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
  };

  const logout = () => {
    setAuthState({ token: null, email: null });
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);