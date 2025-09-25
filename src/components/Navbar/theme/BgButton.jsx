import React from "react";

export default function BgButton({ handleImageChange , bgError }) {
  return (
    <div className="flex flex-col w-full items-center justify-center">
          <div
      style={{ backgroundColor: "var( --gray-dark)" }}
      className="p-2 rounded border  flex flex-col"
    >
      <label className="px-4 py-2 rounded cursor-pointer ">
        Choose background (max 5MB)
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </label>
    </div>

{/* <p className="text-red-500 text-sm">{bgError && bgError}</p> */}
    </div>

  );
}
