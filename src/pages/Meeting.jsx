import React, { useEffect, useState } from "react";
import styles from "../styles/Meeting.module.css";
import { Link, useParams } from "react-router-dom";
import chatIcon from "../assets/chat.png";

import { auth } from "../../src/firebase";
import { db } from "../../src/firebase";
import { doc, onSnapshot } from "firebase/firestore";

const Meeting = () => {
  const { id } = useParams();
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Referencia al documento de evento en Firestore
    const docRef = doc(db, "eventos", id);

    // Suscribirse a los cambios del documento en tiempo real
    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setEvento(docSnap.data());
        } else {
          console.log("El evento no existe");
          setEvento(null);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error al obtener el evento:", error);
        setLoading(false);
      }
    );

    // Cleanup: cancelar la suscripción al desmontar el componente
    return () => unsubscribe();
  }, [id]);

  if (loading) {
    return <p>Cargando evento...</p>;
  }

  if (!evento) {
    return <p>No se encontró el evento.</p>;
  }

  const participantesActuales = evento.participantes?.length || 0;
  const participantesMaximos = evento.maxParticipantes || 0;

  return (
    <div className={styles.meetingContainer}>
      <header className={styles.header}>
        <div className={styles.containerName}>
          <Link to="/where">
            <i
              className={`fa-solid fa-circle-arrow-left ${styles.iconoVolver}`}
            ></i>
          </Link>
          <p id="deporte-seleccionado">{evento.sport}</p>
          <div className={styles.chatIconContainer}>
            <a
              href="tu-url-de-chat.html"
              className={styles.chatLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir chat"
            >
              <img src={chatIcon} alt="Chat icon" />
            </a>
          </div>
        </div>

        <div className={styles.eventDetails}>
          <p id="lugar-seleccionado">
            <i className="fas fa-map-marker-alt"></i> {evento.location}
          </p>
          <p id="fecha-seleccionada">
            <i className="fas fa-calendar-alt"></i> {evento.date}
          </p>
          <p id="hora-seleccionada">
            <i className="fas fa-clock"></i> {evento.time}
          </p>
        </div>

        <p className={styles.participantes}>
          <i className="fas fa-users"></i> Participantes{" "}
          <span id="participantes-actual">({participantesActuales}</span>/
          <span id="participantes-total">{participantesMaximos})</span>
        </p>
      </header>

      <main className={styles.main}>
        <Link to="/assignPositions" state={{ id }}>
          <button>
            <span>Asignar Posición*</span>
          </button>
        </Link>
        <Link to="/tasks" state={{ id }}>
          <button>
            <span>Asignar tareas</span>
          </button>
        </Link>

        <Link
          to="/participants"
          state={{
            id,
            isAdmin: auth.currentUser?.uid === evento.administradorId,
          }}
        >
          <button>
            <span>Ver participantes</span>
          </button>
        </Link>

        <Link to="/fileMeeting">
          <button>
            <span>Mostrar ficha del encuentro</span>
          </button>
        </Link>
      </main>

      <footer className={styles.footer}>
        <Link to="/choose">
          <button>
            <span>Fin del encuentro</span>
          </button>
        </Link>
        <p>
          *El administrador deberá asignar las posiciones en caso de ser
          necesario
        </p>
      </footer>
    </div>
  );
};

export default Meeting;
