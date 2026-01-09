function renderBold(text) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

function parseProducts(text) {
  // Normalize spacing
  const cleaned = text.replace(/\s+/g, " ").trim();

  // Split by "1)" "2)" etc
  const items = cleaned.split(/\d+\)\s*/).filter(Boolean);

  // Must contain Price & Description to qualify
  if (!cleaned.includes("Price:") || !cleaned.includes("Description:")) {
    return null;
  }

  return items.map(item => {
    const nameMatch = item.match(/\*\*(.*?)\*\*/);
    const priceMatch = item.match(/Price:\s*₹?[\d,]+/);
    const descMatch = item.match(/Description:\s*(.*)/);

    return {
      name: nameMatch?.[1],
      price: priceMatch?.[0],
      description: descMatch?.[1]
    };
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

  const products = parseProducts(text);

  // ✅ PRODUCT CARD MESSAGE
  if (products) {
    return (
      <div className="message ai-msg">
        <div className="ai-label">🤖 {aiName}</div>

        {products.map((p, i) => (
          <div key={i} className="product-card">
            {p.name && <div className="product-title">{p.name}</div>}
            {p.price && <div className="product-price">{p.price}</div>}
            {p.description && (
              <div className="product-desc">{p.description}</div>
            )}
          </div>
        ))}
      </div>
    );
  }

  // ✅ NORMAL AI MESSAGE
  return (
    <div className="message ai-msg">
      <div className="ai-label">🤖 {aiName}</div>
      <div className="message-text">{renderBold(text)}</div>
    </div>
  );
}
