// src/components/AiAgent.jsx
import React, { useState } from "react";

export default function AiAgent({
  aiActive,
  setAiActive,
  username,
  setUsername,
}) {
  const [inputValue, setInputValue] = useState(username);

  const toggleAI = () => setAiActive((prev) => !prev);

  const handleSaveUsername = () => {
    setUsername(inputValue.trim());
  };

  return (
    <div
      style={{ backgroundColor: "var(--bg-color)" }}
      className="flex flex-col items-center justify-center p-4 rounded-lg  overflow-scroll mb-5"
    >
      <h2 >
        <i className="fa-solid fa-robot rainbow-animated"></i> AI Agent
      </h2>

      <div className="flex gap-2 mt-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter your name"
          className="pl-3 p-1 rounded text-black"
        />
        <button
          onClick={handleSaveUsername}
          className="p-2 bg-blue-600 text-white rounded"
        >
          Save
        </button>
      </div>

      <button
        onClick={toggleAI}
        className={`w-64 my-5 py-2 px-4 flex gap-2 items-center justify-center mt-3 text-lg ${
          aiActive ? "buttonPlayActive" : ""
        } transform duration-500`}
      >
        {aiActive ? (
          <i class="fa-solid fa-power-off text-green-500"></i>
        ) : (
          <i className="fa-solid fa-power-off text-red-500"></i>
        )}
        {aiActive ? "Active" : "DeActive"}
      </button>
    </div>
  );
}
