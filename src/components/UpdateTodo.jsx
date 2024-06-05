import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateTodo } from "../redux/todoSlice";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { updateTodoInFirestore } from "../services/firebase.service";

const UpdateTodo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const location = useLocation();
  console.log(title +"my title i write")

  useEffect(() => {
    if (location.state && location.state.todo) {
      const { title, description,   } = location.state.todo;
      setTitle(title);
      setDescription(description);
    }
  }, [location.state]);

  

  const handleUpdate = async () => {
    dispatch(updateTodo({
      id: id,
      title: title,
      description: description
    }));

    try {
      await updateTodoInFirestore(id, { title, description });
      navigate("/todolist");
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleCancel = () => {
    navigate("/todolist");
  };

  return (
    <div className="update-todo-page">
      <div className="container">
        <h2>Update Todo</h2>
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
        <div className="actions">
          <button onClick={handleUpdate} className="update-button">
            Update
          </button>
          <button onClick={handleCancel} className="cancel-button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateTodo;
