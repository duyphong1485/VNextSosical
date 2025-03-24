import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Home, User, LogOut, Sun, Moon } from "lucide-react";
import styled from "styled-components";
import { useTheme } from "../ThemeContext/ThemeContext";

interface SidebarProps {
  darkMode?: boolean;
}

const Sidebar = styled.nav<SidebarProps>`
  position: fixed;
  top: 270px;
  left: 20px;
  width: 260px;
  height: 280px;
  border-radius: 8px;
  background-color: ${(props) =>
    props.darkMode
      ? props.theme.cardBackground
      : props.theme.cardBackground}; 
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

export const SidebarNav: React.FC = () => {
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