import React from "react";
import CardsTrabajo from "../components/Cards";

function VistaTrabajo() {
    return (
        <>
            <h1 className="text-center mt-3 font-bold text-3xl">TRABAJOS PENDIENTES</h1>
            <div className="flex flex-row justify-center gap-7 mt-10">
                <CardsTrabajo />
                <CardsTrabajo />
                <CardsTrabajo />
                <CardsTrabajo />
            </div>
            <div className="flex flex-row justify-center gap-7 mt-10">
                <CardsTrabajo />
                <CardsTrabajo />
                <CardsTrabajo />
                <CardsTrabajo />
            </div>
            <div className="flex flex-row justify-center gap-7 mt-10">
                <CardsTrabajo />
                <CardsTrabajo />
                <CardsTrabajo />
                <CardsTrabajo />
            </div>
            <div className="flex flex-row justify-center gap-7 mt-10 mb-10">
                <CardsTrabajo />
                <CardsTrabajo />
                <CardsTrabajo />
                <CardsTrabajo />
            </div>
        </>
    )
}

export default VistaTrabajo;