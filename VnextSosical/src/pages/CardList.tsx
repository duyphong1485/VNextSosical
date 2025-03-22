import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card/Card"; 
import Card2 from "../components/Card/Card2"; 
import styled from "styled-components";


const StyledCardList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 90px 30px;
  padding: 30px;
`;

interface Post {
  id: number;
  image_url: string;
  title: string;
  amount: string;
  author: {
    username: string;
    avatar_url: string;
  };
  likes_count: number;
}

const CardList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);  
  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => {
    // Gọi API để lấy dữ liệu bài đăng
    axios
      .get("http://127.0.0.1:8000/api/posts/") 
      .then((response) => {
        setPosts(response.data); 
        setLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu: ", error);
        setLoading(false);
      });
  }, []); 

  if (loading) {
    return <div>Đang tải...</div>; 
  }

  return (
    <StyledCardList>
      {posts.map((post) => (
        <div key={post.id}>
          <Card post={post} />
          <Card2 post={post} />
        </div>
      ))}
    </StyledCardList>
  );
};

export default CardList;
