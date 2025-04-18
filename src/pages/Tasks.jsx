import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // ✅ Importar Link
import styles from '../styles/Tasks.module.css';
import chatIcon from '../assets/chat.png';

const Tasks = () => {
  const [selectedTask, setSelectedTask] = useState('');
  const [selectedParticipant, setSelectedParticipant] = useState('');
  const [assignedTasks, setAssignedTasks] = useState([]);

  const handleAssignTask = () => {
    if (selectedTask && selectedParticipant) {
      const newTask = {
        task: selectedTask,
        participant: selectedParticipant,
      };

      setAssignedTasks([...assignedTasks, newTask]);
      setSelectedTask('');
      setSelectedParticipant('');
    }
  };

  const handleRemoveTask = (index) => {
    const updatedTasks = assignedTasks.filter((_, i) => i !== index);
    setAssignedTasks(updatedTasks);
  };

  return (
    <div className={styles.container}>
      {/* Encabezado */}
      <header className={styles.header}>
        <div className={styles.containerName}>
          <Link to="/meeting">
            <i className={`fa-solid fa-circle-arrow-left ${styles.iconoVolver}`}></i>
          </Link>
          <p id="deporte-seleccionado">Tareas</p>
          <div className={styles.chatIconContainer}>
            <a
              href="tu-url-de-chat.html"
              className={styles.chatLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir chat"
            >
              <img src={chatIcon} alt="Chat" />
            </a>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main>
        <div className={styles.asignarTarea}>
          <h3>Asignar Tareas</h3>

          {/* Selección de tarea */}
          <label htmlFor="task-select">Selecciona una tarea:</label>
          <div className={styles.customSelect}>
            <select
              id="task-select"
              className={styles.taskSelect}
              value={selectedTask} // Controlando el valor seleccionado
              onChange={(e) => setSelectedTask(e.target.value)} // Actualizando el estado
            >
              <option value="" disabled>Elige una tarea</option>
              <option value="implementos">Llevar implementos deportivos</option>
              <option value="agua">Repartir agua</option>
              <option value="arbitro">Hacer de árbitro</option>
              <option value="anotaciones">Llevar anotaciones</option>
              <option value="fotografia">Tomar fotografías</option>
              <option value="entrenador">Apoyar como entrenador</option>
              <option value="equipo">Organizar equipos</option>
              <option value="seguridad">Encargarse de la seguridad</option>
            </select>
            <i className={`fa-solid fa-chevron-down ${styles.taskIcon}`}></i>
          </div>

          {/* Selección de participante */}
          <h4>Seleccionar participante:</h4>
          <div className={styles.customSelect}>
            <select
              id="participant-select"
              className={styles.participantSelect}
              value={selectedParticipant} // Controlando el valor seleccionado
              onChange={(e) => setSelectedParticipant(e.target.value)} // Actualizando el estado
            >
              <option value="" disabled>Selecciona un participante</option>
              <optgroup label="Equipo Rojo">
                {[...Array(11)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    Participante {i + 1} - Número: {i + 1} (Rojo)
                  </option>
                ))}
              </optgroup>
              <optgroup label="Equipo Azul">
                {[...Array(11)].map((_, i) => (
                  <option key={i + 12} value={i + 12}>
                    Participante {i + 12} - Número: {i + 1} (Azul)
                  </option>
                ))}
              </optgroup>
            </select>
            <i className={`fa-solid fa-chevron-down ${styles.selectIcon}`}></i>
          </div>

          <button
            id="assign-task"
            className={styles.assignButton}
            onClick={handleAssignTask}
          >
            Asignar Tarea
          </button>
        </div>

        {/* Lista de tareas asignadas */}
        <div className={styles.assignedTasks}>
          <h3>Tareas Asignadas</h3>
          <ul id="tasks-list" className={styles.tasksList}>
            {assignedTasks.map((task, index) => (
              <li key={index}>
                Tarea: {task.task}, Participante: {task.participant}
                <button
                  className={styles.removeButton}
                  onClick={() => handleRemoveTask(index)}
                  aria-label="Eliminar tarea"
                  title="Eliminar tarea"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>

      {/* Pie de página */}
      <footer className={styles.footer}>
        <Link to="/meeting">
          <button className={styles.saveButton}>
            <span>Guardar</span>
          </button>
        </Link>
        <p className={styles.footerNote}>
          *En algunos encuentros las tareas pueden variar
        </p>
      </footer>
    </div>
  );
};

export default Tasks;
