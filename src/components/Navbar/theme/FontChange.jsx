import { fonts } from "../../../data/fonts";

export default function FontChange({changeFont ,selectedFont}) {
  return (
    <div className="w-full p-2 mx-5 flex items-center">
      <ul className="grid grid-cols-2 md:grid-cols-6  gap-2 md:gap-2 mx-5 w-full">
        {fonts.map((font , index) => {
          return (
            <li 
            key={font.name}
            onClick={()=> changeFont(font.family)}
            style={{ fontFamily: font.family }}
            className={`w-auto h-16 md:w-24 md:h-24 rounded-md cursor-pointer flex items-center justify-center  border md:text-md transform duration-300 hover:bg-slate-900 ${ selectedFont == font.family ? "border-spacing-2" : ""  }`}>
              {font.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
