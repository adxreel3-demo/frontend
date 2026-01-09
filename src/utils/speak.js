export function getZiraVoice() {
  const voices = window.speechSynthesis.getVoices();

  // Try Microsoft Zira first
  let voice = voices.find(v =>
    v.name.toLowerCase().includes("zira")
  );

  // Fallbacks (important for demo safety)
  if (!voice) {
    voice = voices.find(v =>
      v.name.toLowerCase().includes("female") &&
      v.lang.startsWith("en")
    );
  }

  return voice || voices[0];
}
