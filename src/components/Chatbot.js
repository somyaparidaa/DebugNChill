import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import "../styles/Chatbot.css";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm your e-waste recycling assistant. How can I help you today?",
      isBot: true,
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([...messages, { text: input, isBot: false }]);
    // Simulate bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: "Thank you for your message. I'm here to help with any questions about e-waste recycling!",
          isBot: true,
        },
      ]);
    }, 1000);
    setInput("");
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="chat-toggle-button"
          aria-label="Open chat"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {isOpen && (
        <div className="chat-container">
          <div className="chat-header">
            <h3>Recycling Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="close-button"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          <div className="messages-container">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`${message.isBot ? "bot-message" : "user-message"}`}
              >
                {message.text}
              </div>
            ))}
          </div>

          <div className="input-container">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              className="message-input"
            />
            <button
              onClick={handleSend}
              className="send-button"
              aria-label="Send message"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;
