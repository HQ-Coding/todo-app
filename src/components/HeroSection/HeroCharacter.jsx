import React from "react";

export default function HeroCharacter({ setIsHeroMenuOpen, selectedHero }) {
  return (
    <div
      onClick={() => setIsHeroMenuOpen(true)}
      className="hero w-[100px] h-[100px] md:w-48 md:h-48 rounded-full overflow-hidden border-4 cursor-pointer"
    >
      <video
        src={selectedHero}
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      ></video>
    </div>
  );
}
