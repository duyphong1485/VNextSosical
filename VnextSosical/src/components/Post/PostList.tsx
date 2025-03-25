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

const Message = styled.div<{ isError?: boolean }>`
  text-align: center;
  font-size: 18px;
  color: ${({ isError, theme }) => (isError ? "red" : theme.text)};
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
  is_liked_by_user: boolean;
}

export const PostsList: React.FC = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const token = () => localStorage.getItem("token");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/posts/", {
          method: "GET",
          headers: {
            Authorization: `Token ${token()}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch posts");

        // Lấy toàn bộ dữ liệu trả về từ API
        const responseData = await response.json();
        // Đảm bảo rằng bạn chỉ set state với mảng các posts
        setPosts(responseData.posts);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);


  if (loading) return <PostsListWrapper><Message>Loading posts...</Message></PostsListWrapper>;
  if (error) return <PostsListWrapper><Message isError>{error}</Message></PostsListWrapper>;

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
            isLikedByUser={post.is_liked_by_user}
          />
        ))}
      </Posts>
    </PostsListWrapper>
  );
};
