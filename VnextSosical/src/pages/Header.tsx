import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = styled.header`
  background-color: #ffffff;
  color: rgb(235, 144, 27);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
`;

const HeaderMain = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  font-size: 40px;
`;

const Logo = styled.img`
  width: 200px;
  height: auto;
`;

const NavbarLink = styled(Link)`
  color: rgb(245, 151, 10);
  padding-left: 200px;
  text-decoration: none;
  font-size: 18px;
  &:hover {
    color: orange;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60%;
  gap: 30px;
`;

const UserAvatar = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
`;

const SearchInput = styled.input`
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: #e7e8ea;
  color: white;
  width: 800px;
  height: 40px;
`;

export function Header() {
  return (
    <HeaderContainer>
      <HeaderMain>
        <Logo src="Logo.png" alt="VNext Social" />
        <NavbarLink to="/">Home</NavbarLink>
        <NavbarLink to="/profile">Profile</NavbarLink>
        <NavbarLink to="/find-friend">Find Friend</NavbarLink>
      </HeaderMain>
      <SearchContainer>
        <UserAvatar src="anhdaidien.png" alt="User Avatar" />
        <SearchInput type="text" placeholder="Search..." />
      </SearchContainer>
    </HeaderContainer>
  );
}
