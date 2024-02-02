import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import {
  loginAdmin,
  verifyTokenAdmin,
  loginMecanico,
  verifyTokenMecanico,
} from "../auth";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("No está trabajando con AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [mecanico, setMecanico] = useState(null);
  const [isAuthenticatedMecanico, setIsAuthenticatedMecanico] = useState(false);
  const [isAuthenticatedAdmin, setIsAuthenticatedAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState([]);

  const loginReqAdmin = async (adminData) => {
    try {
      const res = await loginAdmin(adminData);
      Cookies.set("token", res.data.token); // Asumiendo que res.data contiene un token
      setIsAuthenticatedAdmin(true);
      setAdmin(res.data);
      setError([]);
    } catch (error) {
      handleError(error);
    }
  };

  const loginReqMecanico = async (mecanicoData) => {
    try {
      const res = await loginMecanico(mecanicoData);
      Cookies.set("token", res.data.token); // Asumiendo que res.data contiene un token
      setIsAuthenticatedMecanico(true);
      setMecanico(res.data);
      setError([]);
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = (error) => {
    console.log(error);
    const errorsToSet = Array.isArray(error.response?.data)
      ? error.response.data
      : [error.response?.data?.message || "Un error ha ocurrido"];
    setError(errorsToSet);
  };

  const logout = () => {
    Cookies.remove("token");
    setIsAuthenticatedAdmin(false);
    setIsAuthenticatedMecanico(false);
    setAdmin(null);
    setMecanico(null);
  };

  useEffect(() => {
    async function checkLogin() {
      const token = Cookies.get("token");

      if (!token) {
        logout();
        setLoading(false);
        return;
      }

      try {
        const resAdmin = await verifyTokenAdmin(token);
        if (resAdmin.data) {
          setIsAuthenticatedAdmin(true);
          setAdmin(resAdmin.data);
          setIsAuthenticatedMecanico(false);
          setMecanico(null);
        }
      } catch (error) {
        console.error('Error al verificar el token para admin: ', error);
        setIsAuthenticatedAdmin(false);
        setAdmin(null);
      }

      try {
        const resMecanico = await verifyTokenMecanico(token);
        if (resMecanico.data) {
          setIsAuthenticatedMecanico(true);
          setMecanico(resMecanico.data);
          setIsAuthenticatedAdmin(false);
          setAdmin(null);
        }
      } catch (error) {
        console.error('Error al verificar el token para mecánico: ', error);
        setIsAuthenticatedMecanico(false);
        setMecanico(null);
      }

      setLoading(false);
    }

    checkLogin();
  }, []);

  useEffect(() => {
    if (error.length > 0) {
      const timer = setTimeout(() => {
        setError([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <AuthContext.Provider
      value={{
        loginReqAdmin,
        loginReqMecanico,
        error,
        admin,
        isAuthenticatedAdmin,
        isAuthenticatedMecanico,
        mecanico,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

