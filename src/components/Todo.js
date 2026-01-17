import { useState } from 'react';

export default function Todo({todo, deleteTodo, updateTodo}) {

let [ isEdit, setIsEdit ] = useState(false)
let [ task, setTask ] = useState(todo.task)

let updateTodoHandler = (e) => {
    e.preventDefault();
    let updatedTodo = { ...todo, task, completed: todo.completed };
    updateTodo(updatedTodo);
    setIsEdit(false);
}
  return (
    <li className="todo-item-container" key={todo.id}>
          <div className="todo-item">
            <input type="checkbox" />{!isEdit && <span className={`todo-item-label ${todo.completed ? "line-through" : ""}`} onDoubleClick={() => setIsEdit(true)}>{todo.task}</span>}
            <form onSubmit={updateTodoHandler}>
              {isEdit && <input autoFo cus type="text" className="todo-item-input" defaultValue={todo.task} onChange={(e) => setTask(e.target.value)}/>}
            </form>
          </div>
          <button className="x-button" onClick={() => deleteTodo(todo.id)}>
            <svg
              className="x-button-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </li>
  )
}
