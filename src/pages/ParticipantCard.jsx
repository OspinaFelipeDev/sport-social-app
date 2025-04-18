import React from 'react';
import styles from '../styles/ParticipantCard.module.css';

const ParticipantCard = ({ nombre, tarea, posicion, foto, equipo }) => {
  return (
    <div className={`${styles.card} ${equipo === 'azul' ? styles.bordeAzul : styles.bordeRojo}`}>
      <img src={foto} alt={nombre} className={styles.foto} />
      <h3>{nombre}</h3>
      <p><strong>Posición:</strong> {posicion}</p>
      <p><strong>Tarea:</strong> {tarea}</p>
    </div>
  );
};

export default ParticipantCard;
