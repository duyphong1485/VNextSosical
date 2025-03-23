import { Routes, Route } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/SignInPage'
import { Header } from './pages/Header'
import { Navbar } from './pages/Navbar'
import EmailForgotPasswordage from './pages/ForgotPassword'

function App() {
  return (
    <>
      <Routes>
        <Route path='/sign-in' element={<LoginPage />} />
        <Route path='/sign-up' element={<SignUpPage />} />
        <Route path='/forgot-password' element={<EmailForgotPasswordage />} />
      </Routes>
    </>
  )
}

export default App
