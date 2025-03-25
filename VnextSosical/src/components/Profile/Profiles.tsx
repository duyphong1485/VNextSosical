import React, { ReactNode } from "react";
import styled from "styled-components";

const StyledProfiles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 30px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  transition: background-color 0.3s ease, color 0.3s ease;
`;

interface ProfilesProps {
  children: ReactNode;
}

export const Profiles: React.FC<ProfilesProps> = ({ children }) => (
  <StyledProfiles>{children}</StyledProfiles>
);