import React, { useState } from "react";
import "../styles/Mission.css";
import img1 from "../images/mission1.png";
import img2 from "../images/E-Waste2.jpeg";
import img3 from "../images/E-Waste3.jpeg";
import img4 from "../images/E-Waste3.jpeg";

const Header = () => {
  return (
    <header className="header">
      <h1>Redefining E-Waste - One Device at a Time!</h1>
      <p className="content">
        At TechCycle, we believe in a future where technology and sustainability
        go hand in hand. E-waste is the fastest-growing waste stream in the
        world, and we’re here to change that.
      </p>
    </header>
  );
};

const MissionCard = ({ images, title, shortText, fullText }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <div className={`mission-card ${isFlipped ? "flipped" : ""}`}>
      {/* Front Side */}
      <div className="mission-card-front">
        <div className="image-grid">
          {images.map((img, index) => (
            <img key={index} src={img} alt="E-waste" className="grid-image" />
          ))}
        </div>
        <p className="text-Color">{shortText}</p>
        <button className="btn" onClick={() => setIsFlipped(true)}>
          Learn More
        </button>
      </div>

      {/* Back Side */}
      <div className="mission-card-back">
        <p className="text-Color">{fullText}</p>
        <button className="btn back-btn" onClick={() => setIsFlipped(false)}>
          Back
        </button>
      </div>
    </div>
  );
};

const MissionSection = () => {
  const missions = [
    {
      title: "Reduce E-Waste",
      shortText:
        "Reduce e-waste pollution by encouraging responsible disposal.",
      fullText:
        "We promote responsible e-waste disposal by educating people about safe recycling and offering convenient drop-off points for old electronics.",
      images: [img1],
    },
    {
      title: "Extend Life of Electronics",
      shortText:
        "Extend the life of electronics through repair, recycle and reuse.",
      fullText:
        "By refurbishing and repairing electronics, we extend their lifespan and reduce unnecessary waste, making tech more accessible to everyone.",
      images: [img2],
    },
    {
      title: "Raise Awareness",
      shortText: "Raise awareness about sustainable tech practices.",
      fullText:
        "We conduct workshops and campaigns to educate individuals and businesses about sustainable technology and eco-friendly practices.",
      images: [img3],
    },
    {
      title: "Improve Accessibility",
      shortText: "Make our services as accessible as possible.",
      fullText:
        "We strive to provide e-waste recycling and repair services in every city, making it easy for everyone to participate in sustainability.",
      images: [img4],
    },
  ];

  return (
    <section className="mission-section">
      <h2>Our Mission</h2>
      <div className="mission-container">
        {missions.map((mission, index) => (
          <MissionCard
            key={index}
            images={mission.images}
            title={mission.title}
            shortText={mission.shortText}
            fullText={mission.fullText}
          />
        ))}
      </div>
    </section>
  );
};

const App = () => {
  return (
    <section id="mission">
      <div>
        <Header />
        <MissionSection />
      </div>
    </section>
  );
};

export default App;
