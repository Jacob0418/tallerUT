import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import {
  loginAdmin,
  verifyTokenAdmin,
  loginMecanico,
  verifyTokenMecanico,
} from "../auth";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

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
      Cookies.set("token", res.data.token); 
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
      Cookies.set("token", res.data.token); 
      setIsAuthenticatedMecanico(true);
      setMecanico(res.data);
      setError([]);
    } catch (error) {
      handleError(error);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setIsAuthenticatedAdmin(false);
    setIsAuthenticatedMecanico(false);
    setAdmin(null);
    setMecanico(null);
  };

  const handleError = (error) => {
    const errorsToSet = Array.isArray(error.response?.data)
      ? error.response.data
      : [error.response?.data?.message || "Un error ha ocurrido"];
    setError(errorsToSet);
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
        const resAdmin = await verifyTokenAdmin();
        if (resAdmin.data) {
          setIsAuthenticatedAdmin(true);
          setAdmin(resAdmin.data);
        } else {
          setIsAuthenticatedAdmin(false);
          setAdmin(null);
        }
      } catch (error) {
        console.error('Error al verificar el token para admin: ', error);
        setIsAuthenticatedAdmin(false);
        setAdmin(null);
      }

      try {
        const resMecanico = await verifyTokenMecanico();
        if (resMecanico.data) {
          setIsAuthenticatedMecanico(true);
          setMecanico(resMecanico.data);
        } else {
          setIsAuthenticatedMecanico(false);
          setMecanico(null);
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
