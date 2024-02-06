import React, { useEffect, useState} from "react";
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { IoEyeOffOutline } from "react-icons/io5";

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

  const [show, setShow] = useState('password');

  const seePassword = () => {
    setShow(show === 'password' ? 'text' : 'password')
  };

  return (
    <>
      <div className="mt-20 mb-20"> 
        <div className="flex justify-center">
          <div className="w-[370px] p-5 rounded-[10px_10px_10px_10px] shadow-md border border-red-500">
            <h2 className="text-2xl text-red-500 font-bold mb-4 text-center uppercase">Registro de Usuario</h2>
            <form onSubmit={handleSubmit} className="flex items-center flex-col">
              <div className="mb-4 flex flex-col text-center">
                <label className="mb-2 font-medium">Nombre</label>
                <input type="text" name="nombre" className="border-none focus:outline-red-500 focus:outline-none rounded-[5px_5px_5px_5px] p-1 w-52 mb-5" placeholder="Ingrese un nombre" value={register.nombre} onChange={handleInputChange} />
              </div>
              <div className="mb-4 flex flex-col text-center">
                <label className="mb-2 font-medium">Apellido</label>
                <input type="text" name='apellido' className="border-none focus:outline-red-500 focus:outline-none rounded-[5px_5px_5px_5px] p-1 w-52 mb-5" value={register.apellido} onChange={handleInputChange} placeholder="Ingrese un apellido"/>
              </div>
              <div className="mb-4 flex flex-col text-center">
                <label className="mb-2 font-medium">Correo</label>
                <input type="email" name='email' className="border-none focus:outline-red-500 focus:outline-none rounded-[5px_5px_5px_5px] p-1 w-52 mb-5" value={register.email} onChange={handleInputChange} placeholder="Ingrese un correo"/>
              </div>
              <div className="mb-4 flex flex-col text-center">
                <label className="mb-2 font-medium">Número Telefónico</label>
                <input type="text" name="no_telefonico" className="border-none focus:outline-red-500 focus:outline-none rounded-[5px_5px_5px_5px] p-1 w-52 mb-5" value={register.no_telefonico} onChange={handleInputChange} placeholder="Ingrese teléfono"/>
              </div>
              <div className="mb-4 flex flex-col text-center">
                <label className="mb-2 font-medium">Número de Nómina</label>
                <input type="text" name="nomina" className="border-none focus:outline-red-500 focus:outline-none rounded-[5px_5px_5px_5px] p-1 w-52 mb-5" value={register.nomina} onChange={handleInputChange} placeholder="Ingrese nómina"/>
              </div>
              <div className="mb-4 flex flex-col text-center">
                <label className="mb-2 font-medium">Contraseña</label>
                <input type={show} name="password" className="border-none focus:outline-red-500 focus:outline-none rounded-[5px_5px_5px_5px] p-1 w-52 mb-5" value={register.password} onChange={handleInputChange} placeholder="Ingrese una contraseña"/>
              </div>
              <div className="mb-6 flex flex-col text-center">
              <IoEyeOffOutline
                onClick={seePassword}
                className="relative left-[188px] -top-[52px] transform -translate-y-1/2 bg-none border-none cursor-pointer p-0"
              />
                <label className="mb-2 font-medium">Repetir Contraseña</label>
                <input type={show} name="confirmPassword" className="border-none focus:outline-red-500 focus:outline-none rounded-[5px_5px_5px_5px] p-1 w-52 mb-5" value={register.confirmPassword} onChange={handleInputChange} placeholder="Repita contraseña"/>
              </div>
              <button type="submit" className="border-2 border-red-500 bg-red-500 rounded-[5px_5px_5px_5px] p-2 font-medium mb-7 mt-1 text-white" >
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
