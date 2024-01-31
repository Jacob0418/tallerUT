import React from "react";

function UserRegister() {
  return (
    <>
      <div className="mt-8 mx-4"> 
        <div className="flex items-center justify-center h-screen">
          <div className="max-w-2xl p-12 bg-white rounded-md shadow-md border border-red-500">
            <h2 className="text-2xl text-red-500 font-bold mb-4">Registro de Usuario</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Nombre:</label>
                <input type="text" className="mt-1 p-2 w-full border rounded-full" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Apellidos:</label>
                <input type="text" className="mt-1 p-2 w-full border rounded-full" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Número Telefónico:</label>
                <input type="tel" className="mt-1 p-2 w-full border rounded-full" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Número de Nómina:</label>
                <input type="text" className="mt-1 p-2 w-full border rounded-full" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Contraseña:</label>
                <input type="password" className="mt-1 p-2 w-full border rounded-full" />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-600">Repetir Contraseña:</label>
                <input type="password" className="mt-1 p-2 w-full border rounded-full" />
              </div>
              <button type="submit" className="bg-red-500 text-white p-2 rounded-full w-full">
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
