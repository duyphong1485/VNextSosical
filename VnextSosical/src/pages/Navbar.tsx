import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Home, User, LogOut, Sun, Moon } from "lucide-react";
import styled from "styled-components";

interface NavbarProps {
  darkMode?: boolean;
}

const StyledNavbar = styled.nav<NavbarProps>`
  position: fixed;
  top: 250px;
  left: 0;
  width: 260px;
  background-color: ${(props) => (props.darkMode ? "#333" : "hsl(240, 8%, 97%)")};
  display: flex;
  flex-direction: column;
  padding: 12px 0;
  box-shadow: 4px 0 6px rgba(0, 0, 0, 0.1);
  margin-left: 20px;
  transition: background-color 0.3s ease;
`;

const NavbarLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 20px 0px 3px 30px;
  text-decoration: none;
  color: rgb(245, 151, 10);
  margin-bottom: 12px;
  font-weight: 600;
  gap: 10px;
  font-size: 18px;
  &:hover {
    color: orange;
  }
`;

const DarkModeButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 20px 0px 3px 30px;
  color: rgb(245, 151, 10);
  font-size: 18px;
  font-weight: 600;
  gap: 10px;
  &:hover {
    color: orange;
  }
`;

export function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <StyledNavbar darkMode={darkMode}>
      <NavbarLink to="/">
        <Home size={24} />
        <span>Home</span>
      </NavbarLink>
      <NavbarLink to="/profile">
        <User size={24} />
        <span>Profile</span>
      </NavbarLink>
      <DarkModeButton onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        <span>{darkMode ? "Light" : "Dark"}</span>
      </DarkModeButton>
      <NavbarLink to="/logout">
        <LogOut size={24} />
        <span>Logout</span>
      </NavbarLink>
    </StyledNavbar>
  );
}
