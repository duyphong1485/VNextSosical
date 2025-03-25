import { Routes, Route, Navigate } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/SignInPage";
import EmailForgotPassworPage from "./pages/ForgotPassword";
import { Homepage } from "./pages/Homepage";
import { ThemeProvider } from "./components/ThemeContext/ThemeContext";
import ResetPassword from "./pages/ResetPassword";
import { Profilepage } from "./pages/ProfilePage";



function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/sign-in" replace />} />
        <Route path="/sign-in" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<EmailForgotPassworPage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/reset-password/:uid/:token" element={<ResetPassword />} />
        <Route path="/profile" element={< Profilepage/>} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
