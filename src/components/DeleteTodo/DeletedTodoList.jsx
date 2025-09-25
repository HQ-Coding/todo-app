import React, { Suspense, lazy } from "react";
const DeletedTodoCards = lazy(() => import("./DeletedTodoCards"));

export default function DeletedTodo({
  restoringTodos,
  todosDeleted,
  restoreTodo,
  removeFromData,
  removingTodos,
}) {
  return (
    <ul className="h-96 overflow-y-auto [scrollbar-width:none] mx-auto md:mx-5 mt-1 space-y-2">
      {todosDeleted.map((todo, index) => (
        <Suspense fallback={<div className="font-extrabold text-white" >Loading Done...</div>}>
          <DeletedTodoCards
            key={todo.id}
            todo={todo}
            index={index}
            restoringTodos={restoringTodos}
            restoreTodo={restoreTodo}
            removeFromData={removeFromData}
            removingTodos={removingTodos}
          />
        </Suspense>
      ))}
    </ul>
  );
}
