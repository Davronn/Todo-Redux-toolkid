// In todoReducer.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTodos = createAsyncThunk("todo/fetchTodos", () =>
  axios
    .get("http://localhost:3000/todos")
    .then((res) => res.data)
    .catch((err) => err.message)
);

export const toggleTodo = createAsyncThunk("todo/toggleTodo", (id) =>
  axios
    .patch(`http://localhost:3000/todos/${id}`, )
    .then((res) => res.data)
    .catch((err) => err.message)
);

export const addTodo = createAsyncThunk("todo/addTodo", async (todoData) => {
  const response = await axios.post("http://localhost:3000/todos", todoData);
  return response.data;
});

export const deleteTodo = createAsyncThunk("todo/deleteTodo", async (id) => {
  await axios.delete(`http://localhost:3000/todos/${id}`);
  return id;
});

const todo = createSlice({
  name: "todo",
  initialState: {
    loading: false,
    todos: [],
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.loading = true;
      state.todos = [];
      state.error = "";
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.loading = false;
      state.todos = action.payload;
      state.error = "";
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.loading = false;
      state.todos = [];
      state.error = action.payload;
    });
    builder.addCase(toggleTodo.fulfilled, (state, action) => {
      const updatedTodos = state.todos.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : {...todo, completed: todo.completed}
      );
      state.todos = updatedTodos;
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    });
  },
});

export const todoReducer = todo.reducer;
export const todoActions = { ...todo.actions, toggleTodo };
