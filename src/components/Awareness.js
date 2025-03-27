import React from "react";
import { AlertTriangle, Info, TreeDeciduous } from "lucide-react";
import "../styles/Awareness.css"; // Import the separate CSS file
// import img5 from "../images/image.png";

const facts = [
  {
    title: "Growing E-Waste Crisis",
    description:
      "E-waste is rapidly increasing due to rising electronics consumption and short product lifecycles. Toxic materials like lead and mercury pollute soil and water, harming ecosystems and human health. Poor recycling practices worsen the crisis, especially in developing nations. Sustainable disposal, stricter regulations, and consumer awareness are essential to mitigate this threat.",
    icon: AlertTriangle,
  },
  {
    title: "Environmental Impact",
    description:
      "E-waste recycling reduces landfill waste, conserves natural resources, and prevents toxic chemicals like lead and mercury from polluting air, soil, and water. However, improper recycling methods release hazardous substances, harming workers and ecosystems. Sustainable recycling practices, stricter regulations, and advanced technology are crucial for minimizing environmental damage and promoting sustainability.",
    icon: TreeDeciduous,
  },
  {
    title: "Valuable Materials",
    description:
      "Electronic waste holds valuable materials like gold, silver, and rare metals. One metric ton of circuit boards contains 40–800 times more gold than mined ore, making e-waste recycling highly profitable. Efficient recovery reduces environmental damage from mining, conserves resources, and supports a circular economy by reusing precious materials sustainably.",
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
              src="../images/image.png"
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
