// ParticipantCard.jsx
import React from 'react';
import styles from '../styles/ParticipantCard.module.css';

const ParticipantCard = ({
  nombre = 'Sin nombre',
  tarea = 'Sin tarea asignada',
  posicion = 'Sin asignar',
  foto = 'https://i.pravatar.cc/60',
  equipo = '',
}) => {
  const equipoLower = equipo.toLowerCase();

  return (
    <div
      className={`${styles.card} ${
        equipoLower === 'azul' ? styles.bordeAzul : styles.bordeRojo
      }`}
    >
      <img src={foto} alt={nombre} className={styles.foto} />
      <h3>{nombre}</h3>
      <p>
        <strong>Posición:</strong> {posicion}
      </p>
      <p>
        <strong>Tarea:</strong> {tarea}
      </p>
    </div>
  );
};

export default ParticipantCard;
