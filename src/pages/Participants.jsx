// Participants.jsx
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from '../styles/Participants.module.css';
import chatIcon from '../assets/chat.png';

import { db } from '../../src/firebase';
import { doc, getDoc } from 'firebase/firestore';

import ParticipantCard from './ParticipantCard';  // Importa el componente aquí

export default function Participants() {
  const location = useLocation();
  const eventoId = location.state?.id;

  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const fetchParticipants = async () => {
      if (!eventoId) return;

      try {
        const docRef = doc(db, 'eventos', eventoId);
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
                  equipo = assignedPlayer.equipo;
                }
              }
            }

            const tareaAsignada = tareas.find(
              (t) => t.participant === p.nombre || t.participant === p.name
            );

            return {
              ...p,
              posicion: posicion || 'Sin asignar',
              equipo: equipo || '',
              tarea: tareaAsignada?.task || 'Sin tarea asignada',
            };
          });

          setParticipants(participantesConDetalles);
        }
      } catch (error) {
        console.error('Error al obtener datos de participantes:', error);
      }
    };

    fetchParticipants();
  }, [eventoId]);

  return (
    <div className={styles.participantsWrapper}>
      <header className={styles.header}>
        <div className={styles.containerName}>
          <Link to={`/meeting/${eventoId}`}>
            <i className={`fa-solid fa-circle-arrow-left ${styles.iconoVolver}`}></i>
          </Link>

          <p className={styles.title}>Participantes</p>

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

      <main className={styles.participantsMain}>
        {participants.map((p) => (
          <ParticipantCard
            key={p.uid}
            nombre={p.nombre || p.name}
            tarea={p.tarea}
            posicion={p.posicion}
            foto={p.avatar || 'https://i.pravatar.cc/60'}
            equipo={p.equipo}
          />
        ))}
      </main>
    </div>
  );
}
