// chatbot.js
import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { generateContent } from "../components/model"; // Adjust the path as needed
import "../styles/Chatbot.css";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm your assistant. How can I help?",
      isBot: true,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message to state
    setMessages((prev) => [...prev, { text: input, isBot: false }]);
    setInput("");
    setLoading(true);

    try {
      // Use Gemini API to generate bot response
      const res = await generateContent(input);
      // The generateContent function returns a function that when called returns the text response.
      // You may need to call it to get the actual response text:
      const botResponse = res();
      setMessages((prev) => [...prev, { text: botResponse, isBot: true }]);
    } catch (err) {
      console.error("Error generating response:", err);
      setMessages((prev) => [
        ...prev,
        { text: "Failed to generate response", isBot: true },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} className="chat-toggle-button">
          <MessageCircle size={24} />
        </button>
      )}

      {isOpen && (
        <div className="chat-container">
          <div className="chat-header">
            <h3>Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="close-button">
              <X size={20} />
            </button>
          </div>

          <div className="messages-container">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={msg.isBot ? "bot-message" : "user-message"}
              >
                {msg.text}
              </div>
            ))}
            {loading && <div className="bot-message">Thinking...</div>}
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
            <button onClick={handleSend} className="send-button">
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;
