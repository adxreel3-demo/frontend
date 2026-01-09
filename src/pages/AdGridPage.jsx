import { ADS } from "../data/ads";

export default function AdGridPage({ onSelectAd }) {
  return (
    <>
      {/* ===== TOP BRAND BAR ===== */}
      <div style={topBar}>
        <img src="/adxreel.png" alt="ADXREEL" style={logoStyle} />
        <span style={brandText}>ADXREEL</span>
      </div>

      {/* ===== GRID ===== */}
      <div style={gridStyle}>
        {ADS.map((ad) => (
          <div
            key={ad.adId}
            style={cardStyle}
            onClick={() => onSelectAd(ad)}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-6px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
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
  background: "#fff",
  padding: "14px 24px",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  borderBottom: "1px solid #eee"
};

const logoStyle = {
  height: "36px"
};

const brandText = {
  fontSize: "22px",
  fontWeight: "700",
  letterSpacing: "1px"
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: "24px",
  padding: "24px",
  maxWidth: "1200px",
  margin: "0 auto"
};

const cardStyle = {
  cursor: "pointer",
  borderRadius: "16px",
  overflow: "hidden",
  background: "#fff",
  boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
  transition: "all 0.3s ease"
};

const videoStyle = {
  width: "100%",
  height: "200px",
  objectFit: "cover",
  display: "block"
};

const labelStyle = {
  padding: "14px"
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
