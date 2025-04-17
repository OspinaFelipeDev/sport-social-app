import React from 'react';
import styles from '../styles/AssignPositions.module.css';
import { Link } from 'react-router-dom';
import chatIcon from '../assets/chat.png';

const playersBlue = [
  'Jugador A', 'Jugador B', 'Jugador C'
];

const playersRed = [
  'Jugador G', 'Jugador H', 'Jugador I'
];

const renderPlayers = (team, players) => {
  return Array.from({ length: 11 }, (_, i) => (
    <div
      key={`${team}-${i + 1}`}
      className={`${styles.player} ${styles[team]} ${styles[`${team}-position-${i + 1}`]}`}
    >
      <span>{i + 1}</span>
      <button className={styles.dropdownBtn}><i className="fas fa-chevron-down"></i></button>
      <ul className={styles.dropdownContent}>
        {players.map((p, index) => (
          <li key={index}>{p}</li>
        ))}
      </ul>
    </div>
  ));
};

const AssignPositions = () => {
  return (
    <div className={styles.assignContainer}>
      <header className={styles.header}>
        <div className={styles.containerName}>
          <Link to="/meeting">
            <i className="fa-solid fa-circle-arrow-left"></i>
          </Link>
          <p>Asignar posiciones</p>
          <div className={styles.chatIconContainer}>
            <a href="tu-url-de-chat.html" target="_blank" rel="noopener noreferrer">
              <img src={chatIcon} alt="chat" />
            </a>
          </div>
        </div>
      </header>

      <main className={styles.field}>
        {renderPlayers('blue', playersBlue)}
        {renderPlayers('red', playersRed)}
      </main>

      <footer className={styles.footer}>
        <Link to="/tasks">
          <button><span>Guardar</span></button>
        </Link>
      </footer>
    </div>
  );
};

export default AssignPositions;
