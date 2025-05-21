import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../src/firebase'; // Ajusta esta importación según tu estructura
import styles from '../styles/ConfirmedParticipation.module.css';
import chatIcon from '../assets/chat.png';
import profileImage from '../assets/profile.jpg';

const ConfirmedParticipation = () => {
  const [userName, setUserName] = useState('');
  const [sportName, setSportName] = useState('');
  const [profilePhotoURL, setProfilePhotoURL] = useState(profileImage);

  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (currentUser) {
        setUserName(currentUser.displayName || 'Desconocido');
        try {
          const docRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.photoURL) {
              setProfilePhotoURL(data.photoURL);
            }
          }
        } catch (error) {
          console.error("Error al obtener la foto de perfil:", error);
        }
      } else {
        setUserName('Desconocido');
      }

      const sport = localStorage.getItem('sportName') || 'Deporte no especificado';
      setSportName(sport);
    };

    fetchUserData();
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
            <img src={profilePhotoURL} alt="Foto del jugador" />
          </div>
          <div className={styles.playerInfo}>
            <h3 className={styles.playerName}>{userName}</h3>
          </div>
        </div>
        <p>¿Quieres ver las tareas y posiciones de los demás integrantes?</p>
      </main>

      <footer className={styles.footer}>
        <Link to="/participants">
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
