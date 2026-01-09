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
          <img src={ad.logo} className="logo" />
          <div>
            <strong>{ad.companyName}</strong>
            <div className="chat-subtitle">{ad.productName}</div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div className="adxreel-badge">
            <img src="/logo.png" alt="Adxreel" />
            <span>Adxreel AI Assistant</span>
          </div>

          <span className="verified">✔ Verified</span>
        </div>
      </header>

      {/* ================= BANNER ================= */}
      <img src={ad.banner} className="banner" />

      {/* ================= CONTENT ================= */}
      <div className="content">

        <div className="left">
          <video
            src={ad.video}
            autoPlay
            muted
            loop
            controls
            className="product-video"
          />
        </div>

        <div className="center">
          <Avatar isTalking={isTalking} />
        </div>

        <div className="right">
          <ChatBubble
            campaignId={ad.campaignId}
            companyName={ad.companyName}
            productName={ad.productName}
            setIsTalking={setIsTalking}
          />
        </div>

      </div>
    </div>
  );
}
