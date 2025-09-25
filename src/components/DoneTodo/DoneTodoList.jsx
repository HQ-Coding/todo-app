import React , {Suspense, lazy} from "react";
const DoneTodoCards = lazy(() => import("./DoneTodoCards"));

export default function DeletedTodoList({
  todosDone,
  removeFromData,
  removingTodos,
}) {
  return (
    <ul className="h-96 overflow-y-auto [scrollbar-width:none] mx-auto md:mx-5 mt-1 space-y-2">
      {todosDone.map((todo, index) => (
        <Suspense fallback={<div className="font-extrabold text-white" >Loading Done...</div>}>
        <DoneTodoCards
          key={todo.id} 
          todo={todo}
          index={index}
          removeFromData={removeFromData}
          removingTodos={removingTodos}
        />
        </Suspense>
      ))}
    </ul>
  );
}
