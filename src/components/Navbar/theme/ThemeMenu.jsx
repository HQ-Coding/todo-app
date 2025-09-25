import BgTheme from "./BgTheme";
import ColorTheme from "./ColorTheme";
import BgButton from "./BgButton";
import FontChange from "./FontChange";
import { appBg } from "../../../data/appBg";
import { useState } from "react";

export default function ThemeMenu({
  selectedTheme,
  setSelectedTheme,
  selectedBackground,
  setSelectedBackground,
  changeFont,
  selectedFont,
}) {
  const themes = [
    "purpleTheme",
    "pinkTheme",
    "redTheme",
    "orangeTheme",
    "yellowTheme",
    "creamTheme",
    "greenTheme",
    "darkGreenTheme",
    "neutralTheme",
    "darkTechTheme",
    "DarkBlueTheme",
  ];

  const getThemeTextColor = (themeClass) => {
    const tempDiv = document.createElement("div");
    tempDiv.className = themeClass;
    tempDiv.style.display = "none";
    document.body.appendChild(tempDiv);
    const color = getComputedStyle(tempDiv).getPropertyValue("--primary-color");
    document.body.removeChild(tempDiv);
    return color;
  };

  const [ bgError , setBgError ] = useState("")

const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const maxSize = 5 * 1024 * 1024; 
  if (file.size > maxSize) {
    alert("❌ File is too large! Please choose a file smaller than 5MB");
    setBgError(" ❌ File is too large! Please choose a file smaller than 5MB")
    return;
  }

  const reader = new FileReader();
  reader.onloadend = () => {
    setSelectedBackground(reader.result);
    localStorage.setItem("customBackground", reader.result); 
  };
  reader.readAsDataURL(file);
};

  const changeTheme = (theme) => setSelectedTheme(theme);
  const changeBackground = (bg) => setSelectedBackground(bg);

  return (
    <div
      style={{ backgroundColor: "var(--bg-color)" }}
      className="w-full p-4 rounded-lg h-[60vh] overflow-y-scroll "
    >
      <div className="flex flex-col justify-center items-center gap-4">
        <h2>
          <i className="rainbow-animated fa-solid fa-brush"></i>
          Theme
        </h2>
        <p className="font-bold text-lg ">Font</p>
        <FontChange changeFont={changeFont} selectedFont={selectedFont} />
        <p className="font-bold text-lg ">Solid Color</p>
        <ColorTheme
          themes={themes}
          changeTheme={changeTheme}
          getThemeTextColor={getThemeTextColor}
          selectedTheme={selectedTheme}
          setSelectedTheme={setSelectedTheme}
        />

        <p className="font-bold text-lg ">List Background</p>
        <BgTheme appBg={appBg} changeBackground={changeBackground} />

        <BgButton handleImageChange={handleImageChange} bgError={bgError} />
      </div>
    </div>
  );
}
