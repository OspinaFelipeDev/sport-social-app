import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Where.module.css";
import mapImage from "../assets/ubication.jpeg";

const Where = () => {
  return (
    <div className={styles.whereContainer}>
      {/* Header */}
      <header className={styles.whereHeader}>
        <div className={styles.containerHeader}>
          <Link to="/choose">
            <i className={`fa-solid fa-circle-arrow-left ${styles.iconoVolver}`}></i>
          </Link>
          <h1 className={styles.whereTitle}>Dónde</h1>
        </div>
      </header>

      {/* Main */}
      <main className={styles.whereMain}>
        <div className={styles.locationContainer}>
          <div className={styles.mapPlaceholder}>
            <img src={mapImage} alt="Mapa del lugar" className={styles.mapImage} />
          </div>
          <div className={styles.searchBox}>
            <input type="text" placeholder="Buscar lugar..." className={styles.locationInput} />
            <i className={`fas fa-search ${styles.searchIcon}`}></i>
          </div>
        </div>
        
        <h2 className={styles.sectionTitle}>Hora y fecha</h2>
        <div className={styles.dateTimeContainer}>
          <div className={styles.datePickerContainer}>
            <input type="date" id="event-date" className={styles.dateInput} />
          </div>
          <div className={styles.timePickerContainer}>
            <input type="time" id="event-time" className={styles.timeInput} />
          </div>
        </div>

        <h3 className={styles.sectionTitle}>Escoger deporte</h3>
        <div className={styles.sportSelectorContainer}>
          <div className={styles.customSelect}>
            <select id="sport-select" className={styles.sportSelect}>
              <option value="" disabled selected>Seleccionar un deporte</option>
              <option value="futbol">Fútbol</option>
              <option value="baloncesto">Baloncesto</option>
              <option value="Voleiball">Voleibol</option>
            </select>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.whereFooter}>
        <Link to="/meeting">
          <button className={styles.createEventButton}>
            <span>Crear Evento</span>
          </button>
        </Link>
      </footer>
    </div>
  );
};

export default Where;
