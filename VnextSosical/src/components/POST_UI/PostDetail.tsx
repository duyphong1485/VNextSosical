import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Spinner, Container, Form, Button } from "react-bootstrap";

interface Post {
  id: number;
  user: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false); // Trạng thái chỉnh sửa
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/posts/detail/${id}`);
        setPost(response.data);
        setTitle(response.data.title); // Khởi tạo form với dữ liệu hiện tại
        setContent(response.data.content);
      } catch (error: any) {
        console.error("Lỗi khi lấy chi tiết bài viết:", error.response?.data || error.message);
        setError(error.response?.data?.detail || "Không thể tải chi tiết bài viết.");
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetail();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Vui lòng đăng nhập để chỉnh sửa bài viết.");
      return;
    }

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/posts/update/${id}`,
        { title, content },
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setPost(response.data); // Cập nhật dữ liệu bài viết
      setIsEditing(false); // Thoát chế độ chỉnh sửa
    } catch (error: any) {
      console.error("Lỗi khi cập nhật bài viết:", error.response?.data || error.message);
      setError(error.response?.data?.detail || "Không thể cập nhật bài viết.");
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Spinner animation="border" role="status" />
        <span className="ms-2">Loading...</span>
      </div>
    );
  }

  if (error || !post) {
    return <div className="text-center mt-4">{error || "Bài viết không tồn tại."}</div>;
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center text-primary">Chi tiết bài viết</h2>
      {isEditing ? (
        <Form onSubmit={handleUpdate}>
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>Tiêu đề</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nhập tiêu đề"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formContent">
            <Form.Label>Nội dung</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Nhập nội dung"
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="me-2">
            Lưu
          </Button>
          <Button variant="secondary" onClick={() => setIsEditing(false)}>
            Hủy
          </Button>
        </Form>
      ) : (
        <Card className="shadow-sm p-3">
          <Card.Body>
            <Card.Title className="text-primary">{post.title}</Card.Title>
            <Card.Text style={{ fontSize: "1.2rem", whiteSpace: "pre-wrap", lineHeight: "1.6" }}>
              {post.content}
            </Card.Text>
            <div className="text-muted" style={{ fontSize: "0.9rem" }}>
              <div>Đăng bởi: {post.user}</div>
              <div>🕒 {new Date(post.created_at).toLocaleString()}</div>
              <div>🔄 {new Date(post.updated_at).toLocaleString()}</div>
            </div>
            <Button variant="warning" className="mt-3" onClick={() => setIsEditing(true)}>
              Chỉnh sửa
            </Button>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default PostDetail;