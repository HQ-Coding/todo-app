import React from "react";

export default function BgTheme({ appBg, changeBackground }) {
  return (
    <div className="list-background flex justify-between w-full p-2">
      <ul className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2 w-full">
        {appBg.map((bg, index) => (
          <li
            key={index}
            onClick={() => changeBackground(bg)}
            className="border w-16 h-16 md:w-24 md:h-24 rounded-md cursor-pointer overflow-hidden"
          >
            <img
              src={bg}
              alt={`bg ${index}`}
              className="w-full h-full object-cover"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
