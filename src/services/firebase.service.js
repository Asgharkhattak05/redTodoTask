import { deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

export const fetchTodos = async () => {
  const querySnapshot = await db.collection("todos").get();
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const addTodoToFirestore = async (todo) => {
  await db.collection("todos").doc(todo.id).set(todo);
};

export const updateTodoInFirestore = async (id, updates) => {
  try {
    await db.collection("todos").doc(id).set(updates);
  } catch (error) {
    console.error("Error updating todo:", error);
  }
};

export const deleteTodoFromFirestore = async (id) => {
  console.log(id);
  try {
    const deleteVal = doc(db, "todos", id);
    await deleteDoc(deleteVal);
  } catch (error) {
    console.error("Error deleting todo from Firestore:", error);
  }
};

export const toggleTodoInFirestore = async (todo) => {
  try {
    await db.collection("todos").doc(todo.id).update({
      completed: !todo.completed,
    });
    console.log("Todo status updated successfully");
  } catch (error) {
    console.error("Error updating todo status: ", error);
  }
};
