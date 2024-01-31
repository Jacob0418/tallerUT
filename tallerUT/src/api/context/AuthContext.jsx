import Cookies from "js-cookies";
import { createContext, useState, useContext, useEffect } from "react";
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

  const loginReqAdmin = async (admin) => {
    try {
      const res = await loginAdmin(admin);
      setIsAuthenticatedAdmin(true);
      setAdmin(res.data);
    } catch (error) {
      console.log(error);
      const errorsToSet = Array.isArray(error.response.data)
        ? error.response.data
        : [error.response.data.message];

      setError(errorsToSet);
    }
  };

  const loginReqMecanico = async (mecanico) => {
    try {
      const res = await loginMecanico(mecanico);
      setIsAuthenticatedMecanico(true);
      setMecanico(res.data);
    } catch (error) {
      console.log(error);
      const errorsToSet = Array.isArray(error.response.data)
        ? error.response.data
        : [error.response.data.message];

      setError(errorsToSet);
    }
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
      const cookies = Cookies.get();

      if (!cookies.token) {
        setIsAuthenticatedAdmin(false);
        setIsAuthenticatedMecanico(false);
        setAdmin(null);
        setMecanico(null);
        setLoading(false);
        return;
      }

      try {
        const resAdmin = await verifyTokenAdmin(cookies.token);
        if (resAdmin.data) {
            setIsAuthenticatedAdmin(true);
            setAdmin(resAdmin.data);
            setIsAuthenticatedMecanico(false);//Asegura desactivar la autenticación
            setMecanico(null);//Setea la info
        } else {
            setIsAuthenticatedAdmin(false);
            setAdmin(null);
        }
      } catch (error) {
        console.error('Error al verificar el token: ', error)
        setIsAuthenticatedAdmin(false);
        setAdmin(null);
      }

      try {
        const resMecanico = await verifyTokenMecanico(cookies.token);
        if (resMecanico.data) {
            setIsAuthenticatedMecanico(true);
            setMecanico(resAdmin.data);
            setIsAuthenticatedAdmin(false);//Asegura desactivar la autenticación
            setAdmin(null);//Setea la info
        } else {
            setIsAuthenticatedMecanico(false);
            setMecanico(null);
        }
      } catch (error) {
        console.error('Error al verificar el token: ', error)
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
    ></AuthContext.Provider>
  )

};
