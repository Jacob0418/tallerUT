import React from "react";
import Carro from '../img/carro.png'

function NotFound() {
    return (
        <>
            <div className="flex justify-center items-center mt-24">
                <img alt="hpla" src={Carro} />
            </div>
            <div className=" flex justify-center mb-5">
                <p className="text-red-500 text-3xl font-bold">PÁGINA NO ENCONTRADA</p>
            </div>
        </>
    )
}

export default NotFound;