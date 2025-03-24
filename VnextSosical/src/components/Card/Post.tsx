import React, { useState } from "react";
import styled from "styled-components";
import { Heart, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Thêm import này

interface PostProps {
  user: string;
  content: string;
  likes: number;
  comments: number;
  createdAt: string;
  postId: number;
}

const StyledPost = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.cardBackground};
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
  cursor: pointer; /* Thêm con trỏ để người dùng biết có thể nhấp */
`;

const PostImage = styled.div`
  height: 400px;
  width: 100%;
  border-radius: 8px;
`;

const PostImg = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
`;

const PostContent = styled.div`
  position: absolute;
  width: calc(100% - 46px);
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 50%);
  background-color: ${(props) => props.theme.cardBackground};
  border-radius: 20px;
  padding: 20px;
  transition: background-color 0.3s ease;
`;

const PostTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const PostUser = styled.div`
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
  color: rgb(245, 151, 10);
`;

const PostFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PostTitle = styled.h3`
  font-size: 18px;
  font-weight: 500;
  color: ${(props) => props.theme.text};
`;

const PostAmount = styled.span<{ secondary?: boolean }>`
  font-size: 18px;
  font-weight: bold;
  background: linear-gradient(
    86.88deg,
    #7d6aff 1.38%,
    #ffb86c 64.35%,
    #fc2872 119.91%
  );
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
`;

const PostMeta = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
  color: ${(props) => props.theme.text};
  font-size: 14px;
`;

const LikeButton = styled.button<{ isLiked: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  color: ${(props) => (props.isLiked ? "red" : props.theme.text)};
  transition: color 0.2s ease;

  img {
    width: 16px;
    height: 16px;
    filter: ${(props) =>
      props.isLiked ? "none" : "grayscale(100%) opacity(0.7)"};
  }

  &:hover img {
    filter: ${(props) => (props.isLiked ? "none" : "grayscale(0%) opacity(1)")};
  }
`;

const CommentSection = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
  color: ${(props) => props.theme.text};
  font-size: 14px;
`;

const PostDate = styled.span`
  font-size: 12px;
  color: ${(props) => props.theme.text};
  opacity: 0.7;
`;

export const Post: React.FC<PostProps> = ({
  user,
  content,
  likes: initialLikes,
  comments,
  createdAt,
  postId,
}) => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate(); // Thêm hook chuyển hướng

  const formattedDate = new Date(createdAt).toLocaleString();

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Ngăn sự kiện click lan lên StyledPost
    try {
      if (isLiked) {
        const response = await fetch("http://localhost:8000/api/likes/", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ post_id: postId }),
        });
        if (!response.ok) throw new Error("Failed to unlike post");
        setLikes(likes - 1);
        setIsLiked(false);
      } else {
        const response = await fetch("http://localhost:8000/api/likes/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ post_id: postId, like_type: "like" }),
        });
        if (!response.ok) throw new Error("Failed to like post");
        setLikes(likes + 1);
        setIsLiked(true);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handlePostClick = () => {
    navigate(`/post/${postId}`); // Chuyển hướng đến trang chi tiết
  };

  return (
    <StyledPost onClick={handlePostClick}>
      <PostImage>
        <PostImg
          src="https://cdn.dribbble.com/users/2400293/screenshots/19060197/media/82d672bd58929b313f4805df5e48d586.png?compress=1&resize=400x300&vertical=top"
          alt="Post image"
        />
      </PostImage>
      <PostContent>
        <PostTop>
          <PostUser>
            <UserAvatar
              src="https://cdn.dribbble.com/users/2400293/screenshots/16527147/media/f079dc5596a5fb770016c4ea506cd77b.png?compress=1&resize=1000x750&vertical=top"
              alt={user}
            />
            <UserName>@{user || "Anonymous"}</UserName>
          </PostUser>
          <PostMeta>
            <LikeButton isLiked={isLiked} onClick={handleLike}>
              <Heart size={16} fill={isLiked ? "red" : "none"} stroke={isLiked ? "red" : "currentColor"} />
            </LikeButton>
            <span>{likes}</span>
          </PostMeta>
        </PostTop>
        <PostFooter>
          <PostTitle>{content}</PostTitle>
          <CommentSection>
            <MessageSquare size={16} />
            <PostAmount>{comments}</PostAmount>
          </CommentSection>
        </PostFooter>
        <PostDate>{formattedDate}</PostDate>
      </PostContent>
    </StyledPost>
  );
};