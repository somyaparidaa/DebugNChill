import React from "react";
import { Outlet } from "react-router-dom";
import InnerDav from "../components/InnerDav";
import Chatbot from "../components/Chatbot";
import "./UserProfile.css"; // Importing the CSS file

const UserProfile = () => {
  return (
    <div className="app-container">
      <InnerDav />
      <div className="content">
        <Outlet /> {/* This renders nested routes */}
      </div>
      <Chatbot />
    </div>
  );
};

export default UserProfile;
