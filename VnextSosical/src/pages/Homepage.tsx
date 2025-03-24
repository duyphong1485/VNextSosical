import React from "react";
import { Header } from "../components/Header/Header";
import { SidebarNav } from "../components/SidebarNav/SidebarNav";
import { PostsList } from "../components/Card/PostList";

export const Homepage: React.FC = () => {
  return (
    <>
      <Header />
      <SidebarNav />
      <PostsList/>
    </>
  );
};