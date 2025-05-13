import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import styles from '../styles/ConfirmedParticipation.module.css';
import chatIcon from '../assets/chat.png';
import profileImage from '../assets/profile.jpg';

const ConfirmedParticipation = () => {
  const [userName, setUserName] = useState('');
  const [sportName, setSportName] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      setUserName(currentUser.displayName || 'Desconocido');
    } else {
      setUserName('Desconocido');
    }

    const sport = localStorage.getItem('sportName') || 'Deporte no especificado';
    setSportName(sport);
  }, []);

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.containerName}>
          <Link to="/profile">
            <i className={`fa-solid fa-circle-arrow-left ${styles.iconoVolver}`}></i>
          </Link>
          <p className={styles.titulo}>Nos vemos más tarde</p>
          <div className={styles.chatIconContainer}>
            <Link to="/chat" className={styles.chatLink} aria-label="Abrir chat">
              <img src={chatIcon} alt="Icono de chat" />
            </Link>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <p>
          Has confirmado que participarás en el encuentro deportivo de{' '}
          <span className={styles.highlight}>{sportName}</span>
        </p>
        <div className={styles.playerCard}>
          <div className={styles.playerPhoto}>
            <img src={profileImage} alt="Foto del jugador" />
          </div>
          <div className={styles.playerInfo}>
            <h3 className={styles.playerName}>{userName}</h3>
          </div>
        </div>
        <p>¿Quieres ver las tareas y posiciones de los demás integrantes?</p>
      </main>

      <footer className={styles.footer}>
        <Link to="/fileMeeting">
          <button className={styles.button}>
            <span>Ver ficha</span>
          </button>
        </Link>
        <p>*El administrador podrá cambiar posiciones o equipo si es necesario</p>
        <p>*Las tareas a realizar las asigna el administrador del encuentro</p>
      </footer>
    </div>
  );
};

export default ConfirmedParticipation;
