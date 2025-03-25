import { Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/SignInPage";
import EmailForgotPassworPage from "./pages/ForgotPassword";
import { Homepage } from "./pages/Homepage";
import { ThemeProvider } from "./components/ThemeContext/ThemeContext";
import { PostDetail } from "./components/Post/PostDetail";
import { CreatePost } from "./components/Post/CreatePost";
import ResetPassword from "./pages/ResetPassword";
import { Profilepage } from "./pages/ProfilePage";
function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/sign-in" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<EmailForgotPassworPage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/post/:postId" element={<PostDetail />} />
        <Route path="*" element={<div>404 - Page Not Found</div>} />
        <Route path="/reset-password/:uid/:token" element={<ResetPassword />} />
        <Route path="/profile" element={< Profilepage/>} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
