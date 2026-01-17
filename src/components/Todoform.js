import React from "react";
import { useState } from "react";

export default function Todoform({ addTodo }) {
  let [task, setTask] = useState("");

  let handleSubmit = (e) => {
    e.preventDefault();
    let newTodo = {
      id: Math.random(),
      task,
      completed: false,
    };
    addTodo(newTodo);
    setTask("");
  };
  return (
    <form action="#" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        placeholder="What do you need to do?"
        onChange={(e) => setTask(e.target.value)}
        value={task}
      />
    </form>
  );
}
