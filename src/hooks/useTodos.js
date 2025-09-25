import { useState, useEffect } from "react";

export default function useTodos(selectedDate, soundMute, sfxVolume, sendToAI, aiActive, username) {
  const [todosByDate, setTodosByDate] = useState({});
  const [todosDoneByDate, setTodosDoneByDate] = useState({});
  const [todosDeletedByDate, setTodosDeletedByDate] = useState({});

  const [removingTodos, setRemovingTodos] = useState([]);
  const [addingTodos, setAddingTodos] = useState([]);
  const [restoringTodos, setRestoringTodos] = useState([]);
  const [completingTodos, setCompletingTodos] = useState([]);

  // --- persist data to localStorage ---
  const persistData = (todosByDate, todosDoneByDate, todosDeletedByDate) => {
    localStorage.setItem("todosByDate", JSON.stringify(todosByDate));
    localStorage.setItem("todosDoneByDate", JSON.stringify(todosDoneByDate));
    localStorage.setItem("todosDeletedByDate", JSON.stringify(todosDeletedByDate));
  };

  // --- load todos from storage ---
  useEffect(() => {
    const localTodos = JSON.parse(localStorage.getItem("todosByDate") || "{}");
    const localDone = JSON.parse(localStorage.getItem("todosDoneByDate") || "{}");
    const localDeleted = JSON.parse(localStorage.getItem("todosDeletedByDate") || "{}");
    setTodosByDate(localTodos);
    setTodosDoneByDate(localDone);
    setTodosDeletedByDate(localDeleted);
  }, []);

  // --- add todo ---
  const handleAddTodo = (newTodo) => {
    const dateKey = selectedDate;
    const updatedTodosByDate = { ...todosByDate };
    if (!updatedTodosByDate[dateKey]) updatedTodosByDate[dateKey] = [];
    updatedTodosByDate[dateKey].push(newTodo);

    setAddingTodos(prev => [...prev, newTodo.id]);
    setTodosByDate(updatedTodosByDate);
    persistData(updatedTodosByDate, todosDoneByDate, todosDeletedByDate);

    if (aiActive) sendToAI(newTodo.text, username);

    setTimeout(() => setAddingTodos(prev => prev.filter(id => id !== newTodo.id)), 900);
  };

  // --- delete todo ---
  const handleDeleteTodo = (uid) => {
    const dateKey = selectedDate;
    const currentTodos = todosByDate[dateKey] || [];
    const deletedTodo = currentTodos.find(todo => todo.id === uid);
    if (!deletedTodo) return;

    setRemovingTodos(prev => [...prev, uid]);

    setTimeout(() => {
      const updatedTodosByDate = { ...todosByDate };
      updatedTodosByDate[dateKey] = currentTodos.filter(todo => todo.id !== uid);

      const updatedDeletedByDate = { ...todosDeletedByDate };
      if (!updatedDeletedByDate[dateKey]) updatedDeletedByDate[dateKey] = [];
      updatedDeletedByDate[dateKey].push(deletedTodo);

      setTodosByDate(updatedTodosByDate);
      setTodosDeletedByDate(updatedDeletedByDate);
      persistData(updatedTodosByDate, todosDoneByDate, updatedDeletedByDate);

      setRemovingTodos(prev => prev.filter(id => id !== uid));
    }, 900);
  };

  // --- mark done ---
  const handleMarkDone = (uid) => {
    setCompletingTodos(prev => [...prev, uid]);

    const dateKey = selectedDate;
    const currentTodos = todosByDate[dateKey] || [];
    const doneTodo = { ...currentTodos.find(todo => todo.id === uid), done: true };

    const updatedTodosByDate = { ...todosByDate };
    updatedTodosByDate[dateKey] = currentTodos.filter(todo => todo.id !== uid);

    const updatedDoneByDate = { ...todosDoneByDate };
    if (!updatedDoneByDate[dateKey]) updatedDoneByDate[dateKey] = [];
    updatedDoneByDate[dateKey].push(doneTodo);

    setTimeout(() => {
      setTodosByDate(updatedTodosByDate);
      setTodosDoneByDate(updatedDoneByDate);
      persistData(updatedTodosByDate, updatedDoneByDate, todosDeletedByDate);
      setCompletingTodos(prev => prev.filter(id => id !== uid));
    }, 900);
  };

  // --- restore ---
  const restoreTodo = (uid) => {
    const dateKey = selectedDate;
    const deletedTodos = todosDeletedByDate[dateKey] || [];
    const todoToRestore = deletedTodos.find(t => t.id === uid);
    if (!todoToRestore) return;

    const updatedDeletedByDate = { ...todosDeletedByDate };
    updatedDeletedByDate[dateKey] = deletedTodos.filter(t => t.id !== uid);

    const updatedTodosByDate = { ...todosByDate };
    if (!updatedTodosByDate[dateKey]) updatedTodosByDate[dateKey] = [];
    updatedTodosByDate[dateKey].push(todoToRestore);

    setRestoringTodos(prev => [...prev, uid]);

    setTimeout(() => {
      setTodosDeletedByDate(updatedDeletedByDate);
      setTodosByDate(updatedTodosByDate);
      persistData(updatedTodosByDate, todosDoneByDate, updatedDeletedByDate);
      setRestoringTodos(prev => prev.filter(id => id !== uid));
    }, 600);
  };

  return {
    todosByDate,
    todosDoneByDate,
    todosDeletedByDate,
    addingTodos,
    removingTodos,
    restoringTodos,
    completingTodos,
    handleAddTodo,
    handleDeleteTodo,
    handleMarkDone,
    restoreTodo,
    setTodosByDate,
    setTodosDoneByDate,
    setTodosDeletedByDate
  };
}
