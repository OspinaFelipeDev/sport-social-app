import React from 'react';
import styles from '../styles/EventCard.module.css';

const EventCard = ({
  deporte,
  ubicacion,
  fecha,
  hora,
  imagen,
  participantesActuales,
  participantesMaximos,
  yaUnido,
  onClick,
  onLeave, // ← nuevo prop
}) => {
  return (
    <div
      className={`${styles.tarjetaEncuentro} ${yaUnido ? styles.unido : ''}`}
      onClick={!yaUnido ? onClick : undefined}
      style={{ cursor: yaUnido ? 'default' : 'pointer' }}
    >
      {/* Columna 1: Deporte, ubicación, fecha y participantes */}
      <div className={styles.columnaDeporte}>
        <h2>{deporte}</h2>
        <p><i className="fas fa-map-marker-alt"></i> {ubicacion}</p>
        <p><i className="fas fa-calendar-alt"></i> {formatDate(fecha)}</p>
        <p><i className="fas fa-users"></i> {participantesActuales} / {participantesMaximos} participantes</p>

        {yaUnido && (
          <div className={styles.acciones}>
            <p className={styles.mensajeUnido}>
              <i className="fas fa-check-circle"></i> Ya estás unido
            </p>
            <button className={styles.botonCancelar} onClick={onLeave}>
              Cancelar participación
            </button>
          </div>
        )}
      </div>

      {/* Columna 2: Hora y flecha */}
      <div className={styles.columnaHora}>
        <p><i className="fas fa-clock"></i> {hora}</p>
        {!yaUnido && <i className={`fa-solid fa-chevron-right ${styles.botonFlecha}`}></i>}
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
