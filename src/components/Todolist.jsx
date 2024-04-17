import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../app/todos/todoReducer";
import "../sass/todo.scss";

function Todolist() {
  const { loading, todos, error } = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  const todoLenght = todos.length;

  return (
    <div className="container">
      <div></div>
      <div className="todos">
        <h1>Todos ({todoLenght})</h1>
        {loading && <h1>Loading....</h1>}
        {error && <h1>Error...</h1>}
        {todos.length > 0 && (
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>{todo.title} {todo.completed ? "✅":"🫂"}</li> 
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Todolist;
