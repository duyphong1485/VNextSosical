import { Routes, Route } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage'
import { Header } from './pages/Header'
import { Navbar } from './pages/Navbar'

function App() {


  return (
    <>
    <Header/>
    <Navbar/>
			<Routes>
				<Route path="/sign-up" element={<SignUpPage />}/>
			</Routes>
    </>
  )
}

export default App
