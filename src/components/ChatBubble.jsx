import { useEffect, useState, useRef } from "react";
import { sendChatMessage } from "../services/chatApi";
import { speak } from "../utils/speak";
import "../styles/chat.css";

export default function ChatBubble({ campaignId, companyName, productName }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [isTalking, setIsTalking] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    setMessages([
      {
        text: `👋 Hi! I’m the AI assistant for ${productName} by ${companyName}.
I can help you with price, features, and offers.`,
        isUser: false
      }
    ]);
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  async function sendMessage() {
    if (!input.trim()) return;

    const userText = input;
    setInput("");
    setMessages(m => [...m, { text: userText, isUser: true }]);
    setTyping(true);

    try {
      const res = await sendChatMessage(campaignId, userText);

      setTyping(false);
      setIsTalking(true);

      setMessages(m => [...m, { text: res.reply, isUser: false }]);

      speak(res.reply, () => setIsTalking(false));
    } catch {
      setTyping(false);
      setIsTalking(false);
      setMessages(m => [...m, { text: "⚠️ Error. Try again.", isUser: false }]);
    }
  }

  return (
    <div className="chat-container">

      {/* HEADER */}
      <div className="chat-header">
        <div>
          <strong>{companyName}</strong>
          <div className="chat-subtitle">{productName}</div>
        </div>
        <span className="verified">✔ Verified</span>
      </div>

      {/* AVATAR */}
      <div className="ai-avatar">
        <img
          src={isTalking ? "/AI-talking-avatar.gif" : "/ai_not_talk.png"}
          alt="AI Avatar"
        />
      </div>

      {/* MESSAGES */}
      <div className="messages">
        {messages.map((m, i) => (
          <div key={i} className={m.isUser ? "user-msg" : "ai-msg"}>
            {m.text}
          </div>
        ))}
        {typing && <div className="typing">AI is typing...</div>}
        <div ref={endRef} />
      </div>

      {/* INPUT */}
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
  );
}
