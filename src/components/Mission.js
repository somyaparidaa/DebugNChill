import React from "react";
import "../styles/Mission.css";
import mission1 from "../images/mission1.png"

const Header = () => {
  return (
    <header className='header'>
      <h1>Redefining E-Waste - One Device at a Time!</h1>
      <p className="content">
        At TechCycle, we believe in a future where technology and sustainability go hand in hand.
        E-waste is the fastest-growing waste stream in the world, and we’re here to change that.
      </p>
    </header>
  );
};

const MissionCard = ({ image, text }) => {
  return (
    <div className="mission-card">
      <img src={image} alt="E-waste" />
      <p className="text-Color">{text}</p>
    </div>
  );
};

const MissionSection = () => {
  const missions = [
    "Reduce e-waste pollution by encouraging responsible disposal.",
    "Extend the life of electronics through repair, recycle and reuse.",
    "Raise awareness about sustainable tech practices.",
    "Make our services as accessible as possible."
  ];

  return (
    <section className="mission-section">
      <h2>Our Mission</h2>
      <div className="mission-container">
        {missions.map((text, index) => (
          <MissionCard key={index} image={mission1} text={text} />
        ))}
      </div>
    </section>
  );
};

const App = () => {
  return (
    <div>
      <Header />
      <MissionSection />
    </div>
  );
};

export default App;