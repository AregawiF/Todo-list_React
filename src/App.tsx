import { useState } from "react";
import './styles/app.css';

interface TODO {
  text: string;
  completed: boolean;
}

export default function App() {
  const [tasks, setTasks] = useState<TODO[]>([ ]);

  const [newTask, setNewTask] = useState("");

  const handleCheck = (index: number) => {
    const newTasks = tasks.map((task, i) => 
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  const editTask = (index: number) => {
    const newText = prompt("Edit task text:", tasks[index].text);
    if (newText?.trim()) {
      const newTasks = tasks.map((task, i) => 
        i === index ? { ...task, text: newText } : task
      );
      setTasks(newTasks);
    }
  };

  const deleteTask = (index: number) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this task?");
    if (isConfirmed) {
      const newTasks = tasks.filter((_, i) => i !== index);
      setTasks(newTasks);
    }
  };

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  return (
    <div className="main">
      <div className="card">
        <div className="heading">
          <h1 className="title">Todo List App</h1>
        </div>
        <div className="inputContainer">
          <input 
            type="text" 
            value={newTask} 
            onChange={(e) => setNewTask(e.target.value)} 
            placeholder="Add a new task" 
          />
          <button className="addButton" onClick={addTask}>Add Task</button>
        </div>
        <div className="taskcontainer">
          <ul className="tasklist">
            {tasks.length === 0 ? (
              <p className="text">No tasks added yet.</p>) : ( tasks.map((task, index) => (
                <li className="task" key={index}>
                  <div className="left">
                    <input 
                      className="checkbox"
                      type="checkbox" 
                      checked={task.completed} 
                      onChange={() => handleCheck(index)} 
                      /> 
                    <span className={task.completed ? "completed text" : "text"}>
                      {task.text}
                    </span>
                  </div>
                  <div className="buttons">
                    <button 
                      className="editButton" 
                      onClick={() => editTask(index)}
                    >
                      Edit
                    </button>
                    <button 
                      className="deleteButton" 
                      onClick={() => deleteTask(index)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
