import { Routes, Route } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/SignInPage'
function App() {

  return (
    <>
			<Routes>
        <Route path='/sign-in' element={<LoginPage />} />
				<Route path="/sign-up" element={<SignUpPage />}/>
			</Routes>
    </>
  )
}

export default App
