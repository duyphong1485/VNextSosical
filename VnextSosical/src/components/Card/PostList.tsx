import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Post } from "./Post";
import { Posts } from "./Posts";

const PostsListWrapper = styled.div`
  margin-left: 260px;
  padding: 20px;
  margin-top: 220px;
  min-height: 100vh;
  @media (max-width: 768px) {
    margin-left: 100px;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 18px;
  color: ${(props) => props.theme.text};
  padding: 20px;
`;

const ErrorMessage = styled.div`
  text-align: center;
  font-size: 18px;
  color: red;
  padding: 20px;
`;

interface PostData {
  id: number;
  user: string;
  content: string;
  created_at: string;
  updated_at: string;
  likes_count: number;
  comments_count: number;
}

export const PostsList: React.FC = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/posts/");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data: PostData[] = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <PostsListWrapper>
        <LoadingMessage>Loading posts...</LoadingMessage>
      </PostsListWrapper>
    );
  }

  if (error) {
    return (
      <PostsListWrapper>
        <ErrorMessage>{error}</ErrorMessage>
      </PostsListWrapper>
    );
  }

  return (
    <PostsListWrapper>
      <Posts>
        {posts.map((post) => (
          <Post
            key={post.id}
            postId={post.id}
            user={post.user}
            content={post.content}
            likes={post.likes_count}
            comments={post.comments_count}
            createdAt={post.created_at}
          />
        ))}
      </Posts>
    </PostsListWrapper>
  );
};