import { Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/SignInPage";
import EmailForgotPasswordage from "./pages/ForgotPassword";
import { Homepage } from "./pages/Homepage";
import { ThemeProvider } from "./components/ThemeContext/ThemeContext";
import { PostDetail } from "./components/Card/PostDetail";
import { CreatePost } from "./components/Card/CreatePost";

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/sign-in" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<EmailForgotPasswordage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/post/:postId" element={<PostDetail />} />
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;