import React, { createContext, useState, useContext, useEffect } from "react";
import { loginUser } from "../services/api/auth";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("usuario");

    if (storedToken && storedUser) {
      setToken(storedToken);
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("usuario");
      }
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await loginUser(email, password);

      if (response?.token && response?.usuario) {
        setUser(response.usuario);
        setToken(response.token);

        localStorage.setItem("token", response.token);
        localStorage.setItem("usuario", JSON.stringify(response.usuario));
      }

      return response;
    } catch (error) {
      console.error("Error en login:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
  };

  const value = {
    user,
    token,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Export default por compatibilidad con algunos bundlers y HMR
export default AuthContext;
