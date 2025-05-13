import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Tasks.module.css';
import chatIcon from '../assets/chat.png';

const Tasks = () => {
  const [selectedTask, setSelectedTask] = useState('');
  const [selectedParticipant, setSelectedParticipant] = useState('');
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [participants, setParticipants] = useState([]);

  // Simulación temporal de participantes reales
  useEffect(() => {
    const fakeParticipants = [
      { uid: '1', nombre: 'Carlos', equipo: 'Rojo' },
      { uid: '2', nombre: 'Lucía', equipo: 'Rojo' },
      { uid: '3', nombre: 'Mateo', equipo: 'Azul' },
      { uid: '4', nombre: 'Sofía', equipo: 'Azul' },
    ];
    setParticipants(fakeParticipants);
  }, []);

  const handleAssignTask = () => {
    if (selectedTask && selectedParticipant) {
      const participant = participants.find((p) => p.uid === selectedParticipant);
      const newTask = {
        task: selectedTask,
        participant: participant?.nombre || 'Desconocido',
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

  // Separar participantes por equipo
  const equipoRojo = participants.filter(p => p.equipo === 'Rojo');
  const equipoAzul = participants.filter(p => p.equipo === 'Azul');

  return (
    <div className={styles.container}>
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

      <main>
        <div className={styles.asignarTarea}>
          <h3>Asignar Tareas</h3>

          <label htmlFor="task-select">Selecciona una tarea:</label>
          <div className={styles.customSelect}>
            <select
              id="task-select"
              className={styles.taskSelect}
              value={selectedTask}
              onChange={(e) => setSelectedTask(e.target.value)}
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

          <h4>Seleccionar participante:</h4>
          <div className={styles.customSelect}>
            <select
              id="participant-select"
              className={styles.participantSelect}
              value={selectedParticipant}
              onChange={(e) => setSelectedParticipant(e.target.value)}
            >
              <option value="" disabled>Selecciona un participante</option>
              <optgroup label="Equipo Rojo">
                {equipoRojo.map((p) => (
                  <option key={p.uid} value={p.uid}>
                    {p.nombre} (Rojo)
                  </option>
                ))}
              </optgroup>
              <optgroup label="Equipo Azul">
                {equipoAzul.map((p) => (
                  <option key={p.uid} value={p.uid}>
                    {p.nombre} (Azul)
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
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>

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
