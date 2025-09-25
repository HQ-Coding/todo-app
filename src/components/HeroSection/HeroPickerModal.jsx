import React from "react";
import heroes from "../../data/heroData";
import Overlay from "../Modal/Overlay";

export default function HeroPickerModal({
  setIsHeroMenuOpen,
  setSelectedHero,
  selectedHero,
}) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <Overlay open={setIsHeroMenuOpen} zIndex="z-0" />
      <div
        style={{ backgroundColor: "var(--bg-color)" }}
        className="border rounded-xl shadow-lg w-[90%] md:w-[70%] lg:w-[50%] max-h-[80%] overflow-y-auto p-6 z-50"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Choose Your Hero</h2>
          <button
            onClick={() => setIsHeroMenuOpen(false)}
            className="bg-red-600 hover:text-black text-2xl"
          >
            <i class="fa-solid fa-circle-xmark"></i>
          </button>
        </div>

        {/* Hero grid */}
        <ul className="grid grid-cols-3 md:grid-cols-6 gap-2 w-full">
          {heroes.map((hero) => (
            <li
              key={hero.id}
              onClick={() => {
                setSelectedHero(hero.video);
              }}
              className={`${selectedHero == hero.video ? "rotate-6" : "rotate-0" } border w-16 h-16 md:w-24 md:h-24 rounded-md cursor-pointer overflow-hidden transform duration-300 hover:rotate-6`}
            >
              <img
                src={hero.thumbnail}
                alt={`Hero ${hero.id}`}
                className="w-full h-full object-cover"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
