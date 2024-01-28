import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/header'
import Inicio from './pages/Inicio'
import NotFound from './pages/NotFound'
import UserRegister from './pages/UserRegister'
import LogIn from './pages/Login'

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path='/' element={<Inicio/>} />
          <Route path='/*' element={<NotFound/>} />
          <Route path='/UserRegister' element={<UserRegister/>} />
          <Route path='/LogIn' element={<LogIn/>} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
