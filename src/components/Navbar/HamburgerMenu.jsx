import React, { useState, Suspense, lazy } from "react";

const ThemeMenu = lazy(() => import("./theme/ThemeMenu"));
const AiAgent = lazy(() => import("./AI/AiAgent"));
const PlayMusic = lazy(() => import("./PlaySound/PlayMusic"));
const Overlay = lazy(() => import("../Modal/Overlay"));

export default function HamburgerMenu({
  appBase,
  open,
  setOpen,
  selectedTheme,
  setSelectedTheme,
  setSelectedBackground,
  saveSettings,
  sfxVolume,
  setSfxVolume,
  soundMute,
  setSoundMute,
  username,
  setUsername,
  aiActive,
  setAiActive,
  changeFont,
  selectedFont,
}) {
  const [menuState, setMenuState] = useState("About Me");

  return (
    <>
      <Suspense>
        <Overlay open={open} zIndex={"z-10"} />
      </Suspense>

      <div
        className={`absolute top-10 left-0 right-0 mx-auto max-w-screen-xl bg-gray-800 text-white shadow-lg
      transform transition-all duration-300 ease-in-out z-30 rounded-b-lg
      ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}
      >
        <div
          style={{ backgroundColor: "var(--border-color)" }}
          className={`${
            open ? "h-auto" : "h-0"
          } menuBars flex flex-col items-center justify-start`}
        >
          <ul className="mt-20 mb-5 flex justify-center gap-3 p-0">
            {["Theme", "Sound", "AI"].map((text) => (
              <li className="cursor-pointer" key={text}>
                <a
                  style={{ backgroundColor: "var( --gray-dark)" }}
                  onClick={() => setMenuState(text)}
                  className="
            flex items-center justify-center
            md:w-40 md:h-20
            w-20 h-10
            md:text-lg
            text-sm
            text-white font-semibold
            rounded-xl
            shadow-md
            border border-gray-700
            hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500
            hover:scale-105
            transition-all duration-300
          "
                >
                  {text}
                </a>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setOpen(!open)}
            className="block bg-transparent text-center  p-2"
          >
            <i className="fa-solid fa-caret-up text-lg"></i>
          </button>
        </div>

        {open && menuState === "Theme" ? (
          <Suspense
            fallback={
              <div className="font-extrabold text-white">Loading Done...</div>
            }
          >
            <ThemeMenu
              appBase={appBase}
              selectedTheme={selectedTheme}
              setSelectedTheme={setSelectedTheme}
              setSelectedBackground={setSelectedBackground}
              saveSettings={saveSettings}
              changeFont={changeFont}
              selectedFont={selectedFont}
            />
          </Suspense>
        ) : null}
        {open && menuState === "AI" ? (
          <Suspense
            fallback={
              <div className="font-extrabold text-white">Loading Done...</div>
            }
          >
            <AiAgent
              username={username}
              setUsername={setUsername}
              aiActive={aiActive}
              setAiActive={setAiActive}
            />
          </Suspense>
        ) : null}

        <div
          className={`transition-all duration-300 ${
            open && menuState === "Sound"
              ? "opacity-100 visible max-h-96"
              : "opacity-0 invisible max-h-0 overflow-hidden"
          }`}
        >
          <Suspense
            fallback={
              <div className="font-extrabold text-white">Loading Done...</div>
            }
          >
            <PlayMusic
              sfxVolume={sfxVolume}
              setSfxVolume={setSfxVolume}
              soundMute={soundMute}
              setSoundMute={setSoundMute}
            />
          </Suspense>
        </div>
      </div>
    </>
  );
}
