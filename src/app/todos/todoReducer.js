import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTodos = createAsyncThunk("todo/fetchTodos", () =>
  axios
    .get("http://localhost:3000/todos")
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    })
);

export const toggleTodo = createAsyncThunk(
  "todo/toggleTodo",
  async (id, { getState }) => {
    const { todos } = getState().todo;
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) {
      throw new Error("Todo not found");
    }
    const updatedTodo = { ...todo, completed: !todo.completed };
    await axios.patch(`http://localhost:3000/todos/${id}`, updatedTodo);
    return updatedTodo;
  }
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
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const updatedTodo = action.payload;
        const index = state.todos.findIndex(
          (todo) => todo.id === updatedTodo.id
        );
        if (index !== -1) {
          state.todos[index] = updatedTodo;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      });
  },
});

export const todoReducer = todo.reducer;
export const todoActions = { ...todo.actions, toggleTodo };
