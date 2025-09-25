import React from "react";
import tourImages from "../../data/tourIMG.js";

export default function WelcomeCard({ card }) {
  return (
    <div
      style={{
        fontFamily: '"Amatic SC", sans-serif',
      }}
      className="relative flex flex-col items-center p-6 w-full h-full max-w-md justify-between"
    >
      <div className="relative mt-20">
        {/* Text on top */}
        <h2 className="text-8xl font-extrabold text-white z-50 relative">
          {card?.title || "Welcome!"}
        </h2>

        <img
          className="w-24 h-24 md:w-32 md:h-32 absolute bottom-10 right-0 z-10"
          src={tourImages.emoji01}
          alt="Emoji"
        />
        <img
          className="w-24 h-24 md:w-32 md:h-32 absolute bottom-10 left-0 z-10"
          src={tourImages.emoji02}
          alt="Emoji"
        />
        <img
          className="w-24 h-24 md:w-32 md:h-32 absolute top-12 right-10 z-10"
          src={tourImages.emoji03}
          alt="Emoji"
        />
      </div>

      <p className="text-2xl md:text-3xl text-center text-white">
        {card.description}
      </p>
    </div>
  );
}
