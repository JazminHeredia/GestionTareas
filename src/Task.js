import React, { useState } from 'react';

function Task({ task, updateTask, deleteTask, toggleTaskCompletion }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTaskText, setNewTaskText] = useState(task.text);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setNewTaskText(e.target.value);
  };

  const handleSave = () => {
    updateTask({ ...task, text: newTaskText });
    setIsEditing(false);
  };

  return (
    <li>
      <input 
        type="checkbox" 
        checked={task.completed} 
        onChange={() => toggleTaskCompletion(task.id)} 
      />
      {isEditing ? (
        <input 
          type="text" 
          value={newTaskText} 
          onChange={handleChange} 
        />
      ) : (
        <span>{task.text}</span>
      )}
      <button onClick={handleEditClick}>
        {isEditing ? 'Guardar' : 'Editar'}
      </button>
      <button onClick={() => deleteTask(task.id)}>Eliminar</button>
    </li>
  );
}

export default Task;
