import React from "react";
import Seguridad from '../img/escudocar.png';
import { Link } from 'react-router-dom';;

function Inicio() {
    return (
        <>
            <div className="container-content my-[67px]">
                <h1 className="text-center mb-5 text-5xl uppercase font-semibold">Bienvenidos</h1>
                <h2 className="text-center mt-4 text-3xl text-red-500 font-medium">Taller UT</h2>
                <h4 className="text-center mt-4 text-3xl font-normal">"El sistema ideal para tu taller mecánico"</h4>

            <div className="icon-container flex flex-col items-center justify-center"> 
                <img src={Seguridad} alt="Icono de carro" className="w-48 h-48"></img>
                <Link to="/LogIn"  className="bg-red-500 text-white py-2 px-28 rounded-[7px_7px_7px_7px] text-2xl mt-4 hover:-translate-y-1 duration-200">Comenzar</Link>
            </div>
                <h3 className="additional-text mt-8 text-center text-3xl">¿Aún no tienes cuenta?</h3>
                <h4 className="register-now mt-4 text-red-500 text-center text-3xl">
                    <Link to="/UserRegister" className="hover:bg-red-500 rounded-[7px_7px_7px_7px] hover:text-white hover:p-2 h-2 hover:w-10 font-normal text-[25px]">Regístrate ahora!!</Link>
                </h4>
                <Link to={'/admin'}><p className="text-center my-3 hover:text-red-500 cursor-pointer hover:-translate-y-1">¿Eres Admin?</p></Link>
            </div>
        </>
    );
}

export default Inicio;
