import React, { useState, useRef, useEffect } from "react";
import "../styles/Footer.css";
import { gsap } from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Ref to the parent container of FAQ items (optional, for clarity)
  const faqListRef = useRef(null);

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I recycle my old electronics?",
      answer:
        "You can either drop off your old electronics at our nearest collection center or schedule a free pickup through our website.",
    },
    {
      question: "What electronics do you accept?",
      answer:
        "We accept all types of electronics including computers, laptops, smartphones, tablets, TVs, printers, and small household appliances.",
    },
    {
      question: "Is there a fee for recycling?",
      answer:
        "Most standard electronics can be recycled for free. However, certain items like CRT monitors or TVs may incur a small fee due to special handling requirements.",
    },
    {
      question: "How is my data protected when recycling devices?",
      answer:
        "We follow a strict data destruction protocol for all devices. Hard drives are either securely wiped using industry-standard methods or physically destroyed based on your preference.",
    },
    {
      question: "Do you offer business recycling services?",
      answer:
        "Yes, we offer specialized services for businesses including bulk pickups, asset management, and certificates of recycling/destruction for compliance purposes.",
    },
  ];

  // === GSAP Pendulum Animation ===
  useEffect(() => {
    if (!faqListRef.current) return;

    // Select all the FAQ items
    const items = faqListRef.current.querySelectorAll(".faq-item");

    items.forEach((item, index) => {
      // Determine direction: even indices start from the left, odd from the right
      const startX = index % 2 === 0 ? -50 : 50;

      gsap.fromTo(
        item,
        { x: startX }, // Starting position
        {
          x: 0, // Move to center (x=0)
          duration: 1.5, // Adjust duration to control speed
          ease: "power1.inOut",
          repeat: -1, // Infinite loop
          yoyo: true, // Pendulum effect (back and forth)
          stagger: 0.2, // Optional: small delay between items
        }
      );
    });
  }, []);

  return (
    <div className="full-width-container">
      {/* FAQ Section */}
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list" ref={faqListRef}>
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <div
                className={`faq-question ${
                  expandedFaq === index ? "expanded" : ""
                }`}
                onClick={() => toggleFaq(index)}
              >
                {faq.question}
                <span className="toggle-icon">
                  {expandedFaq === index ? "−" : "+"}
                </span>
              </div>
              {expandedFaq === index && (
                <div className="faq-answer">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <h2>TechCycle</h2>
            <p className="tagline">Recycle, reborn, Revive!</p>
          </div>

          <div className="footer-contact">
            <h3>CONTACT US</h3>
            <p>+91 9XXXXXXXX</p>
            <p>TechCycle@gmail.com</p>
            <p>537 Kandivali, Sector 3, Mumbai, India</p>
          </div>

          {/* Social Media Icons */}
          <div className="social-media">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faFacebook}
                  className="social-icon facebook"
                />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="social-icon instagram"
                />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faTwitter}
                  className="social-icon twitter"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 TechCycle. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
