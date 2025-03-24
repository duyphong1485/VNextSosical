import React from "react";
import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";

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

export const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <HeaderContent>
        <HeaderTop>
          <HeaderLogo src="Logo.png" alt="VNext Social" />
          <NavLinks>
            <HeaderNavLink to="/homepage">Home</HeaderNavLink>
            <HeaderNavLink to="/profile">Profile</HeaderNavLink>
            <HeaderNavLink to="/find-friend">Find Friend</HeaderNavLink>
          </NavLinks>
        </HeaderTop>
        <SearchArea>
          <ProfileAvatar src="anhdaidien.png" alt="User Avatar" />
          <SearchBar type="text" placeholder="Search..." />
        </SearchArea>
      </HeaderContent>
    </HeaderWrapper>
  );
};