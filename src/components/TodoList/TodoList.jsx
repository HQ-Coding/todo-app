import React , {Suspense, lazy} from "react";
const TodoCard = lazy(() => import("./TodoCard"));

export default function TodoList(props) {
  const {
    todos,
    completingTodos,
    removingTodos,
    addingTodos,
    handleEditTodo,
    handleDeleteTodo,
    handleMarkDone,
  } = props;

  return (
    <ul
      className="h-96 overflow-y-auto [scrollbar-width:none] flex flex-col items-center gap-2 mx-auto md:mx-5 mt-1 px-0"
      style={{ scrollbarWidth: "none" }}
    >
      {todos.map((todo, index) => (
         <Suspense fallback={<div className="font-extrabold text-white" >Loading Done...</div>}>
        <TodoCard
          key={todo.id}
          index={index}
          uid={todo.id}
          text={todo.text}
          subtitle={todo.subtitle}
          date={todo.date}
          time={todo.time}
          isDone={todo.done}
          handleEditTodo={handleEditTodo}
          handleDeleteTodo={handleDeleteTodo}
          handleMarkDone={handleMarkDone}
          removingTodos={removingTodos}
          addingTodos={addingTodos}
          completingTodos={completingTodos}
        />
        </Suspense>
      ))}
    </ul>
  );
}
