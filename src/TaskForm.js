import React, { useState } from 'react';

function TaskForm({ addTask }) {
  const [taskText, setTaskText] = useState('');

  const handleChange = (e) => {
    setTaskText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText) {
      const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
      };
      addTask(newTask);
      setTaskText('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={taskText} 
        onChange={handleChange} 
        placeholder="Añadir tarea" 
      />
      <button type="submit">Agregar</button>
    </form>
  );
}

export default TaskForm;
