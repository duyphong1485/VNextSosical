import { Routes, Route } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/SignInPage'
import CardList from "./pages/CardList";

function App() {

  return (
    <>
      <Routes>
        <Route path='/sign-in' element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/cardlist" element={<CardList />
        }
        />

      </Routes>
    </>
  )
}

export default App
