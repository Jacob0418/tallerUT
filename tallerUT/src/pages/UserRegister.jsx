import React, { useEffect, useState} from "react";
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

function UserRegister() {

  const navigate = useNavigate();
  
  const [register, setRegister] = useState({
    nombre: '',
    apellido: '',
    email: '',
    no_telefonico: '',
    nomina: '',
    password: '',
    confirmPassword: ''
});

  const handleInputChange = (event) => {
    setRegister({
      ...register,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(register.password !== register.confirmPassword) {
      console.error('Las contraseñas no coinciden');
      return;
    }

    axios.post('/mecanico', {
      nombre: register.nombre,
      apellido: register.apellido,
      email: register.email,
      no_telefonico: register.no_telefonico,
      nomina: register.nomina,
      password: register.password
    })
    .then(response => {
      console.log('Registro exitoso: ', response.data);
      navigate('/login');
    })
    .catch(error => {
      console.error('Error al registrar: ', error)
    });
  };

  return (
    <>
      <div className="mt-8 mx-4"> 
        <div className="flex items-center justify-center h-screen">
          <div className="max-w-2xl p-12 bg-white rounded-md shadow-md border border-red-500">
            <h2 className="text-2xl text-red-500 font-bold mb-4">Registro de Usuario</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Nombre:</label>
                <input type="text" name="nombre" className="mt-1 p-2 w-full border rounded-[7px_7px_7px_7px]" value={register.nombre} onChange={handleInputChange} />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Apellido:</label>
                <input type="text" name='apellido' className="mt-1 p-2 w-full border rounded-[7px_7px_7px_7px]" value={register.apellido} onChange={handleInputChange} />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Correo:</label>
                <input type="email" name='email' className="mt-1 p-2 w-full border rounded-[7px_7px_7px_7px]" value={register.email} onChange={handleInputChange} />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Número Telefónico:</label>
                <input type="text" name="no_telefonico" className="mt-1 p-2 w-full border rounded-[7px_7px_7px_7px]" value={register.no_telefonico} onChange={handleInputChange} />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Número de Nómina:</label>
                <input type="text" name="nomina" className="mt-1 p-2 w-full border rounded-[7px_7px_7px_7px]" value={register.nomina} onChange={handleInputChange}/>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Contraseña:</label>
                <input type="password" name="password" className="mt-1 p-2 w-full border rounded-[7px_7px_7px_7px]" value={register.password} onChange={handleInputChange}/>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-600">Repetir Contraseña:</label>
                <input type="password" name="confirmPassword" className="mt-1 p-2 w-full border rounded-[7px_7px_7px_7px]" value={register.confirmPassword} onChange={handleInputChange}/>
              </div>
              <button type="submit" className="bg-red-500 text-white p-2 rounded-[7px_7px_7px_7px] w-full" >
                Registrarse
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserRegister;
