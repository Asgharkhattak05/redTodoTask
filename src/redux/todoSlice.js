import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push({ ...action.payload, completed: false });
    },
    updateTodo: (state, action) => {
      const { id, title, description } = action.payload;
      return state.map((todo) =>
        todo.id === id ? { ...todo, title, description } : todo
      );
    },
    deleteTodo: (state, action) => {
      const newState = state.filter((todo) => todo.id !== action.payload);
      return newState;
    },

    toggleTodo: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});

export const { addTodo, updateTodo, deleteTodo, toggleTodo } =
  todoSlice.actions;
export default todoSlice.reducer;
