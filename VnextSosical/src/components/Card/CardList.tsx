import React, { ReactNode } from "react";
import styled from "styled-components";

interface CardListProps {
  children: ReactNode;
}

const StyledCardList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 90px 30px;
  padding: 30px;
`;

const CardList: React.FC<CardListProps> = ({ children }) => {
  return <StyledCardList>{children}</StyledCardList>;
};

export default CardList;
