import { useEffect, useState, useRef } from "react";
import { sendChatMessage } from "../services/chatApi";
import Message from "./Message";
import TypingIndicator from "./TypingIndicator";
import "../styles/chat.css";
import talkingGif from "/AI-talking-avatar.gif";
import silentImg from "/ai_not_talk.png";


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

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // Initial greeting
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

    setMessages(prev => [...prev, { text: input, isUser: true }]);
    const userInput = input;
    setInput("");
    setTyping(true);
    setIsTalking(false);

    try {
      const res = await sendChatMessage(campaignId, userInput);

      // 👇 AI is "talking" now
      setIsTalking(true);

      setMessages(prev => [
        ...prev,
        { text: res.reply, isUser: false }
      ]);

      // stop talking animation after response
      setTimeout(() => setIsTalking(false), 2000);

    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          text: "⚠️ Something went wrong. Please try again.",
          isUser: false
        }
      ]);
      setIsTalking(false);
    } finally {
      setTyping(false);
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
          src={
            isTalking
              ? "/AI-talking-avatar.gif"
              : "/ai_not_talk.png"
          }
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
            placeholder="Ask about price, warranty, size..."
            onKeyDown={e => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

