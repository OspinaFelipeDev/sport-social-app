import React from 'react';
import { Link } from 'react-router-dom';
import EventCard from './EventCard';
import styles from '../styles/EventsNow.module.css';
import balonImage from '../assets/balon.png';
import balonBaloncestoImage from '../assets/balon.png';

// Datos de eventos
const eventos = [
  {
    deporte: 'Fútbol',
    ubicacion: 'Bogotá, Colombia',
    hora: '18:00 hrs',
    imagen: balonImage, // Usamos la imagen importada
    link: '/choosePosition',
  },
  {
    deporte: 'Baloncesto',
    ubicacion: 'Medellín, Colombia',
    hora: '20:00 hrs',
    imagen: balonBaloncestoImage, // Usamos la imagen importada
    link: '/choosePosition',
  },
  // Agregar más eventos si es necesario
];

const EventsNow = () => {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.containerName}>
          <Link to="/choose" className={styles.iconoVolver}>
            <i className="fa-solid fa-circle-arrow-left"></i>
          </Link>
          <p id="deporteSeleccionado">Eventos disponibles</p>
        </div>
      </header>

      <main className={styles.main}>
        {eventos.map((evento, index) => (
          <EventCard
            key={index}
            deporte={evento.deporte}
            ubicacion={evento.ubicacion}
            hora={evento.hora}
            imagen={evento.imagen}
            link={evento.link}
          />
        ))}
      </main>
    </div>
  );
};

export default EventsNow;
