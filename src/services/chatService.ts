export async function createAIImage(prompt: string) {
  const res = await fetch("/api/createImage", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("API Error Response:", text);
    throw new Error(`API Error: ${res.status} - ${text}`);
  }

  const data = await res.json();
  return data;
}

export const getTextResponse = async (
  message: string,
  imageBase64: string | null,
  previousResponseId?: string
) => {
  console.log("imageBase64", imageBase64?.slice(0, 50));
  const res = await fetch("https://ai-chat-clone.expo.app/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, image: imageBase64, previousResponseId }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("API Error Response:", text);
    throw new Error(`API Error: ${res.status} - ${text}`);
  }

  const data = await res.json();
  return data;
};

export const getSpeechResponse = async (
  audioBase64: string,
  previousResponseId?: string
) => {
  const res = await fetch("https://ai-chat-clone.expo.app/api/chat/speech", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ audioBase64, previousResponseId }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
};
