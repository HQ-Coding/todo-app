import React, { createContext, useContext } from "react";
import useSound from "./useSound";

const SoundContext = createContext(null);

export function SoundProvider({ mute, volume, children }) {
  const playSound = useSound(mute, volume);
  return (
    <SoundContext.Provider value={playSound}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSoundContext() {
  return useContext(SoundContext);
}
