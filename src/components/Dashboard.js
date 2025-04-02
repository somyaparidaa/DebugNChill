import React from "react";
import "../styles/Dashboard.css";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Sample data for the dashboard
  const stats = {
    totalCollected: 4827,
    deviceTypes: {
      smartphones: 1236,
      laptops: 896,
      computers: 742,
      tablets: 584,
      peripherals: 1369
    },
    materialsSaved: {
      plastic: 6342,
      metals: 4521,
      rareEarth: 328,
      glass: 1897
    },
    monthlyCollection: [
      { month: "Jan", amount: 342 },
      { month: "Feb", amount: 386 },
      { month: "Mar", amount: 412 },
      { month: "Apr", amount: 387 },
      { month: "May", amount: 452 },
      { month: "Jun", amount: 518 },
      { month: "Jul", amount: 489 },
      { month: "Aug", amount: 534 },
      { month: "Sep", amount: 461 },
      { month: "Oct", amount: 427 },
      { month: "Nov", amount: 419 },
      { month: "Dec", amount: 0 }
    ],
    environmentalImpact: {
      co2Reduced: 78.4,
      waterSaved: 1243,
      energySaved: 36712
    },
    recyclingEfficiency: {
      reused: 45,
      recycled: 35,
      landfill: 20
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">E-Waste Management Dashboard</h1>
      
      <div className="dashboard-summary">
        <div className="summary-card">
          <h3>Total Devices Collected</h3>
          <p className="stat-number">{stats.totalCollected}</p>
          <p className="stat-label">devices</p>
        </div>
        <div className="summary-card">
          <h3>CO₂ Emissions Prevented</h3>
          <p className="stat-number">{stats.environmentalImpact.co2Reduced}</p>
          <p className="stat-label">tons</p>
        </div>
        <div className="summary-card">
          <h3>Materials Recovered</h3>
          <p className="stat-number">
            {Object.values(stats.materialsSaved).reduce((a, b) => a + b, 0)}
          </p>
          <p className="stat-label">kg</p>
        </div>
        <div className="summary-card">
          <h3>Energy Saved</h3>
          <p className="stat-number">{stats.environmentalImpact.energySaved}</p>
          <p className="stat-label">kWh</p>
        </div>
      </div>

      <div className="dashboard-charts">
        <div className="chart-container">
          <h2>Device Types Collected</h2>
          <div className="device-types-chart">
            {Object.entries(stats.deviceTypes).map(([device, count]) => (
              <div className="chart-bar-container" key={device}>
                <div className="chart-label">{device}</div>
                <div className="chart-bar">
                  <div 
                    className="chart-bar-fill" 
                    style={{ 
                      width: `${(count / stats.totalCollected) * 100}%`,
                      backgroundColor: getDeviceColor(device)
                    }}
                  ></div>
                </div>
                <div className="chart-value">{count}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-container">
          <h2>Monthly Collection Trends</h2>
          <div className="monthly-chart">
            {stats.monthlyCollection.map((item) => (
              <div className="monthly-bar-container" key={item.month}>
                <div 
                  className="monthly-bar" 
                  style={{ height: `${(item.amount / 550) * 100}%` }}
                >
                  {item.amount > 0 && <span className="monthly-value">{item.amount}</span>}
                </div>
                <div className="monthly-label">{item.month}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="dashboard-details">
        <div className="details-card">
          <h2>Environmental Impact</h2>
          <div className="impact-stats">
            <div className="impact-item">
              <i className="impact-icon carbon-icon"></i>
              <div className="impact-text">
                <span className="impact-value">{stats.environmentalImpact.co2Reduced} tons</span>
                <span className="impact-label">CO₂ emissions prevented</span>
              </div>
            </div>
            <div className="impact-item">
              <i className="impact-icon water-icon"></i>
              <div className="impact-text">
                <span className="impact-value">{stats.environmentalImpact.waterSaved} kiloliters</span>
                <span className="impact-label">Water saved</span>
              </div>
            </div>
            <div className="impact-item">
              <i className="impact-icon energy-icon"></i>
              <div className="impact-text">
                <span className="impact-value">{stats.environmentalImpact.energySaved} kWh</span>
                <span className="impact-label">Energy saved</span>
              </div>
            </div>
          </div>
        </div>

        <div className="details-card">
          <h2>Materials Recovered</h2>
          <div className="materials-chart">
            {Object.entries(stats.materialsSaved).map(([material, amount]) => (
              <div className="material-item" key={material}>
                <div className="material-info">
                  <span className="material-name">{formatMaterialName(material)}</span>
                  <span className="material-amount">{amount} kg</span>
                </div>
                <div className="material-bar">
                  <div 
                    className="material-bar-fill" 
                    style={{ 
                      width: `${(amount / 7000) * 100}%`,
                      backgroundColor: getMaterialColor(material)
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="dashboard-footer">
        <div className="impact-summary">
          <h2>Your Contribution Matters</h2>
          <p>By recycling your electronic waste, you've helped save valuable resources and protected our environment from harmful toxins. Thank you for being part of the solution!</p>
        </div>
        <Link to="/login" className="recycle-button" >
        Recycle More Devices
      </Link>
      </div>
    </div>
  );
};

export default Dashboard;