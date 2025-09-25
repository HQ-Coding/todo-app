import React, { Suspense, lazy } from "react";

const HeroCharacter = lazy(() => import("./HeroCharacter"));
const HeroText = lazy(() => import("./HeroText"));

export default function HeroSection({
  todosByDate,
  aiActive,
  aiResponse,
  setIsHeroMenuOpen,
  selectedHero,
}) {
  return (
    <section
      className={`heroSectionBase 
    ${aiActive ? "aiActive" : ""}
     relative w-full md:w-full lg:w-5/6 xl:w-4/6 md:h-[600px] mt-2 rounded-[200px] backdrop-blur-[30px] border flex items-center overflow-hidden`}
    >
      <div className="heroSection w-full h-full flex flex-row md:flex-col items-center justify-between md:justify-normal p-2 md:p-5 gap-5">
        {/* Character */}
        <div className="w-1/3 md:w-full flex justify-start">
          <Suspense
            fallback={
              <div className="font-extrabold text-white">Loading...</div>
            }
          >
            <HeroCharacter setIsHeroMenuOpen={setIsHeroMenuOpen} selectedHero={selectedHero} />
          </Suspense>
        </div>

        {/* Text */}
        <div className="w-2/3 md:w-full flex flex-col justify-start ">
          <Suspense
            fallback={
              <div className="font-extrabold text-white">Loading...</div>
            }
          >
            <HeroText
              todosByDate={todosByDate}
              aiActive={aiActive}
              aiResponse={aiResponse}
            />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
