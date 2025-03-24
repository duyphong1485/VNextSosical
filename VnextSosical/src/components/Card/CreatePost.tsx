import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Home, User, LogOut, Sun, Moon } from "lucide-react";
import { useTheme } from "../ThemeContext/ThemeContext";

// Header Styles
const HeaderWrapper = styled.header`
  background-color: ${(props) => props.theme.cardBackground};
  color: ${(props) => props.theme.text};
  padding: 15px 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const HeaderTop = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  gap: 40px;
`;

const HeaderLogo = styled.img`
  width: 180px;
  height: auto;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 30px;
`;

const HeaderNavLink = styled(RouterLink)`
  color: rgb(245, 151, 10);
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  transition: color 0.2s ease;
  &:hover {
    color: orange;
  }
`;

const SearchArea = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 700px;
  justify-content: center;
`;

const ProfileAvatar = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid rgb(245, 151, 10);
  transition: border-color 0.2s ease;
  &:hover {
    border-color: orange;
  }
`;

const SearchBar = styled.input`
  padding: 10px 15px;
  border-radius: 20px;
  border: 1px solid #ddd;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  width: 100%;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease, background-color 0.3s ease, color 0.3s ease;
  &:focus {
    border-color: rgb(245, 151, 10);
  }
`;

// Sidebar Styles
const Sidebar = styled.nav<{ darkMode?: boolean }>`
  position: fixed;
  top: 270px;
  left: 20px;
  width: 260px;
  height: 280px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.cardBackground};
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.05);
  transition: background-color 0.3s ease;
  @media (max-width: 768px) {
    width: 80px;
    align-items: center;
  }
`;

const SidebarLink = styled(RouterLink)`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  text-decoration: none;
  color: rgb(245, 151, 10);
  font-weight: 500;
  font-size: 17px;
  gap: 12px;
  transition: color 0.2s ease, background-color 0.2s ease;
  &:hover {
    color: orange;
    background-color: rgba(245, 151, 10, 0.1);
  }
  @media (max-width: 768px) {
    justify-content: center;
    span {
      display: none;
    }
  }
`;

const ThemeToggle = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 15px 20px;
  color: rgb(245, 151, 10);
  font-size: 17px;
  font-weight: 500;
  gap: 12px;
  transition: color 0.2s ease, background-color 0.2s ease;
  &:hover {
    color: orange;
    background-color: rgba(245, 151, 10, 0.1);
  }
  @media (max-width: 768px) {
    justify-content: center;
    span {
      display: none;
    }
  }
`;

// Create Post Styles
const CreatePageWrapper = styled.div`
  min-height: 100vh;
  background: rgba(255, 255, 255, 0.9);
  padding: 120px 300px 60px 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    padding: 100px 20px;
  }
`;

const CreateCard = styled.div`
  max-width: 800px;
  width: 100%;
  background: ${(props) => props.theme.cardBackground};
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
`;

const CreateTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: ${(props) => props.theme.text};
  margin: 0 0 20px 0;
  text-align: center;
`;

const TitleInput = styled.input`
  width: 100%;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  font-size: 16px;
  margin-bottom: 20px;
  outline: none;
  transition: border-color 0.3s ease;
  &:focus {
    border-color: rgb(245, 151, 10);
  }
`;

const PostInput = styled.textarea`
  width: 100%;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  font-size: 16px;
  resize: vertical;
  min-height: 150px;
  outline: none;
  transition: border-color 0.3s ease;
  &:focus {
    border-color: rgb(245, 151, 10);
  }
`;

const SubmitButton = styled.button`
  background: rgb(245, 151, 10);
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 20px;
  width: 100%;
  &:hover {
    background: orange;
  }
`;

const ErrorMessage = styled.div`
  color: #e94560;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
`;

// Components
const HeaderComponent: React.FC = () => {
  return (
    <HeaderWrapper>
      <HeaderContent>
        <HeaderTop>
          <HeaderLogo src="https://placehold.co/180x50" alt="VNext Social" />
          <NavLinks>
            <HeaderNavLink to="/homepage">Home</HeaderNavLink>
            <HeaderNavLink to="/profile">Profile</HeaderNavLink>
            <HeaderNavLink to="/find-friend">Find Friend</HeaderNavLink>
          </NavLinks>
        </HeaderTop>
        <SearchArea>
          <ProfileAvatar src="https://placehold.co/50x50" alt="User Avatar" />
          <SearchBar type="text" placeholder="Search..." />
        </SearchArea>
      </HeaderContent>
    </HeaderWrapper>
  );
};

const SidebarNav: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <Sidebar darkMode={darkMode}>
      <SidebarLink to="/homepage">
        <Home size={22} />
        <span>Home</span>
      </SidebarLink>
      <SidebarLink to="/profile">
        <User size={22} />
        <span>Profile</span>
      </SidebarLink>
      <SidebarLink to="/create">
        <User size={22} />
        <span>Create Post</span>
      </SidebarLink>
      <ThemeToggle onClick={toggleDarkMode}>
        {darkMode ? <Sun size={22} /> : <Moon size={22} />}
        <span>{darkMode ? "Light" : "Dark"}</span>
      </ThemeToggle>
      <SidebarLink to="/sign-in">
        <LogOut size={22} />
        <span>Logout</span>
      </SidebarLink>
    </Sidebar>
  );
};

// Main Component
export const CreatePost: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Giả định bạn lưu token sau khi đăng nhập, ví dụ từ localStorage
  const token = localStorage.getItem("token"); // Thay bằng cách lấy token thực tế của bạn

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      setError("Title and content cannot be empty");
      return;
    }

    if (!token) {
      setError("You must be logged in to create a post");
      navigate("/sign-in"); // Chuyển hướng đến trang đăng nhập nếu chưa có token
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/posts/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`, // Thêm token xác thực
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors || "Failed to create post");
      }

      const newPost = await response.json();
      navigate(`/post/${newPost.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error details:", err);
    }
  };

  return (
    <>
      <HeaderComponent />
      <SidebarNav />
      <CreatePageWrapper>
        <CreateCard>
          <CreateTitle>Create a New Post</CreateTitle>
          <TitleInput
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
          />
          <PostInput
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
          />
          <SubmitButton onClick={handleSubmit}>Post</SubmitButton>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </CreateCard>
      </CreatePageWrapper>
    </>
  );
};