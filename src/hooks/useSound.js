// hooks/useSound.js
import { useRef } from "react";

export default function useSound(soundMute, sfxVolume) {
  const audioCache = useRef({});
  const playSound = (fileName) => {
    if (soundMute) return;
    if (!audioCache.current[fileName]) {
      audioCache.current[fileName] = new Audio(`/soundEffect/${fileName}`);
    }
    const audio = audioCache.current[fileName];
    audio.volume = sfxVolume;
    audio.currentTime = 0;
    audio.play().catch(() => {
      console.log("Playback prevented. User interaction may be required.");
    });
  };

  return playSound;
}
