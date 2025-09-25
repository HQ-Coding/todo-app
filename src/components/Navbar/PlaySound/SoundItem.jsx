import { useRef, useState } from "react";

export default function SoundItem({ sound }) {
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) audioRef.current.volume = newVolume;
  };

  const playAudio = () => {
    // Lazy load: فقط وقتی کاربر کلیک کرد Audio ساخته بشه
    if (!audioRef.current) {
      audioRef.current = new Audio(sound.src);
      audioRef.current.loop = true;
      audioRef.current.volume = volume;
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <li
      id={sound.name}
      className="h-[180px] md:h-[230px] md:w-[50px] rounded-md bg-white flex flex-col items-center justify-between m-0 p-0"
    >
      <div className="flex flex-col items-center -rotate-90 translate-y-16 md:translate-y-20">
        {/* دیگر نیازی نیست <audio> عنصر در ابتدا ساخته شود */}
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-24 md:w-32 h-2 bg-gray-300 rounded-lg accent-blue-500"
        />
      </div>
      <p>
        <button
          onClick={playAudio}
          className={`fa-solid ${isPlaying ? "buttonPlayActive" : ""} soundButtonsActive ${sound.icon} text-2xl w-[40px] h-[40px] rounded-md flex items-center justify-center m-0`}
        ></button>
      </p>
    </li>
  );
}
