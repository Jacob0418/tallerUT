import React from "react";
import Seguridad from '../img/escudocar.png';
import { Link } from 'react-router-dom';;

function Inicio() {
    return (
        <>
            <div className="container-content mt-4">
                <h1 className="text-center mt-4 text-3xl">Bienvenidos</h1>
                <h2 className="text-center mt-4 text-3xl">Taller UT</h2>
                <h4 className="text-center mt-4 text-3xl">"Tu motor merece el mejor trato, confía en nosotros, tu taller mecánico de confianza"</h4>

            <div className="icon-container flex flex-col items-center justify-center"> 
                <img src={Seguridad} alt="Icono de carro" className="w-48 h-48"></img>
                <Link to="/LogIn"  className="bg-red-500 text-black py-2 px-28 rounded-full text-2xl mt-4">Comenzar</Link>
            </div>
                <h3 className="additional-text mt-8 text-center text-3xl">¿Aún no tienes cuenta?</h3>
                <h4 className="register-now mt-4 text-red-500 text-center text-3xl">
                    <Link to="/UserRegister">Regístrate ahora!!</Link>
                </h4>
            </div>
        </>
    );
}

export default Inicio;
