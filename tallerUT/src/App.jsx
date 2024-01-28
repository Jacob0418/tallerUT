import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/header'
import Inicio from './pages/Inicio'
import NotFound from './pages/NotFound'

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path='/' element={<Inicio/>} />
          <Route path='/*' element={<NotFound/>} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
