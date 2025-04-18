import React from 'react';
import styles from '../styles/Meeting.module.css'; // Asegúrate de tener este archivo CSS Module
import { Link } from 'react-router-dom';
import chatIcon from '../assets/chat.png';


const Meeting = () => {
  return (
    <div className={styles.meetingContainer}>
      <header className={styles.header}>
        <div className={styles.containerName}>
          <Link to="/where">
            <i className={`fa-solid fa-circle-arrow-left ${styles.iconoVolver}`}></i>
          </Link>
          <p id="deporte-seleccionado">Futbol</p>
          <div className={styles.chatIconContainer}>
            <a href="tu-url-de-chat.html" className={styles.chatLink} target="_blank" rel="noopener noreferrer" aria-label="Abrir chat">
            <img src={chatIcon} alt="Chat icon" />
            </a>
          </div>
        </div>

        <div className={styles.eventDetails}>
          <p id="lugar-seleccionado">Cancha central, Pital (H)</p>
          <p id="fecha-seleccionada">20 de Marzo</p>
          <p id="hora-seleccionada">8:00p.m.</p>
        </div>

        <p className={styles.participantes}>
          Participantes <span id="participantes-actual">(5</span>/<span id="participantes-total">22)</span>
        </p>
      </header>

      <main className={styles.main}>
        <Link to="/assignPositions">
          <button><span>Asignar Posición*</span></button>
        </Link>
        <Link to="/tasks">
          <button><span>Asignar tareas</span></button>
        </Link>
        <Link to="/participants">
          <button><span>Ver participantes</span></button>
        </Link>
        <Link to="/fileMeeting">
          <button><span>Mostrar ficha del encuentro</span></button>
        </Link>
      </main>

      <footer className={styles.footer}>
        <Link to="/choose">
          <button><span>Fin del encuentro</span></button>
        </Link>
        <p>*El administrador deberá asignar las posiciones en caso de ser necesario</p>
      </footer>
    </div>
  );
};

export default Meeting;
