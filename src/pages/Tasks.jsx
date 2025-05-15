import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "../styles/Tasks.module.css";
import chatIcon from "../assets/chat.png";

import { db } from "../../src/firebase";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

const Tasks = () => {
  const location = useLocation();
  const navigate = useNavigate(); // ✅ Para redirigir
  const eventoId = location.state?.id;
  console.log("Evento ID:", eventoId);

  const [selectedTask, setSelectedTask] = useState("");
  const [selectedParticipant, setSelectedParticipant] = useState("");
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchParticipantsAndPositions = async () => {
      if (!eventoId) return;

      try {
        const docRef = doc(db, "eventos", eventoId);
        const eventoSnap = await getDoc(docRef);
        if (eventoSnap.exists()) {
          const data = eventoSnap.data();
          const participantes = data.participantes || [];
          const posiciones = data.posiciones || {};

          const participantesConPosicion = participantes.map((p) => {
            let posicion = null;
            let equipo = null;

            for (const [team, teamPositions] of Object.entries(posiciones)) {
              for (const [posNum, assignedPlayer] of Object.entries(
                teamPositions
              )) {
                if (assignedPlayer.uid === p.uid) {
                  posicion = assignedPlayer.posicion;
                  equipo = assignedPlayer.equipo;
                }
              }
            }

            return {
              ...p,
              posicion,
              equipo,
            };
          });

          setParticipants(participantesConPosicion);
        } else {
          console.error("Evento no encontrado");
        }
      } catch (error) {
        console.error("Error al obtener participantes:", error);
      }
    };

    fetchParticipantsAndPositions();
  }, [eventoId]);

  const handleAssignTask = () => {
    if (selectedTask && selectedParticipant) {
      const participant = participants.find(
        (p) => p.uid === selectedParticipant
      );

      // Verificar si ya existe la misma tarea asignada al mismo participante
      const yaAsignada = assignedTasks.some(
        (t) =>
          t.task === selectedTask &&
          t.participant === (participant?.nombre || participant?.name)
      );

      if (yaAsignada) {
        setErrorMessage("🏃‍♂️ ¡Ups! Este jugador ya tiene esa tarea.");
        setTimeout(() => setErrorMessage(""), 3000); // Ocultar después de 3 segundos
        return;
      }

      const newTask = {
        task: selectedTask,
        participant: participant?.nombre || participant?.name || "Desconocido",
      };

      setAssignedTasks((prev) => [...prev, newTask]);
      setSelectedTask("");
      setSelectedParticipant("");
      setErrorMessage(""); // limpiar mensaje si antes hubo error
    }
  };

  const handleRemoveTask = (index) => {
    setAssignedTasks((prev) => prev.filter((_, i) => i !== index));
  };

  // ✅ NUEVA FUNCIÓN para guardar en Firestore y navegar
  const handleSaveTasks = async () => {
    if (!eventoId || assignedTasks.length === 0) return;

    try {
      const docRef = doc(db, "eventos", eventoId);
      await updateDoc(docRef, {
        tareas: arrayUnion(...assignedTasks),
      });

      navigate("/participants", { state: { id: eventoId } }); // ✅ Redirigir
    } catch (error) {
      console.error("Error al guardar las tareas:", error);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.containerName}>
          <Link to={`/meeting/${eventoId}`}>
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
              <option value="" disabled>
                Elige una tarea
              </option>
              <option value="Llevar implementos">Llevar implementos</option>
              <option value="Poner implementos">Poner implementos</option>
              <option value="Quitar implementos">Quitar implementos</option>
              <option value="Encender luces">Encender luces</option>
              <option value="Apagar luces">Apagar luces</option>
              <option value="Recoger dinero">Recoger dinero</option>
              <option value="Llenar asistencia">Llenar asistencia</option>
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
              <option value="" disabled>
                Selecciona un participante
              </option>
              {[...participants]
                .sort((a, b) =>
                  (a.nombre || a.name).localeCompare(b.nombre || b.name)
                )
                .map((p) => (
                  <option key={p.uid} value={p.uid}>
                    {p.nombre || p.name}
                    {p.posicion &&
                      ` - ${p.posicion} (${
                        p.equipo?.toLowerCase() === "azul" ? "Azul" : "Rojo"
                      })`}
                  </option>
                ))}
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
          {errorMessage && (
            <p className={styles.errorMessage}>{errorMessage}</p>
          )}
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
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* ✅ Botón para guardar y redirigir */}
        <div className={styles.saveButtonContainer}>
          <button className={styles.saveButton} onClick={handleSaveTasks}>
            Guardar
          </button>
          <p className={styles.infoMessage}>
            *En algunos encuentros las tareas pueden variar*📋
          </p>
        </div>
      </main>
    </div>
  );
};

export default Tasks;
