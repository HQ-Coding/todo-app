import { useState } from "react";

export default function useTodoHistory(
  todosByDate,
  setTodosByDate,
  todosDoneByDate,
  setTodosDoneByDate,
  todosDeletedByDate,
  setTodosDeletedByDate
) {
  const [todoHistory, setTodoHistory] = useState({});

  // ------------------- GET HISTORY -------------------
  const getHistory = (
    initTodosByDate,
    initTodosDoneByDate,
    initTodosDeletedByDate
  ) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const newTodosByDate = { ...initTodosByDate };
    const newTodosDoneByDate = { ...initTodosDoneByDate };
    const newTodosDeletedByDate = { ...initTodosDeletedByDate };
    const addToHistory = { ...todoHistory };

    Object.keys(newTodosByDate).forEach((dateKey) => {
      const target = new Date(dateKey);
      target.setHours(0, 0, 0, 0);
    
      if (target.getTime() < today.getTime()) {
        if (!addToHistory[dateKey]) addToHistory[dateKey] = [];
    
        addToHistory[dateKey] = [
          ...(addToHistory[dateKey] || []),
          ...(Array.isArray(newTodosByDate[dateKey]) ? newTodosByDate[dateKey] : []),
          ...(Array.isArray(newTodosDoneByDate[dateKey]) ? newTodosDoneByDate[dateKey] : []),
        ];
    
        // ❌ حذف از state اصلی
        delete newTodosByDate[dateKey];
        delete newTodosDoneByDate[dateKey];
        delete newTodosDeletedByDate[dateKey];
      }
    });

    setTodosByDate(newTodosByDate);
    setTodosDoneByDate(newTodosDoneByDate);
    setTodosDeletedByDate(newTodosDeletedByDate);
    setTodoHistory(addToHistory);

    localStorage.setItem("todosByDate", JSON.stringify(newTodosByDate));
    localStorage.setItem("todosDoneByDate", JSON.stringify(newTodosDoneByDate));
    localStorage.setItem(
      "todosDeletedByDate",
      JSON.stringify(newTodosDeletedByDate)
    );
    localStorage.setItem("todosHistory", JSON.stringify(addToHistory));
  };

  // ------------------- REMOVE HISTORY -------------------
  function removeHistoryFromData() {
    setTodoHistory({});
    localStorage.removeItem("todosHistory");
  }

  return { todoHistory, getHistory , removeHistoryFromData };
}
