// frontend/src/services/chatApi.js
function getSessionId() {
  let sessionId = localStorage.getItem("chat_session_id");

  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem("chat_session_id", sessionId);
  }

  return sessionId;
}

export async function sendChatMessage(campaignId, message) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/chat/message`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        session_id: getSessionId(),   // required
        campaign_id: campaignId,
        message
      })
    }
  );

  if (!response.ok) {
    throw new Error("Chat API failed");
  }

  const data = await response.json();
  return data; // { reply: "AI message" }
}



