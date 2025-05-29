import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom"; // <-- Agregado useParams
import styles from "../styles/Participants.module.css";
import chatIcon from "../assets/chat.png";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../src/firebase";
import ParticipantCard from "./ParticipantCard";

export default function Participants() {
  const location = useLocation();
  const { id: paramId } = useParams(); // <-- Obtener id desde la URL
  const [eventoId, setEventoId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    // Usa primero location.state si existe, sino el id de la URL
    if (location.state) {
      setEventoId(location.state.id);
      setIsAdmin(location.state.isAdmin || false);
    } else if (paramId) {
      setEventoId(paramId);
    }
  }, [location.state, paramId]);

  useEffect(() => {
    const fetchParticipants = async () => {
      if (!eventoId) return;

      try {
        const docRef = doc(db, "eventos", eventoId);
        const eventoSnap = await getDoc(docRef);

        if (eventoSnap.exists()) {
          const data = eventoSnap.data();

          const participantes = data.participantes || [];
          const posiciones = data.posiciones || {};
          const tareas = data.tareas || [];

          const participantesConDetalles = participantes.map((p) => {
            let posicion = null;
            let equipo = null;

            for (const [team, teamPositions] of Object.entries(posiciones)) {
              for (const [posNum, assignedPlayer] of Object.entries(teamPositions)) {
                if (assignedPlayer.uid === p.uid) {
                  posicion = assignedPlayer.posicion;
                  equipo = team === "blue" ? "azul" : team === "red" ? "rojo" : team;
                }
              }
            }

            const tareaAsignada = tareas.find(
              (t) => t.participant === p.nombre || t.participant === p.name
            );

            return {
              ...p,
              posicion: posicion || "Sin asignar",
              equipo: equipo || "",
              tarea: tareaAsignada?.task || "Sin tarea asignada",
              photoURL: p.photoURL || "https://i.pravatar.cc/60",
            };
          });

          setParticipants(participantesConDetalles);
        }
      } catch (error) {
        console.error("Error al obtener datos de participantes:", error);
      }
    };

    fetchParticipants();
  }, [eventoId]);

  if (!eventoId) {
    return <p>Error: ID del evento no proporcionado.</p>;
  }

  return (
    <div className={styles.participantsWrapper}>
      <header className={styles.header}>
        <div className={styles.containerName}>
          <Link
            to={isAdmin ? `/meeting/${eventoId}` : "/profile"}
            className={styles.iconLink}
          >
            <i className={`fa-solid fa-circle-arrow-left ${styles.iconoVolver}`}></i>
          </Link>

          <p className={styles.title}>Participantes</p>

          <div className={styles.chatIconContainer}>
            <Link to={`/chat/${eventoId}`} className={styles.chatLink} aria-label="Abrir chat">
              <img src={chatIcon} alt="chat" />
            </Link>
          </div>
        </div>
      </header>

      <main className={styles.participantsMain}>
        {participants.map((p) => (
          <ParticipantCard
            key={p.uid}
            nombre={p.nombre || p.name}
            tarea={p.tarea}
            posicion={p.posicion}
            foto={p.photoURL}
            equipo={p.equipo}
          />
        ))}
      </main>
    </div>
  );
}
