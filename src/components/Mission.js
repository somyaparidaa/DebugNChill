import React, { useState } from "react";
import "../styles/Mission.css";
import img1 from "../images/mission1.png";
import img2 from "../images/E-Waste2.jpeg";
import img3 from "../images/E-Waste3.jpeg";
import img4 from "../images/E-Waste8.jpg";

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="animated-text">
          <span>Redefining</span> 
          <span>E-Waste</span>
          <span>One Device at a Time!</span>
        </h1>
        <p className="contents">
          At <span className="highlight">TechCycle</span>, we believe in a future where technology 
          and sustainability dance in perfect harmony. E-waste is the fastest-growing 
          waste stream in the world, and we're here to transform this challenge 
          into an opportunity for positive change.
        </p>
      </div>
    </header>
  );
};

const MissionCard = ({ images, title, shortText, fullText }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <div className={`mission-card ${isFlipped ? "flipped" : ""}`}>
      {/* Front Side */}
      <div className="mission-card-front">
        <div className="image-container">
          <img src={images[0]} alt="E-waste" className="mission-image" />
        </div>
        <div className="mission-content">
          <h3 className="mission-title">{title}</h3>
          <p className="mission-short-text">{shortText}</p>
          <button 
            className="btn learn-more-btn" 
            onClick={() => setIsFlipped(true)}
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Back Side */}
      <div className="mission-card-back">
        <div className="mission-back-content">
          <p className="mission-full-text">{fullText}</p>
          <button 
            className="btn back-btn" 
            onClick={() => setIsFlipped(false)}
          >
            Back to Overview
          </button>
        </div>
      </div>
    </div>

);
};

const MissionSection = () => {
  const missions = [
    {
      title: "Reduce E-Waste",
      shortText: "Reduce e-waste pollution by encouraging responsible disposal.",
      fullText: "We promote responsible e-waste disposal by educating people about safe recycling and offering convenient drop-off points for old electronics.",
      images: [img1],
    },
    {
      title: "Extended Life",
      shortText: "Extend the life of electronics through repair, recycle and reuse.",
      fullText: "By refurbishing and repairing electronics, we extend their lifespan and reduce unnecessary waste, making tech more accessible to everyone.",
      images: [img2],
    },
    {
      title: "Raise Awareness",
      shortText: "Raise awareness about sustainable tech practices.",
      fullText: "We conduct workshops and campaigns to educate individuals and businesses about sustainable technology and eco-friendly practices.",
      images: [img3],
    },
    {
      title: "Improve Accessibility",
      shortText: "Make our services as accessible as possible.",
      fullText: "We strive to provide e-waste recycling and repair services in every city, making it easy for everyone to participate in sustainability.",
      images: [img4],
    },
  ];

  return (
    <section className="mission-section">
      <div className="mission-section-header">
        <h2 className="section-title">OUR MISSION</h2>
        {/* <p className="section-subtitle">
          Transforming E-Waste Challenges into Sustainable Solutions
        </p> */}
      </div>
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
      <div className="mission-wrapper">
        <Header />
        <MissionSection />
      </div>
    </section>
  );
};

export default App;