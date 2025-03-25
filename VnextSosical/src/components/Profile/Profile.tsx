import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { Heart,MessageSquare } from "lucide-react";

interface ProfileProps {
  user: string;
  content: string;
  likes: number;
  comments: number;
  createdAt: string;
  profileId: number; 
  isLikedByUser?: boolean;
}

const StyledProfile = styled.div`
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
`;

const ProfileImage = styled.div`
  width: 100%;
  height: 600px; 
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
`;

const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProfileContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ProfileTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProfileUser = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const UserAvatar = styled.img`
  width: 40px; 
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
`;

const UserName = styled.span`
  font-weight: 300;
  font-size: 18px;
  color: rgb(245, 151, 10);
`;

const ProfileMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.text};
  font-size: 16px;
`;
const ProfileFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProfileTitle = styled.h3`
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ProfileAmount = styled.span`
  font-size: 18px;
  font-weight: bold;
  background: linear-gradient(86.88deg, #7d6aff 1.38%, #ffb86c 64.35%, #fc2872 119.91%);
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
`;const CommentSection = styled.div`
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


const ProfileDate = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
`;

export const Profile: React.FC<ProfileProps> = ({
  user,
  content,
  likes: initialLikes,
  comments,
  createdAt,
  profileId,
  isLikedByUser = false,
}) => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(isLikedByUser);

  const formattedDate = new Date(createdAt).toLocaleString();

  const getAuthToken = () => localStorage.getItem("token") || "";

  const handleLike = useCallback(async () => {
    const url = "http://localhost:8000/api/likes/"; 
    const method = isLiked ? "DELETE" : "POST";
    const body = { post_id: profileId }; 

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error(`Failed to ${isLiked ? "unlike" : "like"} profile`);

      setLikes((prev) => prev + (isLiked ? -1 : 1));
      setIsLiked(!isLiked);
    } catch (err) {
      console.error("Error:", err);
    }
  }, [isLiked, profileId]);

  return (
    <StyledProfile>
      <ProfileImage>
        <ProfileImg
          src="https://cdn.dribbble.com/users/2400293/screenshots/19060197/media/82d672bd58929b313f4805df5e48d586.png?compress=1&resize=400x300&vertical=top"
          alt="Profile image"
          loading="lazy"
        />
      </ProfileImage>
      <ProfileContent>
        <ProfileTop>
          <ProfileUser>
            <UserAvatar
              src="https://cdn.dribbble.com/users/2400293/screenshots/16527147/media/f079dc5596a5fb770016c4ea506cd77b.png?compress=1&resize=1000x750&vertical=top"
              alt={user}
              loading="lazy"
            />
            <UserName>{user || "Anonymous"}</UserName>
          </ProfileUser>
          <ProfileMeta>
            <LikeButton isLiked={isLiked} onClick={handleLike}>
              <Heart size={18} fill={isLiked ? "red" : "none"} stroke={isLiked ? "red" : "currentColor"} />
            </LikeButton>
            <span>{likes}</span>
          </ProfileMeta>
        </ProfileTop>
        <ProfileFooter>
          <ProfileTitle>{content}</ProfileTitle>
          <CommentSection>
            <MessageSquare size={16} />
            <ProfileAmount>{comments}</ProfileAmount>
          </CommentSection>
        </ProfileFooter>
        <ProfileDate>{formattedDate}</ProfileDate>
      </ProfileContent>
    </StyledProfile>
  );
};