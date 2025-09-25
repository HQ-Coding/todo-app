import React, { useState, Suspense, lazy } from "react";
const CasualCard = React.lazy(() => import("./CasualCard.jsx"));
// const WelcomeCard = React.lazy(() => import("./WelcomeCard.jsx"));
// const Overlay = React.lazy(() => import("./Overlay.jsx"));

import WelcomeCard from "./WelcomeCard.jsx";
import Overlay from "./Overlay.jsx";

import tourCards from "../../data/tourCards.jsx";
import tourImages from "../../data/tourIMG.js";

export default function Modal({ modalToggle, setModalToggle, closeModal }) {
  const [tourStep, setTourStep] = useState(0);
  const [showComplite, setShowComplite] = useState(false);

  const handleNext = () => {
    if (tourStep < tourCards.length - 1) {
      setTourStep(tourStep + 1);
    } else {
      setShowComplite(true);
      setTimeout(() => {
        closeModal();
      }, 2000);
    }
  };

  const currentCard = tourCards[tourStep];

  if (!modalToggle) return null; // Modal نمایش داده نشه وقتی toggle false است

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-x-hidden overflow-y-auto">
      <Suspense fallback={null}>
        <Overlay open={modalToggle} zIndex="z-0" />
      </Suspense>

      <div className="relative z-50 mt-16">
        {/* Background Images */}
        <img
          className="w-full h-100 absolute top-0 left-0 z-10"
          src={tourImages.compliteTop}
          alt="compliteTop"
        />
        {showComplite && (
          <>
            <img
              className="w-full h-100 absolute bottom-0 right-0 z-10"
              src={tourImages.compliteBR}
              alt="compliteBR"
            />
            <img
              className="w-full h-100 absolute bottom-0 left-0 z-10"
              src={tourImages.compliteBL}
              alt="compliteBL"
            />
          </>
        )}

        {/* Modal Content */}
        <div className="relative w-full max-w-md">
          <div className="relative bg-gray-800 rounded-lg overflow-hidden shadow-xl flex flex-col h-[570px] w-[350px] ">
            {/* Modal header
            <div className="flex items-center justify-end p-4 md:p-5 rounded-t"></div> */}

            {/* Modal body */}
            <div className="p-6 overflow-y-auto flex-1">
              {/* <Suspense fallback={<div>Loading...</div>}>
                {tourStep === 0 ? (
                  <WelcomeCard key={currentCard.id} card={currentCard} />
                ) : (
                  <CasualCard key={currentCard.id} card={currentCard} />
                )}
              </Suspense> */}
              {tourStep === 0 ? (
                <WelcomeCard key={currentCard.id} card={currentCard} />
              ) : (
                <CasualCard key={currentCard.id} card={currentCard} />
              )}
            </div>

            {/* Modal footer */}
            <div className="flex justify-center p-4 md:p-5">
              <button
                type="button"
                onClick={handleNext}
                className="w-full py-3 rounded-lg font-semibold text-lg border border-current hover:scale-105 transition-transform duration-200"
              >
                {tourStep < tourCards.length - 1 ? "Next" : "Finish"}
              </button>
            </div>
            {/* end */}
          </div>
        </div>
      </div>
    </div>
  );
}
