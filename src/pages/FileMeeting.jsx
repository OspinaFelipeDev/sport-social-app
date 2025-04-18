import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/FileMeeting.module.css';
import chatIcon from '../assets/chat.png';
import ParticipantCard from './ParticipantCard';

const equipoAzul = [
  {
    nombre: 'Juan Pérez',
    tarea: 'Llevar balones',
    posicion: 'Delantero',
    foto: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    nombre: 'Laura Gómez',
    tarea: 'Llevar agua',
    posicion: 'Portera',
    foto: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
];

const equipoRojo = [
  {
    nombre: 'Carlos Díaz',
    tarea: 'Organizar defensa',
    posicion: 'Defensa central',
    foto: 'https://randomuser.me/api/portraits/men/28.jpg',
  },
  {
    nombre: 'Ana Torres',
    tarea: 'Llevar uniformes',
    posicion: 'Lateral izquierdo',
    foto: 'https://randomuser.me/api/portraits/women/37.jpg',
  },
  {
    nombre: 'Ana Torres',
    tarea: 'Llevar uniformes',
    posicion: 'Lateral izquierdo',
    foto: 'https://randomuser.me/api/portraits/women/37.jpg',
  },
];

const FileMeeting = () => {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.containerName}>
          <Link to="/meeting">
            <i className={`fa-solid fa-circle-arrow-left ${styles.iconoVolver}`}></i>
          </Link>
          <p id="deporte-seleccionado">Ficha Encuentro</p>
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

      <main className={styles.main}>
        <h1 className={styles.blueTitle}>Equipo Azul</h1>
        <div id="equipo-azul" className={styles.equipoContainer}>
          {equipoAzul.map((p, index) => (
            <ParticipantCard
              key={index}
              nombre={p.nombre}
              tarea={p.tarea}
              posicion={p.posicion}
              foto={p.foto}
              equipo="azul"
            />
          ))}
        </div>

        <h1 className={styles.redTitle}>Equipo Rojo</h1>
        <div id="equipo-rojo" className={styles.equipoContainer}>
          {equipoRojo.map((p, index) => (
            <ParticipantCard
              key={index}
              nombre={p.nombre}
              tarea={p.tarea}
              posicion={p.posicion}
              foto={p.foto}
              equipo="rojo"
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default FileMeeting;
