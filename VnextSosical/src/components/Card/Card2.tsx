import React from "react";
import styled, { css } from "styled-components";

interface CardProps {
  post: {
    id: number;
    title: string;
    amount: string;
  };
  secondary?: boolean;
  fontSize?: string;
}

const StyledCard = styled.div<CardProps>`
  position: relative;
  .card-image {
    height: 400px;
    width: 100%;
    border-radius: 8px;
    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }
  }
  .card-content {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 50%);
    width: calc(100% - 36px);
    bottom: 0;
    background-color: white;
    z-index: 10;
    border-radius: 20px;
    padding: 20px;
  }
  .card-amount {
    font-size: ${(props) => props.fontSize || "18px"};
    font-weight: bold;
    ${(props) =>
      props.secondary
        ? css`
            background: linear-gradient(86.88deg, #20e3b2, #2cccff);
          `
        : css`
            background: linear-gradient(
              86.88deg,
              #7d6aff 1.38%,
              #ffb86c 64.35%,
              #fc2872 119.91%
            );
          `};
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
  }
`;

const Card2: React.FC<CardProps> = ({ secondary, fontSize, post }) => {
  return (
    <StyledCard secondary={secondary} fontSize={fontSize}>
      <div className="card-image">
        <img
          src="https://cdn.dribbble.com/users/2400293/screenshots/19060197/media/82d672bd58929b313f4805df5e48d586.png?compress=1&resize=400x300&vertical=top"
          alt=""
        />
      </div>
      <div className="card-content">
        <div className="card-footer">
          <h3 className="card-title">{post.title}</h3>
          <span className="card-amount">{post.amount}</span>
        </div>
      </div>
    </StyledCard>
  );
};

export default Card2;
