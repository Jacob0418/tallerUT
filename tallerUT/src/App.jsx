import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/header'
import Inicio from './pages/Inicio'
import NotFound from './pages/NotFound'
import UserRegister from './pages/UserRegister'

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path='/' element={<Inicio/>} />
          <Route path='/*' element={<NotFound/>} />
          <Route path='/UserRegister' element={<UserRegister/>} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
