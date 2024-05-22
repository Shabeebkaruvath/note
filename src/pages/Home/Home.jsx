import React, { useState } from "react";
import "./Home.css";


const Home = () => {
  const [taskList, setTaskList] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  const renderTasks = () => {
    return taskList.map((task, index) => (
      <li key={index} className="task-item">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTaskStatus(index)}
          className="task-checkbox"
        />
        <span
          style={{ textDecoration: task.completed ? "line-through" : "none" }}
          className="task-description"
        >
          {task.description}
        </span>
        <button onClick={() => deleteTask(index)} className="task-delete-btn">
          Delete
        </button>
      </li>
    ));
  };

  const addTask = (description) => {
    const newTask = { description, completed: false };
    setTaskList([...taskList, newTask]);
  };

  const toggleTaskStatus = (index) => {
    const newTaskList = [...taskList];
    newTaskList[index].completed = !newTaskList[index].completed;
    setTaskList(newTaskList);
  };

  const deleteTask = (index) => {
    setTaskList(taskList.filter((_, i) => i !== index));
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
      <ul id="task-list" className="task-list">
        {renderTasks()}
      </ul>
    </div>
  );
};

export default Home;