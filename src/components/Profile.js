import React from "react";
import { User, Award, Clock, Recycle } from "lucide-react";
import "../styles/Profile.css";

function Profile() {
  return (
    <div className="profile-container">
      {/* User Profile Card */}
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            <User size={48} />
          </div>
          <div className="profile-info">
            <h2 className="profile-name">John Doe</h2>
            <p className="profile-subtitle">Eco Warrior since 2023</p>
            <div className="profile-badge">
              <Award size={16} />
              <span>Level 5 Recycler</span>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="info-section">
        <div className="section-header">
          <Award size={20} />
          <h3>Achievements</h3>
        </div>
        <div className="section-content">
          <div className="achievement-item">
            <span className="achievement-name">First Recycling</span>
            <span className="achievement-complete">✓</span>
          </div>
          <div className="achievement-item">
            <span className="achievement-name">10 Items Recycled</span>
            <span className="achievement-complete">✓</span>
          </div>
          <div className="achievement-item">
            <span className="achievement-name">Electronics Expert</span>
            <span className="achievement-progress">In Progress</span>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="info-section">
        <div className="section-header">
          <Clock size={20} />
          <h3>Recent Activity</h3>
        </div>
        <div className="section-content">
          <div className="activity-item">
            <span className="activity-date">Today</span>
            <span className="activity-desc">Recycled old smartphone</span>
          </div>
          <div className="activity-item">
            <span className="activity-date">Yesterday</span>
            <span className="activity-desc">Recycled laptop battery</span>
          </div>
        </div>
      </div>

      {/* Impact Stats Section */}
      <div className="info-section">
        <div className="section-header">
          <Recycle size={20} />
          <h3>Impact Stats</h3>
        </div>
        <div className="section-content">
          <div className="stat-item">
            <span className="stat-label">Total Items Recycled</span>
            <span className="stat-value">35</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">CO₂ Saved</span>
            <span className="stat-value">250kg</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Points Earned</span>
            <span className="stat-value">1,250</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
