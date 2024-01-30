import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/header'
import Inicio from './pages/Inicio'
import NotFound from './pages/NotFound'
import RegistroTrabajo from './pages/RegistroTrabajo';

function App() {

  return (
    <BrowserRouter>
      
      <main>
        <Routes>
          <Route path='/' element={<Navbar/>}>
            <Route path='/' element={<Inicio />} />
            <Route path='/RegistroTrabajo' element={<RegistroTrabajo />} />
            
            
            <Route path='/*' element={<NotFound />} />
          </Route>

        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
