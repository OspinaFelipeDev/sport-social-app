// src/components/EventCard.jsx
import React from 'react';
import styles from '../styles/EventCard.module.css';

const EventCard = ({ deporte, ubicacion, fecha, hora, imagen, onClick }) => {
  return (
    <div className={styles.tarjetaEncuentro} onClick={onClick}>
      {/* Columna 1: Deporte, ubicación y fecha */}
      <div className={styles.columnaDeporte}>
        <h2>{deporte}</h2>
        <p>{ubicacion}</p>
        <p>{formatDate(fecha)}</p>
      </div>

      {/* Columna 2: Hora y flecha */}
      <div className={styles.columnaHora}>
        <p>{hora}</p>
        <i className={`fa-solid fa-chevron-right ${styles.botonFlecha}`}></i>
      </div>

      {/* Columna 3: Imagen del balón */}
      <div className={styles.columnaImagen}>
        <img src={imagen} alt="Imagen de evento" />
      </div>
    </div>
  );
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('es-ES', options);
};

export default EventCard;
