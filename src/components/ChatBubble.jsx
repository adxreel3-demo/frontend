import { useEffect, useState, useRef } from "react";
import { sendChatMessage } from "../services/chatApi";
import { speak } from "../utils/speak";   // ✅ USE THIS
import "../styles/chat.css";

export default function ChatBubble({ campaignId, companyName, productName }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [isTalking, setIsTalking] = useState(false);

  const endRef = useRef(null);

  /* ===== INIT MESSAGE ===== */
  useEffect(() => {
    setMessages([
      {
        text: `👋 Hi! I’m the AI assistant for ${productName} by ${companyName}.
I can help you with price, features, and current offers.`,
        isUser: false
      }
    ]);
  }, [companyName, productName]);

  /* ===== AUTO SCROLL ===== */
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  /* ===== SEND MESSAGE ===== */
  async function sendMessage() {
    if (!input.trim()) return;

    const userText = input;

    // 🔇 stop any running voice
    window.speechSynthesis.cancel();

    // user message
    setMessages(prev => [...prev, { text: userText, isUser: true }]);
    setInput("");
    setTyping(true);

    try {
      const res = await sendChatMessage(campaignId, userText);

      setTyping(false);

      // AI message
      setMessages(prev => [...prev, { text: res.reply, isUser: false }]);

      // 🔊 speak AFTER message render
      setTimeout(() => {
        setIsTalking(true);

        speak(res.reply, () => {
          setIsTalking(false); // stop avatar after voice
        });
      }, 400);

    } catch (err) {
      setTyping(false);
      setIsTalking(false);

      setMessages(prev => [
        ...prev,
        { text: "⚠️ Something went wrong. Please try again.", isUser: false }
      ]);
    }
  }

  return (
    <div className="chat-container">

      {/* ===== HEADER ===== */}
      <div className="chat-header">
        <div>
          <strong>{companyName}</strong>
          <div className="chat-subtitle">{productName}</div>
        </div>
        <span className="verified">✔ Verified</span>
      </div>

      {/* ===== AVATAR ===== */}
      <div className="ai-avatar">
        <img
          src={isTalking ? "/AI-talking-avatar.gif" : "/ai_not_talk.png"}
          alt="AI Avatar"
        />
      </div>

      {/* ===== MESSAGES ===== */}
      <div className="messages">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`message-row ${m.isUser ? "user" : "ai"}`}
          >
            <div className={m.isUser ? "user-msg" : "ai-msg"}>
              {m.text}
            </div>
          </div>
        ))}

        {typing && <div className="typing">AI is typing…</div>}

        <div ref={endRef} />
      </div>

      {/* ===== INPUT ===== */}
      <div className="input-bar">
        <input
          value={input}
          onChange={e => {
            setInput(e.target.value);
            window.speechSynthesis.cancel(); // stop voice while typing
          }}
          placeholder="Ask about price, offers..."
          onKeyDown={e => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}  now coorect this -- i aslo wna to share export const ADS = [
  {
    adId: "bewakoof_ad_1",
    companyName: "Bewakoof",
    productName: "Oversized T-Shirts",
    campaignId: 9301,
    video: "/TshirtVideo.mp4",
    logo: "/bewakoof_logo.png",
    banner: "/bewakoof_banner.jpg"
  },
  {
    adId: "titan_ad_1",
    companyName: "Titan Watches",
    productName: "Smart & Analog Watches",
    campaignId: 9201,
    video: "/RolexWatch.mp4",
    logo: "/titan_logo.png",
    banner: "/titan_banner.jpg"
  },
  {
    adId: "cake_ad_1",
    companyName: "Cake Toppers India",
    productName: "Birthday Cake Toppers",
    campaignId: 9101,
    video: "/Cake_Topper.mp4",
    logo: "/caketopper_logo.png",
    banner: "/caketopper_banner.jpeg"
  }
];src/data/ads.js
