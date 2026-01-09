import { useEffect, useState, useRef } from "react";
import { sendChatMessage } from "../services/chatApi";
import { speakWithZiraSweet } from "../utils/speak"; // 🔊 SWEET VOICE
import "../styles/chat.css";

export default function ChatPage({ campaignId, companyName, productName }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [isTalking, setIsTalking] = useState(false);

  const endRef = useRef(null);

  /* ================= INIT MESSAGE ================= */
  useEffect(() => {
    setMessages([
      {
        text: `👋 Hi! I’m the ADXREEL AI Assistant.
After you add an ad, I’ll open automatically and help clear all your doubts about ${productName}.`,
        isUser: false
      }
    ]);
  }, [productName]);

  /* ================= AUTO SCROLL ================= */
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  /* ================= SEND MESSAGE ================= */
  async function sendMessage() {
    if (!input.trim()) return;

    const userText = input;
    window.speechSynthesis.cancel();

    setMessages(prev => [...prev, { text: userText, isUser: true }]);
    setInput("");
    setTyping(true);

    try {
      const res = await sendChatMessage(campaignId, userText);

      setTyping(false);
      setMessages(prev => [...prev, { text: res.reply, isUser: false }]);

      setIsTalking(true);
      speakWithZiraSweet(res.reply, () => {
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
  }

  return (
    <div className="chat-container">

      {/* ================= HEADER ================= */}
      <div className="chat-header">
        <div className="header-left">
          <div className="adx-brand">
            <img src="/adxreel.png" alt="ADXREEL Logo" />
            <div>
              <div className="adx-title">ADXREEL</div>
              <div className="adx-subtitle">AI Advertising Assistant</div>
            </div>
          </div>

          <div className="advertiser">
            <strong>{companyName}</strong>
            <div className="chat-subtitle">{productName}</div>
          </div>
        </div>

        <span className="verified">✔ Verified</span>
      </div>

      {/* ================= AVATAR ================= */}
      <div className="ai-avatar">
        <img
          src={isTalking ? "/AI-talking-avatar.gif" : "/ai_not_talk.png"}
          alt="AI Avatar"
        />
      </div>

      {/* ================= MESSAGES ================= */}
      <div className="messages">
        {messages.map((m, i) => (
          <div key={i} className={`message ${m.isUser ? "user-msg" : "ai-msg"}`}>
            {m.text}
          </div>
        ))}

        {typing && <div className="typing">AI is typing…</div>}
        <div ref={endRef} />
      </div>

      {/* ================= INPUT ================= */}
      <div className="input-bar">
        <input
          value={input}
          onChange={e => {
            setInput(e.target.value);
            window.speechSynthesis.cancel();
          }}
          placeholder="Ask about ads, pricing, offers..."
          onKeyDown={e => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>

    </div>
  );
}
