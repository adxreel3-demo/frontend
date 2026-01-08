export function speak(text, onEnd) {
  if (!window.speechSynthesis) return;

  const utterance = new SpeechSynthesisUtterance(text);

  const voices = speechSynthesis.getVoices();

  // ✅ Pick a sweet female voice (priority order)
  utterance.voice =
    voices.find(v => v.name.includes("Female")) ||
    voices.find(v => v.name.includes("Google UK English Female")) ||
    voices.find(v => v.gender === "female") ||
    voices[0];

  utterance.pitch = 1.2;   // 🎀 sweeter
  utterance.rate = 0.95;   // calm
  utterance.volume = 1;

  utterance.onend = onEnd;

  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
}
