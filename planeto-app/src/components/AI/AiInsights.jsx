import { useState, useRef, useEffect } from "react";
import "./AiInsights.css";
import moonIcon from "../../assets/3d-moon.png";

const AIInsights = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text:
        "Hi, I'm Lunar.\nYour smart productivity assistant.\nAsk me anything about habits, reminders, planning, or motivation."
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);
  const chatRef = useRef(null);

  const quickReplies = [
    "Habit tips",
    "Suggest reminder",
    "Motivate me",
    "How to stay consistent?"
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        chatRef.current &&
        !chatRef.current.contains(event.target) &&
        !event.target.closest(".lunar-toggle-btn")
      ) {
        closeChat();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  };

  const closeChat = () => {
    setIsClosing(true);

    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 250);
  };

  const toggleChat = () => {
    if (isOpen) {
      closeChat();
    } else {
      setIsOpen(true);
    }
  };

  const sendMessage = async (text = input) => {
    if (!text.trim()) return;

    const userMessage = {
      sender: "user",
      text
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify({ message: text })
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: data.reply || "I'm here to help."
        }
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Something went wrong. Please try again."
        }
      ]);
    }

    setLoading(false);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className={`lunar-chatbox ${isClosing ? "closing" : ""}`}
          ref={chatRef}
        >
          <div className="lunar-header">
            <div>
              <h3>Lunar</h3>
              <p>Your smart assistant</p>
            </div>

            <button onClick={closeChat}>✕</button>
          </div>

          <div className="lunar-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.sender === "user"
                    ? "message user-message"
                    : "message bot-message"
                }
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="message bot-message">
                Typing...
              </div>
            )}

            <div ref={messagesEndRef}></div>
          </div>

          <div className="quick-replies">
            {quickReplies.map((item, index) => (
              <button
                key={index}
                onClick={() => sendMessage(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="lunar-input-area">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleEnter}
            />

            <button onClick={() => sendMessage()}>
              ➤
            </button>
          </div>
        </div>
      )}

      <button
        className="lunar-toggle-btn"
        onClick={toggleChat}
      >
        <img
          src={moonIcon}
          alt="Moon"
          className="moon-icon"
        />
      </button>
    </>
  );
};

export default AIInsights;