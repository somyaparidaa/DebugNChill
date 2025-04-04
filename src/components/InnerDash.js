import React, { useState } from 'react';
import "../styles/InnerDash.css"
import {
  Monitor,
  Battery,
  Cpu,
  Calendar,
  User,
  Award,
  Clock,
  Recycle,
  ChevronDown,
  ChevronUp,
  Newspaper,
  ExternalLink
} from 'lucide-react';
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
import '../styles/InnerDash.css';

function RecyclingDashboard() {
  const [activeSection, setActiveSection] = useState({
    achievements: true,
    activity: true,
    impact: true
  });

  const [activeFilter, setActiveFilter] = useState('all');

  const toggleSection = (section) => {
    setActiveSection(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

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

  // E-Waste News Data
  const ewasteNews = [
    {
      headline: "New E-Waste Recycling Center Opens",
      date: "April 1, 2025",
      summary: "A state-of-the-art e-waste recycling facility has opened in the downtown area, making it easier for residents to dispose of electronics responsibly.",
      link: "#"
    },
    {
      headline: "Study Shows Rising E-Waste Concerns",
      date: "March 28, 2025",
      summary: "Recent research indicates that e-waste is growing at 3x the rate of regular municipal waste. Learn how you can help reduce the impact.",
      link: "#"
    },
    {
      headline: "Mobile Recycling Program This Weekend",
      date: "March 25, 2025",
      summary: "The mobile recycling unit will be at Central Park this Saturday from 9am-2pm. Bring your old devices and earn extra recycling points!",
      link: "#"
    }
  ];

  const filteredTimeline = activeFilter === 'all'
    ? timelineData
    : timelineData.filter(item => item.category.toLowerCase() === activeFilter);

  const statsCards = [
    { 
      icon: <Monitor className="stat-icon electronics-icon" />, 
      title: "Electronics", 
      value: "12 items",
      subtitle: "+2 this month"
    },
    { 
      icon: <Battery className="stat-icon batteries-icon" />, 
      title: "Batteries", 
      value: "8 items",
      subtitle: "+1 this month"
    },
    { 
      icon: <Cpu className="stat-icon components-icon" />, 
      title: "Components", 
      value: "15 items",
      subtitle: "+3 this month"
    },
    { 
      icon: <Calendar className="stat-icon points-icon" />, 
      title: "Total Points", 
      value: "250",
      subtitle: "+45 this month"
    }
  ];

  return (
    <div className="recycling-dashboard">
      <div className="main-content">
        <h1 className="dashboard-welcome">Welcome Back, Yug Agarwal</h1>

        <div className="stats-grid">
          {statsCards.map((card, index) => (
            <div key={index} className="stat-card">
              {card.icon}
              <div className="stat-card-content">
                <div className="stat-card-title">{card.title}</div>
                <div className="stat-card-value">{card.value}</div>
                <div className="stat-card-subtitle">{card.subtitle}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="recycling-chart-container">
          <h2 className="section-titles">Recycling Statistics</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={recyclingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="electronics" fill="#10B981" name="Electronics" />
              <Bar dataKey="metals" fill="#3B82F6" name="Metals" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="recent-activity-container">
          <div className="activity-header">
            <h2 className="section-titles">Recent Activity</h2>
            <div className="activity-filters">
              {['All', 'Electronics', 'Metals'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter.toLowerCase())}
                  className={`filter-button ${activeFilter === filter.toLowerCase() ? 'active' : ''}`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          
          <div className="activity-timeline">
            {filteredTimeline.map((item, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-content">
                  <div className="timeline-date">{item.date}</div>
                  <div className="timeline-item-details">
                    <div className="timeline-item-name">{item.item}</div>
                    <div className="timeline-item-category">{item.category}</div>
                  </div>
                  <div className="timeline-points">+{item.points} pts</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="profile-sidebar">
        <div className="profile-header">
          <div className="profile-avatar">
            <User size={48} />
          </div>
          <h2 className="profile-name">John Doe</h2>
          <p className="profile-subtitle">Eco Warrior since 2023</p>
          <div className="profile-level-badge">Level 5 Recycler</div>
        </div>

        <div className="profile-progress">
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
          <div className="progress-text">Next Level: 25% to go</div>
        </div>

        <div className="profile-achievements">
          <div className="section-header">
            <Award />
            <h3>Achievements</h3>
          </div>
          <div className="achievements-list">
            {[
              { name: "First Recycling", status: "completed" },
              { name: "10 Items Recycled", status: "completed" },
              { name: "Electronics Expert", status: "in-progress" }
            ].map((achievement, index) => (
              <div key={index} className="achievement-item">
                <span>{achievement.name}</span>
                <span className={`achievement-status ${achievement.status}`}>
                  {achievement.status === 'completed' ? '✓' : 'In Progress'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* E-Waste News Component */}
      <div className="ewaste-news-container">
        <div className="news-title">
          <Newspaper size={20} />
          <span>E-Waste News & Updates</span>
        </div>
        
        {ewasteNews.map((news, index) => (
          <div key={index} className="news-item">
            <div className="news-headline">{news.headline}</div>
            <div className="news-date">{news.date}</div>
            <div className="news-summary">{news.summary}</div>
            <a href={news.link} className="news-link">
              Read more <ExternalLink size={14} style={{ verticalAlign: 'middle' }} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecyclingDashboard;