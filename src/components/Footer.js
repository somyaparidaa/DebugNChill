import React, { useState } from "react";
import "../styles/Footer.css";
// Make sure to install FontAwesome:
// npm install @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome @fortawesome/free-brands-svg-icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);

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

  return (
    <div className="full-width-container">
      {/* FAQ Section */}
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
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
