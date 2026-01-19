import "./reset.css";
import "./App.css";

import Todoform from "./components/Todoform";
import Todolist from "./components/Todolist";
import CheckAll from "./components/CheckAll";
import Filter from "./components/Filter";
import ClearCompleted from "./components/ClearCompleted";
import { useEffect, useState } from "react";

function App() {
  let [todos, setTodos] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/todos")
      .then((response) => response.json())
      .then((todos) => setTodos(todos));
  }, []);

  let addTodo = (newTodo) => {
    // Server-side POST
    fetch("http://localhost:3001/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });

    // Client-side update
    setTodos((prevState) => [...prevState, newTodo]);
  };

  let deleteTodo = (id) => {
    fetch(`http://localhost:3001/todos/${id}`, {
      method: "DELETE",
    });
    setTodos((prevState) => prevState.filter((todo) => todo.id !== id));
  };

  let updateTodo = (updatedTodo) => {
    fetch(`http://localhost:3001/todos/${updatedTodo.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    });
    setTodos((prevState) =>
      prevState.map((todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo,
      ),
    );
  };

  let remainingCount = todos.filter(t => !t.completed).length;

  let checkAll = () => {
    todos.forEach(t => {
      t.completed = true;
      updateTodo(t);
    })
    setTodos((prevState) => prevState.map(t => ({...t, completed: true})));
  };

  let clearCompleted = () => {
    todos.forEach(t => t.completed && deleteTodo(t.id));
    setTodos(prevState => prevState.filter(t => !t.completed));
  }
  
  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <Todoform addTodo={addTodo} />

        <Todolist
          todos={todos}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />

        <CheckAll remainingCount={remainingCount} checkAll={checkAll} />
        <div className="other-buttons-container">
          <Filter />
          <ClearCompleted clearCompleted={clearCompleted} />
        </div>
      </div>
    </div>
  );
}

export default App;
