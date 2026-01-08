import { useEffect, useState, useRef } from "react";
import { sendChatMessage } from "../services/chatApi";
import Message from "./Message";
import TypingIndicator from "./TypingIndicator";
import "../styles/chat.css";

export default function ChatBubble({
  campaignId,
  companyName,
  productName
}) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [isTalking, setIsTalking] = useState(false); // ✅ moved INSIDE

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

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

    const userInput = input;

    setMessages(prev => [...prev, { text: userInput, isUser: true }]);
    setInput("");
    setTyping(true);
    setIsTalking(true);

    try {
      const res = await sendChatMessage(campaignId, userInput);

      setMessages(prev => [
        ...prev,
        { text: res.reply, isUser: false }
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { text: "⚠️ Something went wrong.", isUser: false }
      ]);
    } finally {
      setTyping(false);
      setIsTalking(false);
    }
  };

  return (
    <div className="chat-container">
      {/* Header */}
      <div className="chat-header">
        <div>
          <strong>{companyName}</strong>
          <div className="chat-subtitle">{productName}</div>
        </div>
        <span className="verified">✔ Verified</span>
      </div>

      {/* Avatar */}
      <div className="ai-avatar">
        <img
          src={isTalking ? "/AI-talking-avatar.gif" : "/ai_not_talk.png"}
          alt="AI Avatar"
        />
      </div>

      {/* Messages */}
      <div className="chat-box">
        <div className="messages">
          {messages.map((m, i) => (
            <Message
              key={i}
              text={m.text}
              isUser={m.isUser}
              aiName={companyName}
            />
          ))}

          {typing && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
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
  );
}
