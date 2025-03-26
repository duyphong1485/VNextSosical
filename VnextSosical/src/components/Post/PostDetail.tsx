import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";
import { Heart, MessageSquare, Share2, Home, User, LogOut, Sun, Moon } from "lucide-react";
import { useParams } from "react-router-dom";
import { useTheme } from "../ThemeContext/ThemeContext";

// Header Styles
const HeaderWrapper = styled.header`
  background-color: ${(props) => props.theme.cardBackground};
  color: ${(props) => props.theme.text};
  padding: 15px 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const HeaderTop = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  gap: 40px;
`;

const HeaderLogo = styled.img`
  width: 180px;
  height: auto;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 30px;
`;

const HeaderNavLink = styled(RouterLink)`
  color: rgb(245, 151, 10);
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  transition: color 0.2s ease;
  &:hover {
    color: orange;
  }
`;

const SearchArea = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 700px;
  justify-content: center;
`;

const ProfileAvatar = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid rgb(245, 151, 10);
  transition: border-color 0.2s ease;
  &:hover {
    border-color: orange;
  }
`;

const SearchBar = styled.input`
  padding: 10px 15px;
  border-radius: 20px;
  border: 1px solid #ddd;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  width: 100%;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease, background-color 0.3s ease, color 0.3s ease;
  &:focus {
    border-color: rgb(245, 151, 10);
  }
`;

// Sidebar Styles
const Sidebar = styled.nav<{ darkMode?: boolean }>`
  position: fixed;
  top: 270px;
  left: 20px;
  width: 260px;
  height: 280px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.cardBackground};
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.05);
  transition: background-color 0.3s ease;
  @media (max-width: 768px) {
    width: 80px;
    align-items: center;
  }
`;

const SidebarLink = styled(RouterLink)`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  text-decoration: none;
  color: rgb(245, 151, 10);
  font-weight: 500;
  font-size: 17px;
  gap: 12px;
  transition: color 0.2s ease, background-color 0.2s ease;
  &:hover {
    color: orange;
    background-color: rgba(245, 151, 10, 0.1);
  }
  @media (max-width: 768px) {
    justify-content: center;
    span {
      display: none;
    }
  }
`;

const ThemeToggle = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 15px 20px;
  color: rgb(245, 151, 10);
  font-size: 17px;
  font-weight: 500;
  gap: 12px;
  transition: color 0.2s ease, background-color 0.2s ease;
  &:hover {
    color: orange;
    background-color: rgba(245, 151, 10, 0.1);
  }
  @media (max-width: 768px) {
    justify-content: center;
    span {
      display: none;
    }
  }
`;

// Post Detail Styles
const DetailPageWrapper = styled.div`
  min-height: 100vh;
  background: rgba(255, 255, 255, 0.9);
  padding: 120px 300px 60px 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    padding: 100px 20px;
  }
`;

const DetailCard = styled.div`
  max-width: 1000px;
  width: 100%;
  background: ${(props) => props.theme.cardBackground};
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ImageSection = styled.div`
  flex: 1;
  min-height: 500px;
  position: relative;
`;

const PostImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
  &:hover {
    transform: scale(1.03);
  }
`;

const Overlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
`;

const ContentSection = styled.div`
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${(props) => props.theme.text};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 25px;
`;

const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const UserDetails = styled.div`
  color: ${(props) => props.theme.text};
`;

const UserName = styled.h2`
  font-size: 22px;
  font-weight: 600;
  margin: 0;
  color: #e94560;
`;

const PostTime = styled.span`
  font-size: 14px;
  color: #666;
`;

const Content = styled.div`
  flex-grow: 1;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: ${(props) => props.theme.text};
  margin: 0 0 20px 0;
  line-height: 1.3;
`;

const EditInput = styled.textarea`
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  font-size: 16px;
  resize: vertical;
  outline: none;
  transition: border-color 0.3s ease;
  &:focus {
    border-color: rgb(245, 151, 10);
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 25px;
  margin-top: 30px;
`;

const ActionButton = styled.button<{ isLiked?: boolean }>`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  color: ${(props) => (props.isLiked ? "#e94560" : "#666")};
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    color: #e94560;
    transform: translateY(-2px);
  }
`;

const ShareButton = styled(ActionButton)`
  color: #666;
`;

const EditButton = styled.button`
  background: rgb(245, 151, 10);
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background: orange;
  }
`;

const SaveButton = styled(EditButton)`
  background: #28a745;
  &:hover {
    background: #218838;
  }
`;

const CancelButton = styled(EditButton)`
  background: #dc3545;
  margin-left: 10px;
  &:hover {
    background: #c82333;
  }
`;

const LoadingWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.background};
`;

const LoadingSpinner = styled.div`
  font-size: 20px;
  color: ${(props) => props.theme.text};
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
`;

const ErrorWrapper = styled(LoadingWrapper)``;
const ErrorText = styled(LoadingSpinner)`
  color: #e94560;
`;
const PostButton = styled(RouterLink)`
  background: rgb(245, 151, 10);
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background: orange;
  }
`;

// Interface
interface PostData {
  id: number;
  user: string;
  content: string;
  created_at: string;
  likes_count: number;
  comments_count: number;
}

// Components
const HeaderComponent: React.FC = () => {
  return (
    <HeaderWrapper>
      <HeaderContent>
        <HeaderTop>
          <HeaderLogo src="https://via.placeholder.com/180x50" alt="VNext Social" />
          <NavLinks>
            <HeaderNavLink to="/homepage">Home</HeaderNavLink>
            <HeaderNavLink to="/profile">Profile</HeaderNavLink>
            <HeaderNavLink to="/find-friend">Find Friend</HeaderNavLink>
          </NavLinks>
        </HeaderTop>
        <SearchArea>
          <ProfileAvatar src="https://via.placeholder.com/50" alt="User Avatar" />
          <SearchBar type="text" placeholder="Search..." />
        </SearchArea>
      </HeaderContent>
    </HeaderWrapper>
  );
};

const SidebarNav: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <Sidebar darkMode={darkMode}>
      <SidebarLink to="/homepage">
        <Home size={22} />
        <span>Home</span>
      </SidebarLink>
      <SidebarLink to="/profile">
        <User size={22} />
        <span>Profile</span>
      </SidebarLink>
      <ThemeToggle onClick={toggleDarkMode}>
        {darkMode ? <Sun size={22} /> : <Moon size={22} />}
        <span>{darkMode ? "Light" : "Dark"}</span>
      </ThemeToggle>
      <SidebarLink to="/sign-in">
        <LogOut size={22} />
        <span>Logout</span>
      </SidebarLink>
    </Sidebar>
  );
};

// Main Component
export const PostDetail: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/posts/detail/${postId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }
        const data: PostData = await response.json();
        setPost(data);
        setEditedContent(data.content);
        setLikes(data.likes_count);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleLike = async () => {
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

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/posts/update/${postId}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: editedContent }),
      });
      if (!response.ok) throw new Error("Failed to update post");
      const updatedPost = await response.json();
      setPost(updatedPost);
      setIsEditing(false);
    } catch (err) {
      console.error("Error:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContent(post?.content || "");
  };

  if (loading) {
    return (
      <LoadingWrapper>
        <LoadingSpinner>Loading...</LoadingSpinner>
      </LoadingWrapper>
    );
  }

  if (error || !post) {
    return (
      <ErrorWrapper>
        <ErrorText>{error || "Post not found"}</ErrorText>
      </ErrorWrapper>
    );
  }

  const formattedDate = new Date(post.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <HeaderComponent />
      <SidebarNav />
      <DetailPageWrapper>
        <DetailCard>
          <ImageSection>
            <PostImage
              src="https://cdn.dribbble.com/users/2400293/screenshots/19060197/media/82d672bd58929b313f4805df5e48d586.png?compress=1&resize=400x300&vertical=top"
              alt="Post image"
            />
            <Overlay />
          </ImageSection>
          <ContentSection>
            <div>
              <Header>
                <Avatar
                  src="https://cdn.dribbble.com/users/2400293/screenshots/16527147/media/f079dc5596a5fb770016c4ea506cd77b.png?compress=1&resize=1000x750&vertical=top"
                  alt={post.user}
                />
                <UserDetails>
                  <UserName>@{post.user || "Anonymous"}</UserName>
                  <PostTime>{formattedDate}</PostTime>
                </UserDetails>
              </Header>
              <Content>
                {isEditing ? (
                  <EditInput
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    rows={4}
                  />
                ) : (
                  <Title>{post.content}</Title>
                )}
              </Content>
            </div>
            <Actions>
              <ActionButton isLiked={isLiked} onClick={handleLike}>
                <Heart size={24} fill={isLiked ? "#e94560" : "none"} stroke={isLiked ? "#e94560" : "#666"} />
                <span>{likes}</span>
              </ActionButton>
              <ActionButton>
                <MessageSquare size={24} />
                <span>{post.comments_count}</span>
              </ActionButton>
              <ShareButton>
                <Share2 size={24} />
                <span>Share</span>
              </ShareButton>
              {isEditing ? (
                <>
                  <SaveButton onClick={handleUpdate}>Save</SaveButton>
                  <CancelButton onClick={handleCancelEdit}>Cancel</CancelButton>
                </>
              ) : (
<>
                  <EditButton onClick={handleEditClick}>Edit</EditButton>
                  <PostButton to="/homepage">
                    Post
                  </PostButton>
                </>
                
              )}
            </Actions>
          </ContentSection>
        </DetailCard>
      </DetailPageWrapper>
    </>
  );
};