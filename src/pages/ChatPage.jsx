import { useState } from "react";
import ChatBubble from "../components/ChatBubble";
import Avatar from "../components/Avatar";
import "../styles/chat.css";

export default function ChatPage() {
  const [isTalking, setIsTalking] = useState(false);

  return (
    <div className="page">

      {/* ===== HEADER ===== */}
      <header className="header">
        <div className="header-left">
          <img src="/caketopper_logo.png" className="logo" />
          <div>
            <h2>Cake Toppers India</h2>
            <span className="chat-subtitle">Birthday Cake Toppers</span>
          </div>
        </div>

        <div className="header-right">
          {/* Adxreel AI Assistant */}
          <div className="adxreel-badge">
            <img src="/logo.png" alt="Adxreel" />
            <span>Adxreel AI Assistant</span>
          </div>

          {/* Verified */}
          <span className="verified">✔ Verified</span>
        </div>
      </header>

      {/* ===== BANNER ===== */}
      <img src="/caketopper_banner.jpeg" className="banner" />

      {/* ===== MAIN CONTENT ===== */}
      <div className="content">

        {/* LEFT – PRODUCT VIDEO */}
        <div className="left">
          <video
            src="/Cake_Topper.mp4"
            autoPlay
            muted
            loop
            controls
            className="product-video"
          />
        </div>

        {/* CENTER – AVATAR */}
        <div className="center">
          <Avatar isTalking={isTalking} />
        </div>

        {/* RIGHT – CHAT */}
        <div className="right">
          <ChatBubble
            campaignId={9101}
            companyName="Cake Toppers India"
            productName="Birthday Cake Toppers"
            setIsTalking={setIsTalking}
          />
        </div>

      </div>
    </div>
  );
}
