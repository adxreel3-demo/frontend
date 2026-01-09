import { useState } from "react";
import ChatBubble from "../components/ChatBubble";
import Avatar from "../components/Avatar";
import { ADS } from "../data/ads";
import "../styles/chat.css";

// ✅ Vite-safe static import (GUARANTEED to work)
import adxreelLogo from "/adxreel.png";

export default function ChatPage({ campaignId }) {
  const [isTalking, setIsTalking] = useState(false);

  // ✅ Find ad safely (no crash even if campaignId missing)
  const ad =
    ADS.find((item) => item.campaignId === campaignId) || ADS[0];

  return (
    <div className="chat-container">

      {/* ================= HEADER ================= */}
      <header className="chat-header">
        {/* LEFT */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img
            src={ad.logo}
            className="logo"
            alt={ad.companyName}
          />
          <div>
            <strong>{ad.companyName}</strong>
            <div className="chat-subtitle">{ad.productName}</div>
          </div>
        </div>

        {/* RIGHT */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {/* ✅ Adxreel logo ONLY */}
          <img
            src={adxreelLogo}
            alt="Adxreel"
            className="adxreel-logo"
          />
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
