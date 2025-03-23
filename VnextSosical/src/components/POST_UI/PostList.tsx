import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Thêm useNavigate
import { Card, Spinner, Container, Row, Col } from "react-bootstrap";

interface Post {
  id: number;
  user: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

interface PostListProps {
  refreshTrigger: number;
}

const PostList: React.FC<PostListProps> = ({ refreshTrigger }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate(); // Thêm navigate để điều hướng

  useEffect(() => {
    fetchPosts();
  }, [refreshTrigger]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/posts/");
      setPosts(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy bài viết:", error);
      setError("Không thể tải danh sách bài post.");
    } finally {
      setLoading(false);
    }
  };

  const handlePostClick = (postId: number) => {
    navigate(`/posts/${postId}`); // Điều hướng đến trang chi tiết
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Spinner animation="border" role="status" />
        <span className="ms-2">Loading...</span>
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-4">{error}</div>;
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center text-primary">Danh sách bài viết</h2>
      {posts.length === 0 ? (
        <p className="text-center">Không có bài viết nào.</p>
      ) : (
        <Row>
          {posts.map((post) => (
            <Col key={post.id} md={12} className="mb-4">
              <Card
                className="shadow-sm p-3"
                onClick={() => handlePostClick(post.id)} // Thêm sự kiện nhấp chuột
                style={{ cursor: "pointer" }} // Thêm con trỏ để báo hiệu có thể nhấp
              >
                <Card.Body>
                  <Card.Title className="text-primary">{post.title}</Card.Title>
                  <Card.Text style={{ fontSize: "1.2rem", whiteSpace: "pre-wrap", lineHeight: "1.6" }}>
                    {post.content}
                  </Card.Text>
                  <div className="text-muted text-end" style={{ fontSize: "0.85rem" }}>
                    <div>🕒 {new Date(post.created_at).toLocaleString()}</div>
                    <div>🔄 {new Date(post.updated_at).toLocaleString()}</div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default PostList;