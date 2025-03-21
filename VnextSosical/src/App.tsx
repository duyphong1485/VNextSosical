import { Routes, Route } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/SignInPage'
import CardList from "./components/Card/CardList";
import Card from "./components/Card/Card";
import Card2 from "./components/Card/Card2";
function App() {

  return (
    <>
			<Routes>
        <Route path='/sign-in' element={<LoginPage />} />
				<Route path="/sign-up" element={<SignUpPage />}/>
        <Route
        path="/cardlist"
        element={
          <CardList>
            <Card secondary />
            <Card2 fontSize="20px" secondary />
            <Card />
            <Card2 />
          </CardList>
        }
      />
			</Routes>
    </>
  )
}

export default App
