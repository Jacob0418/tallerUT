
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/header'
import Inicio from './pages/Inicio'
import Actualizar from './pages/Actualizar'
import NotFound from './pages/NotFound'


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path='/' element={<Inicio/>} />
          <Route path='/*' element={<NotFound/>} />
          <Route path="/Actualizar" element={<Actualizar/>} />

        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
