
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/header';
import Inicio from './pages/Inicio';
import Actualizar from './pages/Actualizar'
import NotFound from './pages/NotFound';
import UserRegister from './pages/UserRegister';
import LogIn from './pages/Login';
import VistaTrabajo from './pages/ListaTrabajos'
import Services from './pages/Services'

import RegistroTrabajo from './pages/RegistroTrabajo';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path='/' element={<Inicio />} />
          <Route path='/RegistroTrabajo' element={<RegistroTrabajo />} />
          <Route path='/UserRegister' element={<UserRegister />} />
          <Route path='/LogIn' element={<LogIn />} />
          <Route path='/*' element={<NotFound />} />
          <Route path='/Trabajos' element={<VistaTrabajo />} />
          <Route path='/Servicios' element={<Services />} />
          <Route path="/Actualizar" element={<Actualizar />} />


        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
