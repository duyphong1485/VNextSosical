import { Routes, Route } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/SignInPage'
import CardList from "./pages/CardList";
import Card from "./components/Card/Card";
import Card2 from "./components/Card/Card2";
import { Header } from './pages/Header';
import { Navbar } from './pages/Navbar';
function App() {

  return (
    <>
    <Header/>
    <Navbar/>
			<Routes>
        <Route path='/sign-in' element={<LoginPage />} />
				<Route path="/sign-up" element={<SignUpPage />}/>
        
        <Route
        path="/cardlist"
        element={
          <CardList>
            <Card />
            <Card2/>
            <Card/>
            <Card2/>
          </CardList>
        }
      />
			</Routes>
    </>
  )
}

export default App