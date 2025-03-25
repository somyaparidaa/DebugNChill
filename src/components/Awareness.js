import React from "react";
import { AlertTriangle, Info, TreeDeciduous } from "lucide-react";
import "../styles/Awareness.css"; // Import the separate CSS file

const facts = [
  {
    title: "Growing E-Waste Crisis",
    description:
      "Global e-waste reached 53.6 million metric tonnes in 2023, with only 17.4% being properly recycled.",
    icon: AlertTriangle,
  },
  {
    title: "Environmental Impact",
    description:
      "One million recycled laptops saves energy equivalent to electricity used by 3,500 homes in a year.",
    icon: TreeDeciduous,
  },
  {
    title: "Valuable Materials",
    description:
      "One metric ton of circuit boards can contain 40-800 times the amount of gold found in gold ore.",
    icon: Info,
  },
];

function Awareness() {
  return (
    <div className="awareness-container">
      <div className="awareness-card">
        <h2 className="section-title">E-Waste Awareness</h2>

        <div className="facts-grid">
          {facts.map((fact, index) => (
            <div key={index} className="fact-card">
              <div className="fact-header">
                <fact.icon className="fact-icon" />
                <h3 className="fact-title">{fact.title}</h3>
              </div>
              <p className="fact-description">{fact.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="awareness-card">
        <h2 className="section-title">Impact of E-Waste Recycling</h2>
        <div className="impact-grid">
          <div className="image-container">
            <img
              src="/api/placeholder/800/600"
              alt="E-waste recycling"
              className="impact-image"
            />
          </div>
          <div className="impact-content">
            <h3 className="impact-title">Why Recycle E-Waste?</h3>
            <ul className="impact-list">
              <li className="impact-item">
                <div className="bullet"></div>
                <span>Prevents toxic materials from entering landfills</span>
              </li>
              <li className="impact-item">
                <div className="bullet"></div>
                <span>Recovers valuable materials for reuse</span>
              </li>
              <li className="impact-item">
                <div className="bullet"></div>
                <span>Reduces energy consumption in manufacturing</span>
              </li>
              <li className="impact-item">
                <div className="bullet"></div>
                <span>Creates green jobs in recycling industry</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Awareness;
