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

  // ✅ Avatar talking state (MUST be inside component)
  const [isTalking, setIsTalking] = useState(false);

  // 🔹 Auto-scroll reference
  const messagesEndRef = useRef(null);

  // 🔹 Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // 🔹 Initial AI greeting (once)
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

  // 🔊 Text-to-Speech with GIF control
  const speak = (text) => {
    if (!window.speechSynthesis) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN";
    utterance.rate = 0.95;
    utterance.pitch = 1.1;

    utterance.onstart = () => setIsTalking(true);   // GIF ON
    utterance.onend = () => setIsTalking(false);    // GIF OFF

    window.speechSynthesis.speak(utterance);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text: input, isUser: true }]);
    const userInput = input;
    setInput("");
    setTyping(true);

    try {
      const res = await sendChatMessage(campaignId, userInput);

      setMessages(prev => [
        ...prev,
        { text: res.reply, isUser: false }
      ]);

      // 🔥 Speak AI reply
      speak(res.reply);

    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          text: "⚠️ Something went wrong. Please try again.",
          isUser: false
        }
      ]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <div className="chat-container">

      {/* ✅ Avatar Header */}
      <div className="ai-avatar-header">
        <img
          src={
            isTalking
              ? "/female-avatar-talking.gif"
              : "/female-avatar-static.png"
          }
          alt="AI Assistant"
          className="ai-avatar"
        />
        <div className="ai-avatar-text">
          <strong>{companyName}</strong>
          <div className="chat-subtitle">AI Sales Assistant</div>
        </div>
      </div>

      {/* Chat Box */}
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

          {/* Auto-scroll anchor */}
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
