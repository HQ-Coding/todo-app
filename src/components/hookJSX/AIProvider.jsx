import React, { createContext, useContext } from "react";
import useAI from "./useAI";

const AIContext = createContext(null);

export function AIProvider({ username, children }) {
  const { aiResponse, sendToAI } = useAI(username);
  return (
    <AIContext.Provider value={{ aiResponse, sendToAI }}>
      {children}
    </AIContext.Provider>
  );
}

export function useAIContext() {
  return useContext(AIContext);
}