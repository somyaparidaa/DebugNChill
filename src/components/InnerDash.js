import React, { useState } from 'react';
import "../styles/InnerDash.css"; // Keep the original import
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
import { 
  Monitor, 
  Battery, 
  Cpu, 
  Calendar, 
  ArrowUpRight,
  ArrowDownRight 
} from 'lucide-react';

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
  const [activeFilter, setActiveFilter] = useState('all');

  const statsCards = [
    {
      icon: <Monitor className="stat-icon electronics-icon" />,
      title: "Electronics",
      value: "12 items"
    },
    {
      icon: <Battery className="stat-icon batteries-icon" />,
      title: "Batteries",
      value: "8 items"
    },
    {
      icon: <Cpu className="stat-icon components-icon" />,
      title: "Components",
      value: "15 items"
    },
    {
      icon: <Calendar className="stat-icon points-icon" />,
      title: "Total Points",
      value: "250"
    }
  ];

  const filteredTimeline = activeFilter === 'all' 
    ? timelineData 
    : timelineData.filter(item => item.category.toLowerCase() === activeFilter);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Recycling Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="stats-grid">
        {statsCards.map((card, index) => (
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

      {/* Recycling Statistics */}
      <div className="chart-container">
        <h2 className="section-title">Recycling Statistics</h2>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={recyclingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #ddd', 
                  borderRadius: '8px' 
                }}
              />
              <Legend />
              <Bar dataKey="electronics" fill="#10B981" name="Electronics" />
              <Bar dataKey="metals" fill="#3B82F6" name="Metals" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="activity-container">
        <div className="activity-header">
          <h2 className="section-title">Recent Activity</h2>
          <div className="activity-filters">
            {['All', 'Electronics', 'Metals'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter.toLowerCase())}
                className={`activity-filter ${
                  activeFilter === filter.toLowerCase() ? 'active' : ''
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
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
    </div>
  );
}

export default Dashboard;