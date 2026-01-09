import { useState } from "react";
import AdGridPage from "./pages/AdGridPage";
import AdDemoPage from "./pages/AdDemoPage";

function App() {
  useEffect(() => {
  // Wake backend silently
  fetch("http://ai-backend-aafd.onrender.com//health").catch(() => {});
}, []);

  const [selectedAd, setSelectedAd] = useState(null);
 
  if (!selectedAd) {
    return <AdGridPage onSelectAd={setSelectedAd} />;
  }

  return <AdDemoPage ad={selectedAd} />;
}

export default App;
