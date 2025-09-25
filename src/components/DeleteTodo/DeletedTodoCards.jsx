import React from "react";

export default function DeletedTodoCards({
  todo,
  index,
  restoringTodos,
  restoreTodo,
  removeFromData,
  removingTodos,
}) {
  return (
    <li
      className={`todoCard ${
        removingTodos.includes(todo.id) ? "removing" : ""
      } ${
        restoringTodos.includes(todo.id) ? "restoring" : ""
      } z-5 rounded-xl w-full backdrop-blur-[20px] border `}
      style={{
        backgroundColor: "var(--card-bg-color)",
        borderColor: "var(--border-color)",
      }}
    >
      <div className="relative w-full h-full rounded-lg ">
        <div className="relative w-full flex justify-between">
          {/* Header */}

          <div className="w-full">
            <div
              style={{
                borderColor: "var(--border-color)",
              }}
              className="flex items-center justify-between p-2 border-b"
            >
              <h3 className="text-xl font-semibold">
                {index + 1}. {todo.subtitle}
              </h3>
            </div>

            {/* Body */}
            <div className="p-4 space-y-4 m-0">
              <p className="text-base">{todo.text}</p>
              <div className="flex gap-2"></div>
            </div>
          </div>

          {/* Footer / Buttons */}
          <div
            style={{
              backgroundColor: "var( --gray-dark)",
            }}
            className="w-24 flex flex-col items-center gap-2 px-2 py-4 border rounded-r-xl "
          >
            {/* Delete */}
            <button
              onClick={() => removeFromData(todo.id)}
              className="px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 transition transform hover:-translate-y-0.5"
            >
              <i className="fa-solid fa-trash-can"></i>
            </button>

            {/* Restore */}
            <button
              onClick={() => restoreTodo(todo.id)}
              className="px-3 py-1 rounded-lg bg-gray-300 hover:bg-gray-400 transition transform hover:-translate-y-0.5"
            >
              <i className="fa-solid fa-trash-can-arrow-up"></i>
            </button>

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
