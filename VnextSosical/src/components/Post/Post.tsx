import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { Heart, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PostProps {
  user: string;
  content: string;
  likes: number;
  comments: number;
  createdAt: string;
  postId: number;
  isLikedByUser?: boolean;
}

const StyledPost = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
  cursor: pointer;
  margin-bottom: 20px; /* Thêm khoảng cách giữa các post */
`;

const PostImage = styled.div`
  height: 400px;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
`;

const PostImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PostContent = styled.div`
  position: relative; /* Thay đổi từ absolute sang relative */
  width: 100%; /* Điều chỉnh width */
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 8px; /* Điều chỉnh border-radius */
  padding: 15px;
  transition: background-color 0.3s ease;
  margin-top: 10px; /* Thêm margin-top để tách khỏi ảnh */
`;

const PostTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px; /* Giảm margin-bottom */
`;

const PostUser = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const UserAvatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
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
  color: ${({ theme }) => theme.text};
  max-height: 60px; /* Giới hạn chiều cao tối đa */
  overflow: hidden; /* Ẩn nội dung tràn */
  text-overflow: ellipsis; /* Thêm dấu ... khi nội dung bị cắt */
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Giới hạn hiển thị 2 dòng */
  -webkit-box-orient: vertical;
  margin: 0; /* Loại bỏ margin mặc định */
`;

const PostAmount = styled.span`
  font-size: 18px;
  font-weight: bold;
  background: linear-gradient(86.88deg, #7d6aff 1.38%, #ffb86c 64.35%, #fc2872 119.91%);
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
`;

const PostMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
`;

const LikeButton = styled.button<{ isLiked: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  color: ${({ isLiked, theme }) => (isLiked ? "red" : theme.text)};
  transition: color 0.2s ease;
`;

const CommentSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
`;

const PostDate = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
  margin-top: 10px; /* Thêm khoảng cách trên */
  display: block; /* Đảm bảo ngày tháng xuống dòng riêng */
`;

export const Post: React.FC<PostProps> = ({
  user,
  content,
  likes: initialLikes,
  comments,
  createdAt,
  postId,
  isLikedByUser = false,
}) => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(isLikedByUser);
  const navigate = useNavigate();

  const formattedDate = new Date(createdAt).toLocaleString();

  const handleLike = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
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
    },
    [isLiked, likes, postId]
  );

  const handlePostClick = () => {
    navigate(`/post/${postId}`);
  };

  return (
    <StyledPost onClick={handlePostClick}>
      <PostImage>
        <PostImg
          src="https://cdn.dribbble.com/users/2400293/screenshots/19060197/media/82d672bd58929b313f4805df5e48d586.png?compress=1&resize=400x300&vertical=top"
          alt="Post image"
          loading="lazy"
        />
      </PostImage>
      <PostContent>
        <PostTop>
          <PostUser>
            <UserAvatar
              src="https://cdn.dribbble.com/users/2400293/screenshots/16527147/media/f079dc5596a5fb770016c4ea506cd77b.png?compress=1&resize=1000x750&vertical=top"
              alt={user}
              loading="lazy"
            />
            <UserName>{user || "Anonymous"}</UserName>
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