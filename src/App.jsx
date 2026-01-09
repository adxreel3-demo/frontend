import { useState } from "react";
import AdGridPage from "./pages/AdGridPage";
import AdDemoPage from "./pages/AdDemoPage";
import "./styles/app.css";

function App() {
  const [selectedAd, setSelectedAd] = useState(null);

  return (
    <>
      {/* ===== TOP HEADER ===== */}
      <header className="top-header">
        <div className="brand">
          <img src="/logo.png" alt="ADXREEL Logo" />
          <span>ADXREEL</span>
        </div>
      </header>

      {/* ===== PAGE CONTENT ===== */}
      {!selectedAd ? (
        <AdGridPage onSelectAd={setSelectedAd} />
      ) : (
        <AdDemoPage ad={selectedAd} />
      )}
    </>
  );
}

export default App;
