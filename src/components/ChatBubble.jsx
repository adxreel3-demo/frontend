import { useEffect, useState, useRef } from "react";
import { sendChatMessage } from "../services/chatApi";
import { speak } from "../utils/speak";
import "../styles/chat.css";

export default function ChatBubble({
  campaignId,
  companyName,
  productName
}) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [isTalking, setIsTalking] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // Initial greeting (TEXT ONLY – browser blocks voice on load)
  useEffect(() => {
    setMessages([
      {
        text: `👋 Hi! I’m the AI assistant for ${productName} by ${companyName}.
I can help you with price, features, warranty, and offers.
👉 What would you like to know?`,
        isUser: false
      }
    ]);
  }, [companyName, productName]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userText = input;
    setInput("");

    setMessages(prev => [...prev, { text: userText, isUser: true }]);
    setTyping(true);

    try {
      const res = await sendChatMessage(campaignId, userText);

      setTyping(false);
      setIsTalking(true);

      setMessages(prev => [
        ...prev,
        { text: res.reply, isUser: false }
      ]);

      speak(res.reply, () => {
        setIsTalking(false);
      });

    } catch (err) {
      setTyping(false);
      setIsTalking(false);

      setMessages(prev => [
        ...prev,
        { text: "⚠️ Something went wrong. Please try again.", isUser: false }
      ]);
    }
  };

  return (
    <div className="page">

      {/* HEADER */}
      <div className="header">
        <img src="/caketopper_logo.png" className="logo" />
        <div>
          <h3>{companyName}</h3>
          <small>{productName}</small>
        </div>
        <span className="verified">✔ Verified</span>
      </div>

      {/* BANNER */}
      <img src="/caketopper_banner.jpeg" className="banner" />

      {/* MAIN LAYOUT */}
      <div className="content">

        {/* LEFT: PRODUCT VIDEO */}
        <div className="left">
          <video
            src="/Cake_Topper.mp4"
            className="product-video"
            autoPlay
            muted
            loop
          />
        </div>

        {/* CENTER: AVATAR */}
        <div className="center avatar-box">
          <img
            src={isTalking ? "/AI-talking-avatar.gif" : "/ai_not_talk.png"}
            className="avatar-img"
          />
        </div>

        {/* RIGHT: CHAT */}
        <div className="right chat-container">
          <div className="messages">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`message ${m.isUser ? "user-msg" : "ai-msg"}`}
              >
                {m.text}
              </div>
            ))}

            {typing && <div className="typing">AI is typing...</div>}
            <div ref={messagesEndRef} />
          </div>

          <div className="input-bar">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about price, offers..."
              onKeyDown={e => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>

      </div>
    </div>
  );
}
