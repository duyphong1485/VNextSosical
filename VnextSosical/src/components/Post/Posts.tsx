import React, { ReactNode } from "react";
import styled from "styled-components";

const StyledPosts = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  gap: 30px;
  padding: 30px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  transition: background-color 0.3s ease, color 0.3s ease;
`;

interface PostsProps {
  children: ReactNode;
}

export const Posts: React.FC<PostsProps> = ({ children }) => (
  <StyledPosts>{children}</StyledPosts>
);