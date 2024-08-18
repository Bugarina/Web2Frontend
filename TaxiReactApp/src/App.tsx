import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage'
import { ErrorPage } from './pages/ErrorPage'
import { RegisterPage } from './pages/RegisterPage'
import { LandingPage } from './pages/LandingPage'
import { UpdateProfilePage } from './pages/UpdateProfilePage'

function App() {

  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/home" element={<LandingPage/>}/>
            <Route path='/update' element={<UpdateProfilePage/>}/>
            <Route path="*" element={<ErrorPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
   
  )
}

export default App
