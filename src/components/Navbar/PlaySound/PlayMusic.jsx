import SoundItem from "./SoundItem";
import Wind from "../../../assets/Audios/wind.mp3";
import Rain from "../../../assets/Audios/rain.mp3";
import River from "../../../assets/Audios/river.mp3";
import Fire from "../../../assets/Audios/fire.mp3";
import Coast from "../../../assets/Audios/coast.wav";
import Forest from "../../../assets/Audios/forest.mp3";
import Chimes from "../../../assets/Audios/chimes.mp3";

export default function PlayMusic({
  sfxVolume,
  setSfxVolume,
  soundMute,
  setSoundMute,
}) {
  const soundList = [
    { name: "Wind", icon: "fa-wind", src: Wind },
    { name: "Rain", icon: "fa-cloud-rain", src: Rain },
    { name: "River", icon: "fa-water", src: River },
    { name: "Fire", icon: "fa-fire", src: Fire },
    { name: "Beach", icon: "fa-umbrella-beach", src: Coast },
    { name: "Forest", icon: "fa-tree", src: Forest },
    { name: "Bell", icon: "fa-bell", src: Chimes },
  ];

  return (
    <div
      style={{ backgroundColor: "var(--bg-color)" }}
      className="flex flex-col items-center justify-center p-5 rounded-lg   h-[70vh] overflow-y-scroll "
    >
      <h2 className="mt-5">
        <i className="fa-solid fa-headphones rainbow-animated"></i>Sound
      </h2>

      <div className="flex flex-col items-center justify-center">
        <h4 className="mt-5 font-bold">App Sound</h4>
        <div className="flex items-center gap-5">
          <button
            className=" text-2xl w-[40px] h-[40px] rounded-md flex items-center justify-center m-0"
            onClick={() => setSoundMute(!soundMute)}
          >
            {!soundMute ? (
              <i className="fa-solid fa-volume-high"></i>
            ) : (
              <i className="fa-solid fa-volume-xmark"></i>
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={sfxVolume}
            onChange={(e) => setSfxVolume(parseFloat(e.target.value))}
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <h4 className="mt-5 font-bold">Special Sound</h4>
        <ul className="pb-5 gap-7 items-center grid grid-cols-4 md:grid-cols-7 h-auto ">
          {soundList.map((sound) => {
            return <SoundItem key={sound.name} sound={sound} />;
          })}
        </ul>
      </div>
    </div>
  );
}
