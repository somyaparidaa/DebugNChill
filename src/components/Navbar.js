import React from "react";
import "../styles/Navbar.css";

const Header = () => {
  return (
    <header className="nav">
      <div className="logo" id="logo">TechCycle</div>
      <nav>
        <a href="#" className="nav-link">Home</a>
        <a href="#" className="nav-link">About us</a>
        <a href="#" className="nav-link">FAQs</a>
        <a href="#" className="nav-link">Contact us</a>
      </nav>
      <a href="#" className="login-btn" id="loginBtn">Login</a>
    </header>
  );
};

export default Header;


