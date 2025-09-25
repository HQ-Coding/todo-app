// TodoCard.jsx
import React from "react";

export default function TodoCard({ todo, index }) {
  return (
    <li
      className={`todoCard py-5 bg-[var(--card-bg-color)] border-[var(--border-color)] 
        z-5 rounded-xl w-full backdrop-blur-[20px] border ${
          todo.done ? "bg-green-100" : "bg-red-100"
        }`}
    >
      <div className="relative w-full max-h-full flex justify-between">
        <div className="flex flex-col w-full">
          <div className="flex items-center px-4">
            <h3 className="text-xl font-semibold text-gray-900">
              {index + 1}. {todo.subtitle}
            </h3>
          </div>
          <div className="flex items-center px-4">
            <p className="text-base text-gray-900">{todo.text}</p>
          </div>
        </div>
        <div className="max-w-full flex flex-col items-center gap-2 justify-center px-4">
          <div className="flex gap-2 text-sm text-gray-500">
            <p className="text-gray-900 text-md md:text-lg">
              {todo.date && todo.time ? `${todo.date} / ${todo.time}` : ""}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
}
