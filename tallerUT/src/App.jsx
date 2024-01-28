import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/header'
import Inicio from './pages/Inicio'
import NotFound from './pages/NotFound'
import LogIn from './pages/Login'
import VistaTrabajo from './pages/ListaTrabajos'

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path='/' element={<Inicio/>} />
          <Route path='/*' element={<NotFound/>} />
          <Route path='/LogIn' element={<LogIn/>} />
          <Route path='/Trabajos' element={<VistaTrabajo/>} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
