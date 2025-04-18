import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Participants.module.css';
import chatIcon from '../assets/chat.png'; // Asegúrate que la ruta sea correcta

const participants = Array(10).fill({
  name: 'Kenzo Tomioka',
  number: 10,
  avatar: 'https://i.pravatar.cc/60',
});

export default function Participants() {
  return (
    <div className={styles.participantsWrapper}>
      <header className={styles.header}>
        <div className={styles.containerName}>
          <Link to="/meeting">
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
        {participants.map((p, index) => (
          <div key={index} className={styles.participantCard}>
            <img className={styles.participantAvatar} src={p.avatar} alt="Avatar del Participante" />
            <div className={styles.participantInfo}>
              <h2 className={styles.participantName}>{p.name}</h2>
              <p className={styles.participantNumber}>
                Número elegido: <span>{p.number}</span>
              </p>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
