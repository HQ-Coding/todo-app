import React from "react";

export default function Info({setModalToggle }) {
  return (
    <button 
    onClick={() => setModalToggle(true)}
    className="w-[20px] md:w-[30px] h=[20px] md:h=[30px] rounded-full cursor-pointer bg-transparent">
      <i class="fa-solid fa-circle-info"></i>
    </button>
  );
}
