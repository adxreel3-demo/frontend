export function speakWithZiraSweet(text) {
  if (!window.speechSynthesis || !text) return;

  const voices = window.speechSynthesis.getVoices();
  const zira =
    voices.find(v => v.name.toLowerCase().includes("zira")) ||
    voices.find(v => v.lang.startsWith("en"));

  const cleanedText = text
    .replace(/\*\*/g, "")
    .replace(/\n+/g, ". ")     // smoother flow
    .replace(/₹/g, "rupees "); // sounds nicer

  const utterance = new SpeechSynthesisUtterance(cleanedText);

  utterance.voice = zira;

  // 🔥 SWEET SALES TUNING (MAX SAFE LIMITS)
  utterance.rate = 0.82;      // slower = calmer
  utterance.pitch = 1.25;     // higher = sweeter
  utterance.volume = 1;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}
