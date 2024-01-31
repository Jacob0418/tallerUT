import axios from './axios';

//ADMINS
export const loginAdmin = (admin) => axios.post('admin/login', admin)
export const logout = () => axios.post('admin/logout', admin)
export const verifyTokenAdmin = () => axios.get('admin/verify/admin')

//MECANICOS
export const loginMecanico = (mecanico) => 
    axios.post('mecanico/login', mecanico);


export const verifyTokenMecanico = () => axios.get('admin/verify/mecanico')