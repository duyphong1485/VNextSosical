import React from "react";
import styled, { css } from "styled-components";

interface CardProps {
  post: {
    id: number;
    image_url: string;
    title: string;
    amount: string;
    author: {
      username: string;
      avatar_url: string;
    };
    likes_count: number;
  };
  secondary?: boolean;
}

const StyledCard = styled.div`
  position: relative;
`;

const CardImage = styled.div`
  height: 400px;
  width: 100%;
  border-radius: 8px;
`;

const CardImg = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
`;

const CardContent = styled.div`
  position: absolute;
  width: calc(100% - 36px);
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 50%);
  background-color: white;
  z-index: 10;
  border-radius: 20px;
  padding: 20px;
`;

const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const CardUser = styled.div`
  display: flex;
  align-items: center;
  column-gap: 12px;
`;

const UserAvatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 100rem;
  object-fit: cover;
  flex-shrink: 0;
`;

const UserName = styled.span`
  font-weight: 300;
  font-size: 16px;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 500;
`;

const CardAmount = styled.span<CardProps>`
  font-size: 18px;
  font-weight: bold;
  background: linear-gradient(
    86.88deg,
    #7d6aff 1.38%,
    #ffb86c 64.35%,
    #fc2872 119.91%
  );
  ${(props) =>
    props.secondary &&
    css`
      background: linear-gradient(86.88deg, #20e3b2, #2cccff);
    `};
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
`;

const Card: React.FC<CardProps> = ({ post, secondary }) => {
  return (
    <StyledCard>
      <CardImage>
        <CardImg src={post.image_url} alt={post.title} />
      </CardImage>
      <CardContent>
        <CardTop>
          <CardUser>
            <UserAvatar src={post.author.avatar_url} alt="" />
            <UserName>@{post.author.username}</UserName>
          </CardUser>
        </CardTop>
        <CardFooter>
          <CardTitle>{post.title}</CardTitle>
          <CardAmount secondary={secondary}>{post.amount}</CardAmount>
        </CardFooter>
      </CardContent>
    </StyledCard>
  );
};

export default Card;
