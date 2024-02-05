import axios from './axios';

// ADMINS
export const loginAdmin = (admin) => axios.post('/admin/login', admin);
export const logoutAdmin = () => axios.post('/admin/logout');
export const verifyTokenAdmin = () => axios.get('/admin/verify/admin');

// MECANICOS
export const loginMecanico = (mecanico) => axios.post('/mecanico/login', mecanico);
export const logoutMecanico = () => axios.post('/mecanico/logout'); 
export const verifyTokenMecanico = () => axios.get('/admin/verify/mecanico');
