import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Profile } from "./Profile";
import { Profiles } from "./Profiles";

const ProfileListWrapper = styled.div`
  margin-left: 600px;
  width: 60%;
  padding: 20px;
  margin-top: 220px;
  min-height: 100vh;
  @media (max-width: 768px) {
    margin-left: 100px;
  }
`;

const Message = styled.div<{ isError?: boolean }>`
  text-align: center;
  font-size: 18px;
  color: ${({ isError, theme }) => (isError ? "red" : theme.text)};
  padding: 20px;
`;

interface Comment {
  id: number;
  user: string;
  content: string;
  created_at: string;
}

interface ProfileData {
  id: number;
  user: string;
  content: string;
  created_at: string;
  updated_at: string;
  likes_count: number;
  comments_count: number;
  comments: Comment[];
  is_liked_by_user?: boolean;
}

export const ProfileList: React.FC = () => {
  const [profiles, setProfiles] = useState<ProfileData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getAuthToken = () => localStorage.getItem("token") || "";

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/posts/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAuthToken()}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch profiles");
        const data: ProfileData[] = await response.json();
        setProfiles(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  if (loading) return <ProfileListWrapper><Message>Loading profiles...</Message></ProfileListWrapper>;
  if (error) return <ProfileListWrapper><Message isError>{error}</Message></ProfileListWrapper>;

  return (
    <ProfileListWrapper>
      <Profiles>
        {profiles.map((profile) => (
          <Profile
            key={profile.id}
            profileId={profile.id}
            user={profile.user}
            content={profile.content}
            likes={profile.likes_count}
            comments={profile.comments_count}
            commentsList={profile.comments}
            createdAt={profile.created_at}
            isLikedByUser={profile.is_liked_by_user}
          />
        ))}
      </Profiles>
    </ProfileListWrapper>
  );
};