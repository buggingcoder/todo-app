import React, { useState, useEffect } from "react";
import AddTodo from "../AddTodo/AddTodo";
import Filter from "../Filter/Filter";
import TodoList from "../TodoList/TodoList";
// import AddTodo from "./Components/AddTodo/AddTodo";
// import TodoList from "./TodoList";
// import Filter from "./Filter";

const TodoApp = () => {
  // Initialize todos from localStorage or as an empty array
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [filter, setFilter] = useState("all");

  // Save todos to localStorage whenever todos state changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Add a new todo
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(), // Using timestamp as a unique id
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  // Toggle complete/incomplete
  const toggleTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  // Delete a todo
  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  // Filtered todos based on the selected filter
  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true; // "all"
  });

  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      <AddTodo addTodo={addTodo} />
      <Filter filter={filter} setFilter={setFilter} />
      <TodoList
        todos={filteredTodos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />
    </div>
  );
};

export default TodoApp;
