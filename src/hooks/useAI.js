import { useState, useEffect } from "react";

export default function useAI(username = "Friend") {
  const WhatShouldYouDo = `You are a friendly and fun AI assistant for a Todo app. 
  Your job is to provide short, helpful, and positive responses to the user's tasks. 
  If the user asks a question, respond with "I can't respond to questions." 
  If the user writes nonsense or gibberish, respond with a short joke. 
  Always make your responses between 10–20 words for real tasks. 
  Keep the tone friendly, casual, and motivating.`
  const [aiResponse, setAiResponse] = useState(
    `Hello ${username}, AI is now active to respond to your tasks!`
  );

  useEffect(() => {
    setAiResponse(
      `Hello ${username}, AI is now active to respond to your tasks!`
    );
  }, [username]);

  async function sendToAI(todoText) {
    const API_KEY = "AIzaSyB0tmVcq14QvLOy4uUNUkNXHmnCCT3ajTg"; // Your API key

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `WhatShouldYouDo:${WhatShouldYouDo} Username: "${username}", UserMessage: "${todoText}"`,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              candidateCount: 1,
              maxOutputTokens: 150,
            },
          }),
        }
      );

      if (!response.ok) {
        if (response.status === 429) {
          setAiResponse("⏳ Too many requests, please wait a few seconds.");
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }

      const data = await response.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      setAiResponse(reply);
    } catch (err) {
      console.error("Error sending to AI:", err);
      setAiResponse("❌ Failed to get AI response.");
    }
  }

  return { aiResponse, sendToAI };
}