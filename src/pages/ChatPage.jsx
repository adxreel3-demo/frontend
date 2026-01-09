import { useState } from "react";
import ChatBubble from "../components/ChatBubble";
import Avatar from "../components/Avatar";
import "../styles/chat.css";

export default function ChatPage({ ad }) {
  const [isTalking, setIsTalking] = useState(false);

  return (
    <div className="chat-container">

      {/* ================= HEADER ================= */}
      <header className="chat-header">
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img src={ad.logo} className="logo" alt={ad.companyName} />
          <div>
            <strong>{ad.companyName}</strong>
            <div className="chat-subtitle">{ad.productName}</div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {/* ✅ Adxreel logo ONLY */}
          <img src="/adxreel.png" alt="Adxreel" className="adxreel-logo" />
          <span className="verified">✔ Verified</span>
        </div>
      </header>

      {/* ================= AVATAR ================= */}
      <div className="ai-avatar">
        <Avatar isTalking={isTalking} />
      </div>

      {/* ================= CHAT ================= */}
      <ChatBubble
        campaignId={ad.campaignId}
        companyName={ad.companyName}
        productName={ad.productName}
        setIsTalking={setIsTalking}
      />

    </div>
  );
}
