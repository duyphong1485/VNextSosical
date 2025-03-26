// src/hooks/useCreatePost.ts
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  likes_count: number;
  comments_count: number;
}

interface CreatePostResponse {
  uid: number;
  token: string | null;
  post: Post;
}

interface ErrorResponse {
  uid: number | null;
  token: string | null;
  errors?: Record<string, string[]>;
  error?: string;
}

export const useCreatePost = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const createPost = async (title: string, content: string, token: string | null) => {
    setLoading(true);
    setError(null);

    if (!title.trim() || !content.trim()) {
      setError("Title and content cannot be empty");
      setLoading(false);
      return;
    }

    if (!token) {
      setError("You must be logged in to create a post");
      navigate("/sign-in");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/posts/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      console.log("Response status:", response.status);

      let result: any;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        result = await response.json();
      } else {
        const text = await response.text();
        console.log("Response text:", text);
        throw new Error("Server returned non-JSON response");
      }

      console.log("Response data:", result);

      if (!response.ok) {
        const errorData: ErrorResponse = result;
        if (response.status === 500) {
          throw new Error(errorData.error || "Internal server error");
        }
        const errorMessages = errorData.errors
          ? Object.entries(errorData.errors)
              .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
              .join("; ")
          : errorData.error || "Failed to create post";
        throw new Error(errorMessages);
      }

      const successData: CreatePostResponse = result;
      const newPost = successData.post;

      if (!newPost || typeof newPost.id === "undefined") {
        throw new Error("Invalid response: Post ID not found");
      }

      navigate(`/post/${newPost.id}`);
    } catch (err) {
      if (err instanceof TypeError && err.message === "Failed to fetch") {
        setError("Cannot connect to the server. Please check if the backend is running.");
      } else {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
      console.error("Error details:", err);
    } finally {
      setLoading(false);
    }
  };

  return { createPost, error, loading };
};