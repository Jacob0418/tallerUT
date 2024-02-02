
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/header';
import Inicio from './pages/Inicio';
import Actualizar from './pages/Actualizar'
import NotFound from './pages/NotFound';
import UserRegister from './pages/UserRegister';
import LogIn from './pages/Login';
import VistaTrabajo from './pages/ListaTrabajos'
import Services from './pages/Services'
import { AuthProvider } from "./api/context/AuthContext";
import RegistroTrabajo from './pages/RegistroTrabajo';
import PrivateRoutes from './privateRoutes/privateRoutes';

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Navbar />
      <main>
        <Routes>
          <Route path='/LogIn' element={<LogIn />} />
          <Route path='/' element={<Inicio />} />
          <Route path='/UserRegister' element={<UserRegister />} />
          <Route element={<PrivateRoutes/>} >
          <Route path='/Trabajos' element={<VistaTrabajo />} /> 
          <Route path='/RegistroTrabajo' element={<RegistroTrabajo />} />
          <Route path='/Servicios' element={<Services />} />
          <Route path="/Actualizar/:id_trabajo" element={<Actualizar />} />

          </Route>
          <Route path='/*' element={<NotFound />} />


        </Routes>
      </main>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
