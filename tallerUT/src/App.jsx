import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/header';
import Inicio from './pages/Inicio';
import NotFound from './pages/NotFound';
import UserRegister from './pages/UserRegister';
import LogIn from './pages/Login';
import Actualizar from './pages/ActualizarReg';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path='/' element={<Inicio />} />
          <Route path='/UserRegister' element={<UserRegister />} />
          <Route path='/LogIn' element={<LogIn />} />
          <Route path="/Actualizar" element={<Actualizar />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
