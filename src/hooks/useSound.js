// hooks/useSound.js
import { useRef } from "react";

// import همه فایل‌ها
import AiActive from "../assets/soundEffect/Ai-Active.mp3";
import AddSound from "../assets/soundEffect/add.mp3";
import Complete01 from "../assets/soundEffect/complete-01.mp3";
import DeleteSound from "../assets/soundEffect/delete.mp3";
import Interface from "../assets/soundEffect/interface.mp3";
import Restore from "../assets/soundEffect/restore.mp3";

// object برای دسترسی داینامیک
const sounds = {
  "Ai-Active.mp3": AiActive,
  "add.mp3": AddSound,
  "complete-01.mp3": Complete01,
  "delete.mp3": DeleteSound,
  "interface.mp3" : Interface,
  "restore.mp3" : Restore,
};

export default function useSound(soundMute, sfxVolume) {
  const audioCache = useRef({});

  const playSound = (fileName) => {
    if (soundMute) return;

    const filePath = sounds[fileName];
    if (!filePath) return;

    if (!audioCache.current[fileName]) {
      audioCache.current[fileName] = new Audio(filePath);
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
