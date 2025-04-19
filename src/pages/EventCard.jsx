import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/EventCard.module.css';

const EventCard = ({ deporte, ubicacion, hora, imagen, link }) => {
  return (
    <div className={styles.tarjetaEncuentro}>
      {/* Columna 1: Deporte y ubicación */}
      <div className={styles.columnaDeporte}>
        <h2>{deporte}</h2>
        <p>{ubicacion}</p>
      </div>

      {/* Columna 2: Hora y flecha */}
      <div className={styles.columnaHora}>
        <p>{hora}</p>
        <Link to={link} className={styles.botonFlecha}>
          <i className="fa-solid fa-chevron-right"></i>
        </Link>
      </div>

      {/* Columna 3: Imagen del balón */}
      <div className={styles.columnaImagen}>
        <img src={imagen} alt="Imagen de evento" />
      </div>
    </div>
  );
};

export default EventCard;
