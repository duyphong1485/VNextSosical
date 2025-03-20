import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 30px;
`;

const LogoItem = styled(Link)`
  display: inline-block;
`;

const LogoImage = styled.img`
  width: 40px;
  height: auto;
  object-fit: contain;
`;

const LogoSNS = () => {
  return (
    <Container>
      <LogoItem to="/facebook">
        <LogoImage src="/public/facebook.png" alt="Facebook Logo" />
      </LogoItem>
      <LogoItem to="/instagram">
        <LogoImage src="/public/instagram.png" alt="Instagram Logo" />
      </LogoItem>
      <LogoItem to="/google">
        <LogoImage src="/public/google.png" alt="Google Logo" />
      </LogoItem>
    </Container>
  );
};

export default LogoSNS;
