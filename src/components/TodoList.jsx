import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { useNavigate } from "react-router-dom";
import { fetchTodos } from "../services/firebase.service";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };
  useEffect(() => {
  getTodos();
   
  }, []);
  const getTodos = async () => {
    try {
      const fetchedTodos = await fetchTodos();
      setTodos(fetchedTodos);
    } catch (error) {
      console.error("Error fetching todos: ", error);
    }
  };
  return (
    <>
    <div className={`todo-list ${todos.length === 0 ? "empty" : ""}`}>
      {todos.length === 0 ? (
        <div className="empty-message">
          <p>Todos are empty, please add a todo.</p>
          <button className="home-button" onClick={handleGoHome}>
            Go to Home
          </button>
        </div>
      ) : (
        todos.map((todo) => <TodoItem key={todo.id} todo={todo} getTodos={getTodos} />)
      )}
    </div>
   
        
    </>
  );
};

export default TodoList;
