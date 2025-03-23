import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import PostList from "./components/POST_UI/PostList";
import PostDetail from "./components/POST_UI/PostDetail";
import CreatePost from "./components/POST_UI/CreatePost"; // Thêm import
import "bootstrap/dist/css/bootstrap.min.css";

const App: React.FC = () => {
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  return (
    <div className="container mt-4">
      <Routes>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/posts" element={<PostList refreshTrigger={refreshTrigger} />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/posts/create" element={<CreatePost />} /> {/* Thêm route */}
      </Routes>
    </div>
  );
};

export default App;