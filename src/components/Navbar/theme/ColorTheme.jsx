import React from "react";

export default function ColorTheme({
  themes,
  changeTheme,
  getThemeTextColor,
  selectedTheme,
  setSelectedTheme,
}) {
  return (
    <div className="list-solid w-full p-2 lg:p-0 lg:mr-7">
      <ul className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12 gap-2 mx-5 w-full justify-around">
        <li
          onClick={() => setSelectedTheme(null)}
          className="w-16 h-16 md:w-24 md:h-24 rounded-md cursor-pointer flex items-center justify-center border mt-2"
        >
          Default
        </li>
        {themes.map((theme) => (
          <li
            key={theme}
            onClick={() => changeTheme(theme)}
            className={`mt-2 text-white w-16 h-16 md:w-24 md:h-24 rounded-md cursor-pointer flex items-center justify-center border ${
              selectedTheme === theme ? "rotate-6 border-4" : ""
            }`}
            style={{ backgroundColor: `${getThemeTextColor(theme)}` }}
          >
            {theme.replace(/Theme/i, "")}
          </li>
        ))}
      </ul>
    </div>
  );
}
