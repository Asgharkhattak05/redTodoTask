import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, toggleTodo } from "../redux/todoSlice";
import { useNavigate } from "react-router-dom";
import {
  deleteTodoFromFirestore,
  toggleTodoInFirestore,
} from "../services/firebase.service";

const TodoItem = ({ todo , getTodos }) => {
  const [updatedTodo, setUpdatedTodo] = useState(todo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = async (todo) => {
    if (!todo || !todo.id) {
      console.error("No todo or todo.id found");
      return;
    }

    try {
      await deleteTodoFromFirestore(todo.id);
      dispatch(deleteTodo(todo.id));
      getTodos()
    } catch (error) {
      console.error("Error in handleDelete function:", error);
    }
  };

  const handleUpdate = () => {
    navigate(`/update/${todo.id}`, { state: { todo } });
    getTodos()
  };

  const handleToggle = async () => {
    try {
      await toggleTodoInFirestore(todo);
      dispatch(toggleTodo(todo.id));
      setUpdatedTodo({ ...todo, completed: !todo.completed });
      getTodos()
    } catch (error) {
      console.error("Error toggling todo status: ", error);
    }
  };

  useEffect(() => {
    setUpdatedTodo(todo);
  }, [todo]);

  return (
    <div className="todo-item">
      <div className="todo-card">
        <h3
          className={`todo-title ${updatedTodo.completed ? "completed" : ""}`}
        >
          {updatedTodo.title}
        </h3>
        <p
          className={`todo-description ${
            updatedTodo.completed ? "completed" : ""
          }`}
        >
          {updatedTodo.description}
        </p>
        <div className="todo-actions">
          <input
            type="checkbox"
            checked={updatedTodo.completed}
            onChange={handleToggle}
            className="toggle-checkbox"
          />
          <button className="update-button" onClick={handleUpdate}>
            Update
          </button>
          <button className="delete-button" onClick={() => handleDelete(todo)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
