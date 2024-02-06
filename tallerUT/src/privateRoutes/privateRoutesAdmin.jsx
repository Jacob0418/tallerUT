import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../api/context/AuthContext';

const PrivateRoutesAdmin = () => {
    const { isAuthenticatedAdmin } = useAuth(); // Asegúrate de que este es el método correcto para verificar la autenticación

    return isAuthenticatedAdmin ? <Outlet /> : <Navigate to="/Admin" replace />;
};

export default PrivateRoutesAdmin;