import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { Heart, MessageSquare } from "lucide-react";

interface Comment {
  id: number;
  user: string;
  content: string;
  created_at: string;
}

interface ProfileProps {
  user: string;
  content: string;
  likes: number;
  comments: number;
  commentsList: Comment[];
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
`;

const CommentSection = styled.div`
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

const CommentsContainer = styled.div`
  margin-top: 20px;
  padding: 10px;
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.text}20;
`;

const CommentItem = styled.div`
  padding: 8px 0;
  border-bottom: 1px solid ${({ theme }) => theme.text}10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:last-child {
    border-bottom: none;
  }
`;

const CommentUser = styled.span`
  font-weight: bold;
  color: rgb(245, 151, 10);
  margin-right: 8px;
`;

const CommentContent = styled.span`
  color: ${({ theme }) => theme.text};
`;

const CommentActions = styled.div`
  display: flex;
  gap: 10px;
`;

const CommentButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  font-size: 12px;
`;

const CommentInput = styled.textarea`
  width: 100%;
  padding: 8px;
  margin-top: 10px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.text}20;
  background-color: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.text};
  resize: vertical;
`;

export const Profile: React.FC<ProfileProps> = ({
  user,
  content,
  likes: initialLikes,
  comments: initialComments,
  commentsList: initialCommentsList,
  createdAt,
  profileId,
  isLikedByUser = false,
}) => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(isLikedByUser);
  const [comments, setComments] = useState(initialComments);
  const [commentsList, setCommentsList] = useState(initialCommentsList);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState("");

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

  const handleCreateComment = useCallback(async () => {
    if (!newComment.trim()) return;

    const url = "http://localhost:8000/api/comments/";
    const body = { post_id: profileId, content: newComment };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error("Failed to create comment");

      const newCommentData = await response.json();
      setCommentsList((prev) => [...prev, newCommentData]);
      setComments((prev) => prev + 1);
      setNewComment("");
    } catch (err) {
      console.error("Error:", err);
    }
  }, [newComment, profileId]);

  const handleEditComment = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditedContent(comment.content);
  };

  const handleUpdateComment = useCallback(async (commentId: number) => {
    if (!editedContent.trim()) return;

    const url = "http://localhost:8000/api/comments/";
    const body = { comment_id: commentId, content: editedContent };

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error("Failed to update comment");

      const updatedComment = await response.json();
      setCommentsList((prev) =>
        prev.map((c) => (c.id === commentId ? updatedComment : c))
      );
      setEditingCommentId(null);
      setEditedContent("");
    } catch (err) {
      console.error("Error:", err);
    }
  }, [editedContent]);

  const handleDeleteComment = useCallback(async (commentId: number) => {
    const url = "http://localhost:8000/api/comments/";
    const body = { comment_id: commentId };

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error("Failed to delete comment");

      setCommentsList((prev) => prev.filter((c) => c.id !== commentId));
      setComments((prev) => prev - 1);
    } catch (err) {
      console.error("Error:", err);
    }
  }, []);

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
        <CommentsContainer>
          {commentsList.length > 0 ? (
            commentsList.map((comment) => (
              <CommentItem key={comment.id}>
                {editingCommentId === comment.id ? (
                  <>
                    <CommentInput
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                    />
                    <CommentActions>
                      <CommentButton onClick={() => handleUpdateComment(comment.id)}>
                        Save
                      </CommentButton>
                      <CommentButton onClick={() => setEditingCommentId(null)}>
                        Cancel
                      </CommentButton>
                    </CommentActions>
                  </>
                ) : (
                  <>
                    <div>
                      <CommentUser>{comment.user}</CommentUser>
                      <CommentContent>{comment.content}</CommentContent>
                    </div>
                    <CommentActions>
                      <CommentButton onClick={() => handleEditComment(comment)}>
                        Edit
                      </CommentButton>
                      <CommentButton onClick={() => handleDeleteComment(comment.id)}>
                        Delete
                      </CommentButton>
                    </CommentActions>
                  </>
                )}
              </CommentItem>
            ))
          ) : (
            <CommentContent>No comments yet.</CommentContent>
          )}
          <CommentInput
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleCreateComment()}
          />
        </CommentsContainer>
      </ProfileContent>
    </StyledProfile>
  );
};