import React, { useState, useEffect, Suspense, lazy } from "react";
import TodoHistoryCard from "./TodoHistoryCard";

export default function TodoHistory({ history, removeHistoryFromData }) {
  const [winCount, setWinCount] = useState(0);
  const [lossCount, setLossCount] = useState(0);
  const [winRatePercent, setWinRatePercent] = useState(0);

  // محاسبه برد و باخت
  function winRate() {
    if (!history || Object.keys(history).length === 0) return;

    let wins = 0;
    let losses = 0;

    Object.keys(history).forEach((dateKey) => {
      history[dateKey].forEach((todo) => {
        if (todo.done === true) wins++;
        if (todo.done === false) losses++;
      });
    });

    const total = wins + losses;
    const percent = total > 0 ? (wins / total) * 100 : 0;

    setWinCount(wins);
    setLossCount(losses);
    setWinRatePercent(percent);
  }

  useEffect(() => {
    winRate();
  }, [history]);

  if (!history || Object.keys(history).length === 0) {
    return (
      <p className="h-96 text-xl text-center font-bold text-white mt-2p-2 rounded-md w-full">
        No history available!
      </p>
    );
  }

  return (
    <div className="h-96 overflow-y-auto [scrollbar-width:none] mx-auto md:mx-5 mt-1 space-y-2">
      <div className="w-full max-h-full flex justify-between gap-2">
        <button
          onClick={() => removeHistoryFromData()}
          className="text-lg font-bold text-white mt-2 bg-gray-800 p-2 rounded-md w-full"
        >
          پاک کردن تاریخچه
        </button>
        <span className="text-lg text-center font-bold text-white mt-2 bg-gray-800 p-2 rounded-md w-full">
          درصد موفقیت: {winRatePercent.toFixed(1)}%
        </span>
      </div>

      {Object.keys(history).map((dateKey) => (
        <div key={dateKey}>
          <h2 className="text-lg font-bold text-gray-700 mt-2 bg-white p-2 rounded-md">
            تاریخ: {dateKey}
          </h2>

          <ul className="space-y-1">
            {history[dateKey].map((todo, index) => (
              <Suspense
                key={todo.id || index}
                fallback={<div>در حال بارگذاری...</div>}
              >
                <TodoHistoryCard todo={todo} index={index} />
              </Suspense>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
