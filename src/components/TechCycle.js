import React, { useState, useEffect, useRef } from "react";
import "../styles/techCycle.css";

// SVG Components
const LogoIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M21 9L17 12L21 15V9Z" fill="#0a1a17" />
    <path d="M3 9L7 12L3 15V9Z" fill="#0a1a17" />
    <path
      d="M12 6C13.1046 6 14 5.10457 14 4C14 2.89543 13.1046 2 12 2C10.8954 2 10 2.89543 10 4C10 5.10457 10.8954 6 12 6Z"
      fill="#0a1a17"
    />
    <path
      d="M12 22C13.1046 22 14 21.1046 14 20C14 18.8954 13.1046 18 12 18C10.8954 18 10 18.8954 10 20C10 21.1046 10.8954 22 12 22Z"
      fill="#0a1a17"
    />
    <path
      d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
      fill="#0a1a17"
    />
  </svg>
);

const CircuitBoard = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current) return;

    let paths = "";
    const numLines = 50;

    for (let i = 0; i < numLines; i++) {
      const x1 = Math.random() * 100;
      const y1 = Math.random() * 100;
      const x2 = x1 + (Math.random() * 20 - 10);
      const y2 = y1 + (Math.random() * 20 - 10);

      paths += `<path d='M${x1}% ${y1}% L${x2}% ${y2}%' stroke='#4ecca3' stroke-width='0.5' />`;
      if (Math.random() > 0.7) {
        paths += `<circle cx='${x1}%' cy='${y1}%' r='1' fill='#4ecca3' />`;
      }
    }
    svgRef.current.innerHTML = paths;
  }, []);

  return (
    <svg
      className="circuit-board"
      ref={svgRef}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
    ></svg>
  );
};

const Counter = ({ target, id }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    const increment = target / steps;
    let currentCount = 0;

    const counter = setInterval(() => {
      currentCount += increment;
      if (currentCount >= target) {
        currentCount = target;
        clearInterval(counter);
      }
      setCount(Math.floor(currentCount));
    }, interval);

    return () => clearInterval(counter);
  }, [target]);

  return (
    <div className="stat-number" id={id}>
      {count.toLocaleString()}
    </div>
  );
};

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Login successful!");
    }, 2000);
  };

  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit} id="loginForm">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Enter your password"
            required
          />
          <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>
        <button type="submit" className="login-btn" disabled={loading}>
          Sign In
        </button>
      </form>
    </div>
  );
};

const TechCycleApp = () => {
  return (
    <div className="tech-cycle-app">
      <LogoIcon />
      <CircuitBoard />
      <Counter target={53824} id="devicesCounter" />
      <LoginForm />
    </div>
  );
};

export default TechCycleApp;
