import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Calendar, Monitor, Battery, Cpu } from "lucide-react";
import "../styles/InnerDash.css";

const recyclingData = [
  { month: "Jan", electronics: 4, metals: 3 },
  { month: "Feb", electronics: 3, metals: 4 },
  { month: "Mar", electronics: 5, metals: 2 },
];

const timelineData = [
  {
    date: "2024-03-15",
    item: "Old Laptop",
    category: "Electronics",
    points: 50,
  },
  {
    date: "2024-03-10",
    item: "Copper Wires",
    category: "Metals",
    points: 30,
  },
];

function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-content">
            <Monitor className="stat-icon electronics-icon" />
            <div>
              <h3 className="stat-title">Electronics</h3>
              <p className="stat-value">12 items</p>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <Battery className="stat-icon batteries-icon" />
            <div>
              <h3 className="stat-title">Batteries</h3>
              <p className="stat-value">8 items</p>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <Cpu className="stat-icon components-icon" />
            <div>
              <h3 className="stat-title">Components</h3>
              <p className="stat-value">15 items</p>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <Calendar className="stat-icon points-icon" />
            <div>
              <h3 className="stat-title">Total Points</h3>
              <p className="stat-value">250</p>
            </div>
          </div>
        </div>
      </div>

      <div className="chart-container">
        <h2 className="section-title">Recycling Statistics</h2>
        <div className="chart-wrapper">
          <BarChart width={600} height={300} data={recyclingData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="electronics" fill="#4CAF50" />
            <Bar dataKey="metals" fill="#2196F3" />
          </BarChart>
        </div>
      </div>

      <div className="activity-container">
        <h2 className="section-title">Recent Activity</h2>
        <div className="timeline">
          {timelineData.map((item, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <p className="timeline-date">{item.date}</p>
                <p className="timeline-title">{item.item}</p>
                <p className="timeline-category">Category: {item.category}</p>
                <p className="timeline-points">+{item.points} points</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
