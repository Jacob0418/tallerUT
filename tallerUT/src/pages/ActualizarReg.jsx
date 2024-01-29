import React from "react";

function Actualizar() {
  return (
    <div className="flex justify-between p-4">
      {/* Lado izquierdo */}
      <div className="flex flex-col space-y-4">
        {Array.from({ length: 5 }, (_, index) => (
          <div key={index} className="border p-4">
            Datos Recuadro {index + 1}
          </div>
        ))}
      </div>

      {/* Lado derecho */}
      <div className="flex flex-col space-y-4">
        {Array.from({ length: 5 }, (_, index) => (
          <div key={index + 5} className="border p-4">
            Datos Recuadro {index + 6}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Actualizar;
