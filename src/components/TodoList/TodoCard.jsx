import React, { useState } from "react";

export default function TodoCard({
  uid,
  index,
  subtitle,
  text,
  date,
  time,
  isDone,
  handleEditTodo,
  handleDeleteTodo,
  handleMarkDone,
  removingTodos,
  addingTodos,
  completingTodos,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [subtitleValue, setSubtitleValue] = useState(subtitle);
  const [textValue, setTextValue] = useState(text);
  const [dateValue, setDateValue] = useState(date);
  const [timeValue, setTimeValue] = useState(time);

  // 🆕 state برای باز و بسته شدن
  const [isOpen, setIsOpen] = useState(false);

  // Save / Edit handler
  const handleSaveOrEdit = () => {
    if (isEditing) {
      handleEditTodo(uid, {
        subtitle: subtitleValue,
        text: textValue,
        date: dateValue,
        time: timeValue,
      });
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  // Cancel edit → restore original values
  const handleCancel = () => {
    setSubtitleValue(subtitle);
    setTextValue(text);
    setDateValue(date);
    setTimeValue(time);
    setIsEditing(false);
  };

  // handleMarkDoneClick
  const handleMarkDoneClick = (uid) => {
    handleMarkDone(uid);
  };

  return (
    <li
      className={`todoCard
      ${completingTodos.includes(uid) ? "completing" : ""} 
      ${removingTodos.includes(uid) ? "removing" : ""} 
      ${addingTodos.includes(uid) ? "adding" : ""}
      z-5 rounded-xl w-full backdrop-blur-[20px] border shadow-md`}
      style={{
        backgroundColor: "var(--card-bg-color)",
        borderColor: "var(--border-color)",
      }}
    >
      <div className="relative w-full max-h-full">
        {/* Header */}
        <div
          style={{ backgroundColor: "var(--bg-color)" }}
          className="rounded-t-xl m-2 px-3 py-2 flex justify-between items-center"
        >
          {isEditing ? (
            <input
              style={{ backgroundColor: "var(--bg-color)" }}
              type="text"
              value={subtitleValue}
              onChange={(e) => setSubtitleValue(e.target.value)}
              className="w-full rounded-md p-2 border focus:outline-none focus:ring-2 transition"
            />
          ) : (
            <h3 className="text-md md:text-2xl font-semibold">
              {index + 1}. {subtitleValue}
            </h3>
          )}

          {/* دکمه باز/بسته کردن */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="ml-2 px-2 py-1 text-md hover:bg-gray-400 transition"
          >
            {isOpen ? "−" : "+"}
          </button>
        </div>

        {/* Body */}
        <div
          className={`cardBody px-4 py-2 space-y-2 transition-all duration-300 overflow-hidden 
          ${isOpen ? "h-auto" : "h-0"}`}
        >
          {isEditing ? (
            <textarea
              style={{ backgroundColor: "var(--bg-color)" }}
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              className="w-full rounded-md p-2 border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          ) : (
            <p className="text-md md:text-xl break-words whitespace-normal">
              {textValue}
            </p>
          )}

          <div className="flex gap-2">
            {isEditing ? (
              <input
                style={{ backgroundColor: "var(--bg-color)" }}
                type="time"
                value={timeValue}
                onChange={(e) => setTimeValue(e.target.value)}
                className="border p-1 rounded w-32"
              />
            ) : (
              <p className="text-sm md:text-xl">
                {dateValue && timeValue
                  ? `${dateValue} / ${timeValue}`
                  : `${dateValue || ""} ${timeValue || ""}`}
              </p>
            )}
          </div>
        </div>

        {/* Footer / Buttons */}
        <div className="flex flex-wrap items-center gap-2 p-4 border-t rounded-b-xl">
          {/* Edit / Save */}
          <button
            onClick={handleSaveOrEdit}
            className="px-3 py-1 rounded-lg bg-gradient-to-r from-blue-400 to-blue-600 text-white hover:from-blue-500 hover:to-blue-700 transition transform hover:-translate-y-0.5"
          >
            {isEditing ? "Save" : <i className="fa-solid fa-pen-to-square"></i>}
          </button>

          {/* Cancel */}
          {isEditing && (
            <button
              onClick={handleCancel}
              className="px-3 py-1 rounded-lg bg-gray-400 text-white hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          )}

          {/* Delete */}
          <button
            onClick={() => handleDeleteTodo(uid)}
            disabled={isEditing}
            className={`px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 transition ${
              isEditing ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <i className="fa-solid fa-trash-can"></i>
          </button>

          {/* Done */}
          <button
            onClick={() => handleMarkDoneClick(uid)}
            disabled={isEditing}
            className={`px-3 py-1 rounded-lg ${
              completingTodos.includes(uid)
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-gray-300 hover:bg-gray-400 text-black"
            }`}
          >
            {completingTodos.includes(uid) ? (
              <i className="fa-solid fa-circle-check"></i>
            ) : (
              <i className="fa-regular fa-circle"></i>
            )}
          </button>
        </div>
      </div>
    </li>
  );
}
