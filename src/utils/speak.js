export function speak(text, onEnd) {
  if (!window.speechSynthesis) return;

  const utterance = new SpeechSynthesisUtterance(text);

  const voices = speechSynthesis.getVoices();

  // ✅ FORCE female voice
  const femaleVoice =
    voices.find(v => v.name.includes("Google UK English Female")) ||
    voices.find(v => v.name.includes("Female")) ||
    voices.find(v => v.lang === "en-IN" && v.name.toLowerCase().includes("female")) ||
    voices[0];

  utterance.voice = femaleVoice;
  utterance.pitch = 1.25;   // sweeter
  utterance.rate = 0.95;
  utterance.volume = 1;

  utterance.onend = onEnd;

  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
}
