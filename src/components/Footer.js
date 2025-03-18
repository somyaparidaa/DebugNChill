import React, { useState } from 'react';
import '../styles/Footer.css';

const Footer = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const toggleFaq = (index) => {
    if (expandedFaq === index) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(index);
    }
  };

  const faqs = [
    {
      question: "How do I recycle my old electronics?",
      answer: "You can either drop off your old electronics at our nearest collection center or schedule a free pickup through our website. We ensure responsible recycling and disposal."
    },
    {
      question: "What electronics do you accept?",
      answer: "We accept all types of electronics including computers, laptops, smartphones, tablets, TVs, printers, and small household appliances."
    },
    {
      question: "Is there a fee for recycling?",
      answer: "Most standard electronics can be recycled for free. However, certain items like CRT monitors or TVs may incur a small fee due to special handling requirements."
    },
    {
      question: "How is my data protected when recycling devices?",
      answer: "We follow a strict data destruction protocol for all devices. Hard drives are either securely wiped using industry-standard methods or physically destroyed based on your preference."
    },
    {
      question: "Do you offer business recycling services?",
      answer: "Yes, we offer specialized services for businesses including bulk pickups, asset management, and certificates of recycling/destruction for compliance purposes."
    }
  ];

  return (
    <div className="last-container">
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <div 
                className={`faq-question ${expandedFaq === index ? 'expanded' : ''}`}
                onClick={() => toggleFaq(index)}
              >
                {faq.question}
                <span className="toggle-icon">
                  {expandedFaq === index ? '−' : '+'}
                </span>
              </div>
              {expandedFaq === index && (
                <div className="faq-answer">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
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
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 TechCycle. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;