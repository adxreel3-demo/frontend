export function speak(text, onEnd) {
  if (!window.speechSynthesis || !text) return;

  const synth = window.speechSynthesis;

  // 🔹 Clean text for natural speech
  const cleanedText = text
    .replace(/\*\*/g, "")        // remove markdown **
    .replace(/\n+/g, ". ")       // smooth pauses
    .replace(/₹/g, "rupees ")    // nicer pronunciation
    .trim();

  const utterance = new SpeechSynthesisUtterance(cleanedText);

  const voices = synth.getVoices();

  // 🔹 Prefer Microsoft Zira (sweetest available system voice)
  utterance.voice =
    voices.find(v => v.name.toLowerCase().includes("zira")) ||
    voices.find(v => v.name.toLowerCase().includes("female")) ||
    voices.find(v => v.lang.startsWith("en")) ||
    voices[0];

  // 🔥 SALES / SWEET TUNING (MAX SAFE)
  utterance.rate = 0.82;      // slower, calm
  utterance.pitch = 1.22;     // sweeter tone
  utterance.volume = 1;

  // 🔹 Callback when voice ends (for avatar sync)
  if (onEnd) {
    utterance.onend = onEnd;
  }

  // 🔹 Stop previous voice & speak
  synth.cancel();
  synth.speak(utterance);
}
