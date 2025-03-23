import React, { useState } from "react";
import { Form, Button, Alert, Card } from "react-bootstrap";
import axios from "axios";

interface CreatePostFormProps {
  onPostCreated: () => void; // Hàm gọi lại để cập nhật danh sách bài viết sau khi tạo
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ onPostCreated }) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!title || !content) {
      setError("Tiêu đề và nội dung không được để trống!");
      return;
    }

    try {
      const token = localStorage.getItem("access_token"); // Lấy token từ localStorage
      if (!token) {
        setError("Bạn cần đăng nhập để đăng bài!");
        return;
      }

      await axios.post(
        "http://127.0.0.1:8000/api/posts/",
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTitle("");
      setContent("");
      setSuccess("Bài viết đã được đăng thành công!");
      onPostCreated(); // Gọi lại để cập nhật danh sách bài viết
    } catch (error) {
      setError("Lỗi khi đăng bài viết!");
    }
  };

  return (
    <Card className="mb-4 p-4 shadow-sm">
      <h4 className="text-center">📝 Tạo bài viết mới</h4>
      <Form onSubmit={handleCreatePost}>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Form.Group className="mb-3">
          <Form.Label>Tiêu đề</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập tiêu đề bài viết..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Nội dung</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Nhập nội dung bài viết..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Đăng bài viết
        </Button>
      </Form>
    </Card>
  );
};

export default CreatePostForm;
