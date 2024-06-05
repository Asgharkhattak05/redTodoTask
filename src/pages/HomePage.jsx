import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/todoSlice";
import { useNavigate } from "react-router-dom";
import { addTodoToFirestore } from "../services/firebase.service";
import { v4 as uuidv4 } from 'uuid';


const HomePage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      const newTodo = {
        id:uuidv4(),
        title,
        description,
        completed: false,
      };
      try {
        await addTodoToFirestore(newTodo);
        dispatch(addTodo(newTodo));
        setTitle('');
        setDescription('');
        navigate('/todolist');
      } catch (error) {
        console.error('Error adding todo: ', error);
      }
    }
  };
  return (
    <div className="home-page">
      <div className="container">
        <h1 className="header">Todo App</h1>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="input"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="input"
          ></textarea>
          <button type="submit" className="submit-button">
            Add Todo
          </button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;