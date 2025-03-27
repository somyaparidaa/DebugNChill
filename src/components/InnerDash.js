import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User, Award, Clock, Recycle, Monitor, Battery, Cpu, Calendar } from "lucide-react";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../firebase/firebase";
import "../styles/InnerDash.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const recyclingData = [
  { month: "Jan", electronics: 4, metals: 3 },
  { month: "Feb", electronics: 3, metals: 4 },
  { month: "Mar", electronics: 5, metals: 2 },
];

const timelineData = [
  { date: "2024-03-15", item: "Old Laptop", category: "Electronics", points: 50 },
  { date: "2024-03-10", item: "Copper Wires", category: "Metals", points: 30 },
];

function InnerDash() {
  const [userName, setUserName] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        try {
          const userDocRef = doc(db, "users", uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const data = userDocSnap.data();
            if (data.name) {
              setUserName(data.name);
            }
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const filteredTimeline = activeFilter === "all"
    ? timelineData
    : timelineData.filter(item => item.category.toLowerCase() === activeFilter);

  return (
    <div className="dashboard-container">
      {/* User Profile Section */}
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            <User size={48} />
          </div>
          <div className="profile-info">
            <h2 className="profile-name">{userName}</h2>
            <p className="profile-subtitle">Eco Warrior since 2023</p>
            <div className="profile-badge">
              <Award size={16} />
              <span>Level 5 Recycler</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {[
          { icon: <Monitor />, title: "Electronics", value: "12 items" },
          { icon: <Battery />, title: "Batteries", value: "8 items" },
          { icon: <Cpu />, title: "Components", value: "15 items" },
          { icon: <Calendar />, title: "Total Points", value: "250" }
        ].map((card, index) => (
          <div key={index} className="stat-card">
            <div className="stat-content">
              {card.icon}
              <div>
                <h3 className="stat-title">{card.title}</h3>
                <p className="stat-value">{card.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Achievements Section */}
      <div className="info-section">
        <div className="section-header">
          <Award size={20} />
          <h3>Achievements</h3>
        </div>
        <div className="section-content">
          {[
            { name: "First Recycling", status: "✓" },
            { name: "10 Items Recycled", status: "✓" },
            { name: "Electronics Expert", status: "In Progress" }
          ].map((achievement, index) => (
            <div key={index} className="achievement-item">
              <span className="achievement-name">{achievement.name}</span>
              <span className="achievement-complete">{achievement.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recycling Statistics */}
      <div className="chart-container">
        <h2 className="section-title">Recycling Statistics</h2>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={recyclingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="electronics" fill="#10B981" name="Electronics" />
              <Bar dataKey="metals" fill="#3B82F6" name="Metals" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="info-section">
        <div className="section-header">
          <Clock size={20} />
          <h3>Recent Activity</h3>
        </div>
        <div className="activity-filters">
          {["All", "Electronics", "Metals"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter.toLowerCase())}
              className={`activity-filter ${activeFilter === filter.toLowerCase() ? "active" : ""}`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="timeline">
          {filteredTimeline.map((item, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <p className="timeline-date">{item.date}</p>
                <div className="timeline-item-header">
                  <h3 className="timeline-title">{item.item}</h3>
                  <span className="timeline-category">{item.category}</span>
                </div>
                <p className="timeline-points">+{item.points} points</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Impact Stats */}
      <div className="info-section">
        <div className="section-header">
          <Recycle size={20} />
          <h3>Impact Stats</h3>
        </div>
        <div className="section-content">
          {[
            { label: "Total Items Recycled", value: "35" },
            { label: "CO₂ Saved", value: "250kg" },
            { label: "Points Earned", value: "1,250" }
          ].map((stat, index) => (
            <div key={index} className="stat-item">
              <span className="stat-label">{stat.label}</span>
              <span className="stat-value">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InnerDash;