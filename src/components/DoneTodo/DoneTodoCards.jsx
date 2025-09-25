import React from "react";

export default function DoneTodoCards({
  todo,
  index,
  removeFromData,
  removingTodos,
}) {
  return (
    <li
      className={`todoCard ${
        removingTodos.includes(todo.id) ? "removing" : ""
      } z-5 rounded-xl w-full backdrop-blur-[20px] border`}
      style={{
        backgroundColor: "var(--card-bg-color)",
        borderColor: "var(--border-color)",
      }}
    >
      <div className="relative w-full h-full rounded-lg">
        <div className="relative w-full flex justify-between">
          {/* Left Section (Header + Body) */}
          <div className="w-full">
            {/* Header */}
            <div
              style={{ borderColor: "var(--border-color)" }}
              className="flex items-center justify-between p-2 border-b"
            >
              <h3 className="text-xl font-semibold">
                {index + 1}. {todo.subtitle}
              </h3>
            </div>

            {/* Body */}
            <div className="p-4 space-y-4 m-0">
              <p className="text-base">{todo.text}</p>
            </div>
          </div>

          {/* Right Section (Footer / Delete button + date) */}
          <div
            style={{ backgroundColor: "var(--gray-dark)" }}
            className="w-24 flex flex-col items-center gap-2 px-2 py-4 border rounded-r-xl"
          >
            {/* Delete */}
            <button
              onClick={() => removeFromData(todo.id)}
              className="px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 transition transform hover:-translate-y-0.5"
            >
              <i className="fa-solid fa-trash-can"></i>
            </button>

            {/* Date / Time */}
            <p className="text-center p-0 m-0">
              {todo.date && todo.time
                ? `${todo.date} | ${todo.time}`
                : `${todo.date || ""} ${todo.time || ""}`}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
}
