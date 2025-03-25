import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Recycle, User, Map, Lightbulb, LogOut } from "lucide-react";
import { useAuth } from "../contexts/authContext";
import { doSignOut } from "../firebase/auth";
import "../styles/InnerDav.css";

function Navbar() {
  const navigate = useNavigate();
  const { user } = useAuth();
  console.log(user);

  const handleLogout = async () => {
    try {
      await doSignOut();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" className="logo-link">
            <Recycle className="logo-icon" />
            <span className="logo-text">EcoRecycle</span>
          </Link>
        </div>
        <div className="navbar-links">
          <Link to="dashboard" className="nav-link">
            <Recycle className="nav-icon" />
            <span>Dashboard</span>
          </Link>

          <Link to="info" className="nav-link">
            <User className="nav-icon" />
            <span>Profile</span>
          </Link>

          <Link to="map" className="nav-link">
            <Map className="nav-icon" />
            <span>Recycling Centers</span>
          </Link>

          <Link to="awareness" className="nav-link">
            <Lightbulb className="nav-icon" />
            <span>Awareness</span>
          </Link>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          <LogOut className="logout-icon" />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
