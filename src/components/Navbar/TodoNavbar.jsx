import React, { useState } from "react";
import HamburgerMenu from "./HamburgerMenu";
import Info from "../Modal/info";

export default function TodoNavbar({
  appBase,
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
  setModalToggle,
}) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="relative">
      <div style={{ backgroundColor: "var( --gray-dark)" }}  className="navbar relative z-40 max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 rounded-b-3xl">
        <div className="relative flex justify-between items-center gap-2">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://hq-coding.github.io/Frontend/"
            className="no-underline hover:no-underline flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src="https://i.ibb.co/9mkNYW2b/logo.png" alt="TODO Logo" className="h-12 w-12" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              TODO LIST
            </span>
          </a>
          <Info setModalToggle={setModalToggle} />
        </div>
        {/* دکمه باز/بستن */}
        <button
          type="button"
          className="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-white"
          onClick={() => setOpen(!open)}
        >
          <i className="fa-brands fa-mendeley"></i>
        </button>
      </div>

      {/* منوی کشویی */}
      <HamburgerMenu
        appBase={appBase}
        open={open}
        setOpen={setOpen}
        selectedTheme={selectedTheme}
        setSelectedTheme={setSelectedTheme}
        setSelectedBackground={setSelectedBackground}
        saveSettings={saveSettings}
        sfxVolume={sfxVolume}
        setSfxVolume={setSfxVolume}
        soundMute={soundMute}
        setSoundMute={setSoundMute}
        username={username}
        setUsername={setUsername}
        aiActive={aiActive}
        setAiActive={setAiActive}
        selectedFont={selectedFont}
        changeFont={changeFont}
      />
    </nav>
  );
}
