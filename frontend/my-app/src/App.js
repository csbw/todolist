import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]); // State to manage the list of tasks
  const [editing, setEditing] = useState(false); // State to determine if user is editing
  const [newTask, setNewTask] = useState(''); // State to store input

  const addNewTask = () => {
    const newTaskNumber = tasks.length + 1;
    const task = { taskNumber: newTaskNumber, taskDescription: newTask };
    setTasks([...tasks, task]); // Updating the tasks state with the new task
    setEditing(false);
  };

  const startEditing = () => {
  setEditing(true)};

  const handleChange = (event) => {
    setNewTask(event.target.value);
  };


  return (
    <div className="App">
      <p> To Do List </p>
      {tasks.map((task, index) => (
        <Task key={index} taskDescription={task.taskDescription} />
      ))}
      <button onClick={startEditing}> New Task </button> {/* Step 2: Handle the click event */}
      {editing && (<div> <input type="text" onChange={handleChange} /> <button onClick={addNewTask}> Submit </button> </div>)}
    </div>
  );
}

function Task({ taskDescription }) {
  return (
    <p>
      <input type="checkbox" />
      {taskDescription}
    </p>
  );
}

export default App;
