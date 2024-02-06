
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
import PrivateRoutesAdmin from './privateRoutes/privateRoutesAdmin';
import LogInF from './pages/LogInMec';
import RegistroReparacion from './pages/RegistroReparacion';
import VistaReparacion from './pages/ListaReparaciones';
import ActualizarReparacion from './pages/ActualizarReparacion';
import Materiales from './pages/TableMaterial'
import TabMate from './pages/TableMaterial';
import TabPieza from './pages/TablePieza';
import AgregarPieza from './pages/AgregarPieza';
import EditPieza from './pages/EditPieza';
import TabPintura from './pages/TablePinturas';
import AgregarPintura from './pages/AgregarPintura';
import EditPintura from './pages/EditPintura';
import AgregarMaterial from './pages/AgregarMaterial';
import EditMaterial from './pages/EditMaterial';
import TabMeca from './pages/TableMecanico';
import AgregarMecanico from './pages/AgregarMecanico';
import EditMecanico from './pages/EditMecanico';
import TabTrabajos from './pages/TableTrabajos';
import AgregarTrabajo from './pages/AgregarTrabajo';
import EditarTrabajo from './pages/EditTrabajo';


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <main>
          <Routes>

            <Route path='/Admin' element={<LogInF />} />
            <Route element={<PrivateRoutesAdmin />} >
              <Route path='/Materiales' element={<TabMate/>} />
              <Route path='/Piezas' element={<TabPieza/>} />
              <Route path='/Pinturas' element={<TabPintura/>} />
              <Route path='/Mecanicos' element={<TabMeca/>} />
              <Route path='/TrabajoAdm' element={<TabTrabajos/>} />
              <Route path='/AgregarPieza' element={<AgregarPieza/>} />
              <Route path='/AgregarPintura' element={<AgregarPintura/>} />
              <Route path='/AgregarMaterial' element={<AgregarMaterial/>} />
              <Route path='/AgregarMecanico' element={<AgregarMecanico/>} />
              <Route path='/AgregarTrabajo' element={<AgregarTrabajo/>} />
              <Route path='/EditarPieza/:id_pieza' element={<EditPieza/>} />
              <Route path='/EditarPintura/:id_pintura' element={<EditPintura/>} />
              <Route path='/EditarMaterial/:id_material' element={<EditMaterial/>} />
              <Route path='/EditarMecanico/:id_mecanico' element={<EditMecanico/>} />
              <Route path='/EditarTrabajo/:id_trabajo' element={<EditarTrabajo/>} />
            </Route>

            <Route path='/LogIn' element={<LogIn />} />
            <Route path='/' element={<Inicio />} />
              <Route path='/UserRegister' element={<UserRegister />} />
            <Route element={<PrivateRoutes />} >
              <Route path='/Trabajos' element={<VistaTrabajo />} />
              <Route path='/RegistroTrabajo' element={<RegistroTrabajo />} />
              <Route path='/Servicios' element={<Services />} />
              <Route path="/Actualizar/:id_trabajo" element={<Actualizar />} />
              <Route path='/RegistroReparacion' element={<RegistroReparacion />} />
              <Route path='/Reparaciones' element={<VistaReparacion />} />
              <Route path='ActualizarReparacion/:id_reparacion' element={<ActualizarReparacion />} />

            </Route>
            <Route path='/*' element={<NotFound />} />


          </Routes>
        </main>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
