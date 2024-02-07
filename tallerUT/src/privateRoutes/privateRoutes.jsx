// Importaciones necesarias
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../api/context/AuthContext';

const PrivateRoutes = () => {
  const { isAuthenticatedMecanico } = useAuth(); 

  return isAuthenticatedMecanico ? <Outlet /> : <Navigate to="/LogIn"  replace/>;
};

export default PrivateRoutes;
