import React, { useState, useEffect } from "react";
import "./Home.css";
import { collection, addDoc,deleteDoc,updateDoc,doc, query,onSnapshot } from "firebase/firestore";
import { db } from "../firebase"; // Assuming you have a db instance initialized
import { useAuth } from "../../AuthContext";

const Home = () => {
  const { currentUser } = useAuth(); // Retrieve current user from AuthContext
  const [taskList, setTaskList] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, `users/${currentUser.uid}/tasks`)), // Query user-specific tasks collection
      (snapshot) => {
        const tasks = [];
        snapshot.forEach((doc) => {
          tasks.push({ id: doc.id, ...doc.data() });
        });
        setTaskList(tasks);
      },
      (error) => {
        console.error("Error fetching tasks: ", error);
      }
    );

    return () => unsubscribe();
  }, [currentUser]); // Subscribe to changes in currentUser

  const addTask = async (description) => {
    try {
      await addDoc(collection(db, `users/${currentUser.uid}/tasks`), { description, completed: false });
      console.log("Task added for the current user.");
    } catch (error) {
      console.error("Error adding task: ", error);
    }
  };

  const toggleTaskStatus = async (taskId, completed) => {
    try {
      await updateDoc(doc(db, `users/${currentUser.uid}/tasks`, taskId), { completed: !completed });
      console.log("Task status updated for the current user.");
    } catch (error) {
      console.error("Error updating task status: ", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, `users/${currentUser.uid}/tasks`, taskId));
      console.log("Task deleted for the current user.");
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskInput.trim()) {
      addTask(taskInput.trim());
      setTaskInput("");
    }
  };

  return (
    <div className="task-manager-container">
      <h1 className="task-manager-title">Task Manager</h1>
      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Add a new task"
          className="task-input"
        />
        <button type="submit" className="task-submit-btn">
          Add Task
        </button>
      </form>
      <ul className="task-list">
        {taskList.map((task) => (
          <li key={task.id} className="task-item">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskStatus(task.id, task.completed)}
              className="task-checkbox"
            />
            <span style={{ textDecoration: task.completed ? "line-through" : "none" ,fontSize:'large'}}>
              {task.description}
            </span>
            <button onClick={() => deleteTask(task.id)} className="task-delete-btn">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;