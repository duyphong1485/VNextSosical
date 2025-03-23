import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Spinner } from "react-bootstrap";

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Vui lòng đăng nhập để tạo bài viết.");
      return;
    }

    setLoading(true);
    setError("");

    console.log("Dữ liệu gửi đi:", { title, content }); // Debug dữ liệu gửi đi

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/posts/create/",
        { title, content },
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Bài viết đã được tạo:", response.data);
      navigate(`/posts/${response.data.id}`);
    } catch (error: any) {
      console.error("Lỗi khi tạo bài viết:", error.response?.data || error.message);
      setError(error.response?.data?.detail || "Không thể tạo bài viết.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center text-primary">Tạo bài viết mới</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Tiêu đề</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Nhập tiêu đề"
            required
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
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? (
            <>
              <Spinner as="span" animation="border" size="sm" className="me-2" />
              Đang tạo...
            </>
          ) : (
            "Tạo bài viết"
          )}
        </Button>
      </Form>
    </Container>
  );
};

export default CreatePost;