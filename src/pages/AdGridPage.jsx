import { ADS } from "../data/ads";

export default function AdGridPage({ onSelectAd }) {
  return (
    <>
      {/* ===== AI BRAND BAR ===== */}
      <div style={topBar}>
        <div style={brandWrap}>
          <img src="/logo.png" alt="ADXREEL" style={logoStyle} />
          <div>
            <div style={brandText}>ADXREEL</div>
            <div style={tagline}>AI Advertising Assistant</div>
          </div>
        </div>
      </div>

      {/* ===== AI NOTE ===== */}
      <div style={noteBox}>
        🤖 <strong>AI Demo Note:</strong> After selecting an advertisement,
        the <strong>ADXREEL AI Assistant</strong> will open.  
        You can ask questions, get instant help, and understand the ad clearly.
      </div>

      {/* ===== AD GRID ===== */}
      <div style={gridStyle}>
        {ADS.map((ad) => (
          <div
            key={ad.adId}
            style={cardStyle}
            onClick={() => onSelectAd(ad)}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-8px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            <div style={aiGlow} />
            <video
              src={ad.video}
              muted
              loop
              autoPlay
              playsInline
              style={videoStyle}
            />
            <div style={labelStyle}>
              <strong style={companyStyle}>{ad.companyName}</strong>
              <div style={productStyle}>{ad.productName}</div>
              <div style={aiHint}>Ask AI about this ad →</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ===== STYLES ===== */

const topBar = {
  position: "sticky",
  top: 0,
  zIndex: 100,
  background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
  padding: "16px 28px",
  color: "#fff"
};

const brandWrap = {
  display: "flex",
  alignItems: "center",
  gap: "14px"
};

const logoStyle = {
  height: "38px"
};

const brandText = {
  fontSize: "22px",
  fontWeight: "700",
  letterSpacing: "1px"
};

const tagline = {
  fontSize: "13px",
  opacity: 0.85
};

const noteBox = {
  maxWidth: "1100px",
  margin: "20px auto",
  padding: "16px 20px",
  borderRadius: "12px",
  background: "linear-gradient(135deg, #eef2ff, #f8fafc)",
  color: "#333",
  fontSize: "15px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gap: "28px",
  padding: "24px",
  maxWidth: "1200px",
  margin: "0 auto"
};

const cardStyle = {
  position: "relative",
  cursor: "pointer",
  borderRadius: "18px",
  overflow: "hidden",
  background: "#000",
  boxShadow: "0 16px 40px rgba(0,0,0,0.2)",
  transition: "all 0.35s ease"
};

const aiGlow = {
  position: "absolute",
  inset: 0,
  background:
    "linear-gradient(120deg, rgba(0,255,255,0.15), rgba(0,0,0,0))",
  pointerEvents: "none"
};

const videoStyle = {
  width: "100%",
  height: "210px",
  objectFit: "cover",
  display: "block"
};

const labelStyle = {
  padding: "16px",
  background: "#fff"
};

const companyStyle = {
  fontSize: "16px",
  display: "block",
  marginBottom: "4px"
};

const productStyle = {
  fontSize: "14px",
  color: "#555"
};

const aiHint = {
  marginTop: "8px",
  fontSize: "13px",
  color: "#2563eb",
  fontWeight: "500"
};
