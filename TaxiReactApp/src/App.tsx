import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage'
import { ErrorPage } from './pages/ErrorPage'
import { RegisterPage } from './pages/RegisterPage'
import { LandingPage } from './pages/LandingPage'
import { UpdateProfilePage } from './pages/UpdateProfilePage'
import { GoogleOAuthProvider } from '@react-oauth/google'

function App() {

  return (
    <div className='app'>
      <GoogleOAuthProvider clientId="1085352246766-7tl9aaiagls5hg8uq1aot9uakckkpb2r.apps.googleusercontent.com">
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<LoginPage/>}/>
              <Route path="/register" element={<RegisterPage/>}/>
              <Route path="/home" element={<LandingPage/>}/>
              <Route path='/update' element={<UpdateProfilePage/>}/>
              <Route path="*" element={<ErrorPage/>} />
          </Routes>
        </BrowserRouter>  
      </GoogleOAuthProvider>;
      
    </div>
   
  )
}

export default App
