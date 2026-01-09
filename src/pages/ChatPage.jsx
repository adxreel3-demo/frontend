import { useState } from "react";
import { ADS } from "../data/ads";
import ChatBubble from "../components/ChatBubble";
import Avatar from "../components/Avatar";
import "../styles/chat.css";

/**
 * If ad is NOT passed as prop,
 * we fallback using campaignId (or first ad)
 */
export default function ChatPage({ campaignId }) {
  const [isTalking, setIsTalking] = useState(false);

  // 🔥 Find ad from ADS (clean, no hardcode)
  const ad =
    ADS.find((item) => item.campaignId === campaignId) || ADS[0];

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

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Adxreel AI Assistant */}
          <div className="adxreel-badge">
            <img src="/logo.png" alt="Adxreel" />
            <span>Adxreel AI Assistant</span>
          </div>

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
