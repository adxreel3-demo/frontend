import { useEffect, useState, useRef } from "react";
import { sendChatMessage } from "../services/chatApi";
import Message from "./Message";
import TypingIndicator from "./TypingIndicator";

export default function ChatBubble({
  campaignId,
  companyName,
  productName,
  setIsTalking
}) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    setMessages([
      {
        text: `👋 Hi! I’m the AI assistant for ${productName} by ${companyName}.
I can help you with price, features, and offers.
👉 What would you like to know?`,
        isUser: false
      }
    ]);
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages(m => [...m, { text: input, isUser: true }]);
    setInput("");
    setTyping(true);
    setIsTalking(true); // 🔥 start talking

    try {
      const res = await sendChatMessage(campaignId, input);
      setMessages(m => [...m, { text: res.reply, isUser: false }]);
    } catch {
      setMessages(m => [
        ...m,
        { text: "⚠️ Something went wrong.", isUser: false }
      ]);
    } finally {
      setTyping(false);
      setTimeout(() => setIsTalking(false), 1500); // 🔥 stop talking
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((m, i) => (
          <Message key={i} {...m} aiName={companyName} />
        ))}
        {typing && <TypingIndicator />}
        <div ref={endRef} />
      </div>

      <div className="input-bar">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          placeholder="Ask about price, offers..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
