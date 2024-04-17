import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, fetchTodos, toggleTodo } from "../app/todos/todoReducer";
import "../sass/todo.scss";
import Todoadd from "./Todoadd";

function Todolist() {
  const { loading, todos, error } = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  const todoLenght = todos.length;
  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  const handleToggleTodo = (id) => {
    dispatch(toggleTodo(id)); // Dispatch toggleTodo action with the todo id
  };


  return (
    <div className="container">
      <div><Todoadd/></div>
      <div className="todos">
        <h1>Todos ({todoLenght})</h1>
        {loading && <h1>Loading....</h1>}
        {error && <h1>Error...</h1>}
        {todos.length > 0 && (
          <ul>
            {todos.map((todo) => (
              <li key={todo.id} onClick={() => handleToggleTodo(todo.id)}>
                {todo.title} {todo.completed ? "✅" : "❌"}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Todolist;
