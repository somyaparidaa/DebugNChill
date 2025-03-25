import React from "react";
import { Link } from "react-router";
import { Recycle, User, Map, Lightbulb } from "lucide-react";
import "../styles/InnerDav.css";

function Navbar() {
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
          <Link
            to="dashboard"
            className="nav-link"
            onClick={() => {
              console.log("hello");
            }}
          >
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
      </div>
    </nav>
  );
}

export default Navbar;
