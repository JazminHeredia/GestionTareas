import React, { useState } from "react";
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [filter, setFilter] = useState("all");  // Filtro de tareas (all, completed, pending)
  
  // Cargar las tareas desde localStorage cuando la página se carga
  React.useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  // Guardar las tareas en localStorage cada vez que cambian
  React.useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (taskText.trim()) {
      const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setTaskText(""); // Limpiar el input
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const updateTask = (id, newText) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: newText } : task
    ));
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;  // Mostrar todas las tareas si el filtro es "all"
  });

  const sortedTasks = filteredTasks.sort((a, b) => b.id - a.id);

  return (
    <div className="App">
      <h1>Lista de Tareas</h1>
      <form onSubmit={addTask}>
        <input 
          type="text" 
          value={taskText} 
          onChange={(e) => setTaskText(e.target.value)} 
          placeholder="Escribe una tarea"
        />
        <button type="submit">Agregar</button>
      </form>

      <div className="filter">
        <label>Filtrar por: </label>
        <select onChange={handleFilterChange} value={filter}>
          <option value="all">Todas</option>
          <option value="completed">Completadas</option>
          <option value="pending">Pendientes</option>
        </select>
      </div>

      <ul>
        {sortedTasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            toggleTaskCompletion={toggleTaskCompletion}
            updateTask={updateTask}
          />
        ))}
      </ul>
    </div>
  );
}

function Task({ task, deleteTask, toggleTaskCompletion, updateTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const handleEditClick = () => setIsEditing(true);

  const handleSave = () => {
    updateTask(task.id, newText);
    setIsEditing(false);
  };

  const handleCancel = () => setIsEditing(false);

  return (
    <li className={task.completed ? 'completed' : ''}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTaskCompletion(task.id)}
      />
      <span>{task.text}</span>
      <button className="edit" onClick={handleEditClick}>Editar</button>
      <button className="delete" onClick={() => deleteTask(task.id)}>Eliminar</button>

      {/* Modal de edición */}
      {isEditing && (
        <div className="modal">
          <div className="modal-content">
            <h3>Editar Tarea</h3>
            <textarea
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              rows="4"
            />
            <div className="modal-actions">
              <button className="save" onClick={handleSave}>Guardar</button>
              <button className="cancel" onClick={handleCancel}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </li>
  );
}

export default App;
