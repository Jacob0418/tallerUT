import React from "react";

function Actualizar() {
  return (<div className="w-full h-full  flex flex-col items-center">
    <div className="mt-[2rem]  justify-center p-4 flex flex-col gap-30 bg-[#e2e2e2] items-center shadow-md  rounded-[5px_5px_5px_5px]  w-fit h-fit">
      <p className="text-black flex justify-center items-center ">Actualizar datos del trabajo </p>

      
      <div className="w-full h-fit flex gap-10 items-center justify-center">
        <div className="flex flex-col p-8 gap-4 bg-green-200 ">
          <div className="flex flex-row gap-2">
            <input type="text" placeholder="Nombre del mecanico" className="rounded-[5px_5px_5px_5px]" />
            <input type="text" placeholder="Pintura" className=" rounded-[5px_5px_5px_5px]"/>
          </div>
          <div className="flex flex-row gap-2">
            <input type="text" placeholder="Piezas a reparar" className="rounded-[5px_5px_5px_5px]"/>
            
          </div>
          <input type="text" placeholder="Descripción del trabajo" className="h-40 rounded-[5px_5px_5px_5px] " />
          <div className="flex flex-row gap-2">
            <input type="text" placeholder="Modelo del vehiculo" className="rounded-[5px_5px_5px_5px]"/>
            <input type="text" placeholder="Estado " className="h-[10] rounded-[5px_5px_5px_5px]"/>
          </div>
          <div className="flex flex-row gap-2">
            <input type="text" placeholder="Horas de trabajo " className="rounded-[5px_5px_5px_5px]" />
            <input type="text" placeholder="Costo fijo  " className="rounded-[5px_5px_5px_5px]" />
          </div>
          <div className="flex flex-row gap-2">
            <input type="text" placeholder="Costo total "className="rounded-[5px_5px_5px_5px]" />
            
          </div>
          <input type="text" placeholder="Fotos del vehiculo " className=" h-40 rounded-[5px_5px_5px_5px] "/>
        </div>
        
      </div>
      <button type="submit" className="bg-red-400 text-white h-10 rounded-[5px_5px_5px_5px] p-2">Actualizar datos</button>      
    </div>
  </div>
    
  );
}

export default Actualizar;
