import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/header';
import Inicio from './pages/Inicio';
import NotFound from './pages/NotFound';
import UserRegister from './pages/UserRegister';
import LogIn from './pages/Login';
import VistaTrabajo from './pages/ListaTrabajos'
import Services from './pages/Services'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path='/' element={<Inicio />} />
          <Route path='/UserRegister' element={<UserRegister />} />
          <Route path='/LogIn' element={<LogIn />} />
          <Route path='*' element={<NotFound />} />
          <Route path='/Trabajos' element={<VistaTrabajo/>} />
          <Route path='/Servicios' element={<Services/>}  />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
