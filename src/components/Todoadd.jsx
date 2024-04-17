import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../app/todos/todoReducer";

function Todoadd() {
  const [inputValue, setInputValue] = useState(""); 
  const dispatch = useDispatch();

 
  const handleInputChange = (e) => {
    setInputValue(e.target.value); 
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (!inputValue.trim()) return; 
    dispatch(addTodo({ title: inputValue, completed: false }));
    setInputValue(""); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new todo..."
        value={inputValue}
        onChange={handleInputChange}
      />
      <button onClick={()=>window.location.reload()} type="submit">Add Todo</button>
    </form>
  );
}

export default Todoadd;
