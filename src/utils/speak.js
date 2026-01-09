// Browser Text-to-Speech (female voice if available)

export function speak(text, onEnd) {
  if (!("speechSynthesis" in window)) return;

  const utterance = new SpeechSynthesisUtterance(text);

  const voices = window.speechSynthesis.getVoices();
  const femaleVoice =
    voices.find(v =>
      v.name.toLowerCase().includes("female") ||
      v.name.toLowerCase().includes("woman") ||
      v.lang === "en-IN"
    ) || voices[0];

  utterance.voice = femaleVoice;
  utterance.lang = "en-IN";
  utterance.rate = 1;
  utterance.pitch = 1;

  utterance.onend = () => {
    onEnd && onEnd();
  };

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}
