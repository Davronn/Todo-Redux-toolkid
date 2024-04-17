import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../app/todos/todoReducer"; // Import addTodo action creator

function Todoadd() {
  const [inputValue, setInputValue] = useState(""); // State to track input value
  const dispatch = useDispatch();

  // Function to handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value); 
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (!inputValue.trim()) return; // If input value is empty or contains only whitespace, do nothing
    dispatch(addTodo({ title: inputValue, completed: false })); // Dispatch addTodo action with new todo data
    setInputValue(""); // Clear input value
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
