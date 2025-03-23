import React, { useState } from "react";
import { Container } from "react-bootstrap";
import CreatePostForm from "./CreatePost";
import PostList from "./PostList";

const PostPage: React.FC = () => {
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  const handlePostCreated = () => {
    setRefreshTrigger((prev) => prev + 1); // Thay đổi giá trị để trigger useEffect trong PostList
  };

  return (
    <Container>
      <CreatePostForm onPostCreated={handlePostCreated} />
      <PostList refreshTrigger={refreshTrigger} />
    </Container>
  );
};

export default PostPage;
