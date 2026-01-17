import React from "react";
import Todo from "../components/Todo";

export default function Todolist({ todos , deleteTodo, updateTodo}) {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} deleteTodo={deleteTodo} updateTodo={updateTodo}/>
      ))}
    </ul>
  );
}
