import React from "react";
import { Header } from "../components/Header/Header";
import { SidebarNav } from "../components/SidebarNav/SidebarNav";
import { ProfileList } from "../components/Profile/ProfileList";

export const Profilepage: React.FC = () => {
  return (
    <>
      <Header />
      <SidebarNav />
      <ProfileList/>
    </>
  );
};