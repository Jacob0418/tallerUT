import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../api/context/AuthContext';

const PrivateRoutesAdmin = () => {
    const { isAuthenticatedAdmin } = useAuth(); 

    return isAuthenticatedAdmin ? <Outlet /> : <Navigate to="/Admin" replace />;
};

export default PrivateRoutesAdmin;