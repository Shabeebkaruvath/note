import React, { useState } from 'react';
import './Home.css'; // Importing CSS for styling

const Home = () => {
  // State to store the tasks
  const [tasks, setTasks] = useState([]);
  const [taskDescription, setTaskDescription] = useState('');

  // Function to render the task list
  const renderTaskList = () => {
    return tasks.map((task, index) => (
      <li key={index}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => {
            const newTasks = [...tasks];
            newTasks[index].completed = !newTasks[index].completed;
            setTasks(newTasks);
          }}
        />
        <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
          {task.description}
        </span>
        <button onClick={() => {
          setTasks(tasks.filter((_, i) => i !== index));
        }}>
          Delete
        </button>
      </li>
    ));
  };

  // Function to add a new task
  const addTask = (description) => {
    const newTask = {
      description,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  // Event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskDescription.trim()) {
      addTask(taskDescription.trim());
      setTaskDescription('');
    }
  };

  return (
    <div className="task-app">
      <h1>Task List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="Add a new task"
        />
        <button type="submit">Add Task</button>
      </form>
      <ul id="task-list">
        {renderTaskList()}
      </ul>
    </div>
  );
};
export default Home;