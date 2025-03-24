import React from "react";
import styled from "styled-components";
import { Header } from "../components/Header/Header";
import { SidebarNav } from "../components/SidebarNav/SidebarNav";

const MainContent = styled.div`
  margin-left: 260px;
  padding: 20px;
  margin-top: 220px;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  min-height: 100vh; /* Đảm bảo chiếm toàn bộ chiều cao */
  transition: background-color 0.3s ease, color 0.3s ease;
  @media (max-width: 768px) {
    margin-left: 100px;
  }
`;

export const Homepage: React.FC = () => {
  return (
    <>
      <Header />
      <SidebarNav />
      <MainContent>
        <h1>Welcome to the Homepage!</h1>
        <p>This is the main content area of your homepage.</p>
      </MainContent>
    </>
  );
};