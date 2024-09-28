import "./App.css";
import TodoApp from "./Components/TodoApp/TodoApp";
import { useEffect, useState } from "react";

function App() {
  const [todo, setTodos] = useState();
  useEffect(() => {
    fetch("https://dummyjson.com/todos")
      .then((response) => response.json())
      .then((data) => {
        console.log("data in App from Dummy...", data);
        const initialTodos = data.todos.map((todo) => ({
          id: todo.id,
          text: todo.todo,
          completed: todo.completed,
        }));
        setTodos(initialTodos);
      });
  }, []);
  return (
    <div className="appContainer">
      <TodoApp />
    </div>
  );
}

export default App;
