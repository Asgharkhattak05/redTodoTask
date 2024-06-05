import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TodoList from "./components/TodoList";
import UpdateTodo from "./components/UpdateTodo";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/todolist" element={<TodoList />} />
        <Route path="/update/:id" element={<UpdateTodo />} />
    </Routes>
  );
};

export default App;
