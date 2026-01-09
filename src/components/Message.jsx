function renderBold(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

export default function Message({ text, isUser, aiName }) {
  if (isUser) {
    return (
      <div className="message user-msg">
        <div className="message-text">{text}</div>
      </div>
    );
  }

  // ✅ Robust product detection
  const isProductMessage =
    text.includes("**Price:**") && text.includes("**Description:**");

  if (isProductMessage) {
    // ✅ Split by product index (1), 2), 3) — even without newline
    const blocks = text
      .split(/\d+\)\s*/)
      .filter(b => b.trim().length > 0);

    return (
      <div className="message ai-msg">
        <div className="ai-label">🤖 {aiName}</div>

        {blocks.map((block, index) => {
          const lines = block
            .split("\n")
            .map(l => l.trim())
            .filter(Boolean);

          return (
            <div key={index} className="product-card">
              {lines.map((line, i) => (
                <div key={i} className="product-line">
                  {renderBold(line)}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    );
  }

  // ✅ Normal AI message
  return (
    <div className="message ai-msg">
      <div className="ai-label">🤖 {aiName}</div>
      <div className="message-text">{renderBold(text)}</div>
    </div>
  );
}
