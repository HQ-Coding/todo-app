import React from "react";

export default function BgButton({ handleImageChange }) {
  return (
    <div
      style={{ backgroundColor: "var( --gray-dark)" }}
      className="p-2 rounded border "
    >
      <label className="px-4 py-2 rounded cursor-pointer ">
        Choose your background
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </label>
    </div>
  );
}
