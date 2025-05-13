import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "../styles/Where.module.css";
import mapImage from "../assets/ubication.jpeg";

import { db, auth } from "../../src/firebase";
import { collection, addDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const Where = () => {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [sport, setSport] = useState("");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Escuchar cambios en el estado de autenticación
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // Limpiar suscripción
  }, []);

  const handleCreateEvent = async () => {
    if (!location || !date || !time || !sport) {
      alert("Por favor completa todos los campos.");
      return;
    }
  
    if (!user) {
      alert("Debes iniciar sesión para crear un evento.");
      return;
    }
  
    try {
      // Crear evento y obtener referencia del documento
      const docRef = await addDoc(collection(db, "eventos"), {
        location,
        date,
        time,
        sport,
        createdAt: new Date(),
        userId: user.uid,
        userEmail: user.email
      });
  
      // Redirigir a la página del evento con su ID
      navigate(`/meeting/${docRef.id}`);
    } catch (error) {
      console.error("Error al crear el evento:", error);
      alert("Ocurrió un error al crear el evento.");
    }
  };
  

  

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
            <input
              type="text"
              placeholder="Buscar lugar..."
              className={styles.locationInput}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <i className={`fas fa-search ${styles.searchIcon}`}></i>
          </div>
        </div>

        <h2 className={styles.sectionTitle}>Hora y fecha</h2>
        <div className={styles.dateTimeContainer}>
          <div className={styles.datePickerContainer}>
            <input
              type="date"
              id="event-date"
              className={styles.dateInput}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className={styles.timePickerContainer}>
            <input
              type="time"
              id="event-time"
              className={styles.timeInput}
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </div>

        <h3 className={styles.sectionTitle}>Escoger deporte</h3>
        <div className={styles.sportSelectorContainer}>
          <div className={styles.customSelect}>
            <select
              id="sport-select"
              className={styles.sportSelect}
              value={sport}
              onChange={(e) => setSport(e.target.value)}
            >
              <option value="" disabled>Seleccionar un deporte</option>
              <option value="futbol">Fútbol</option>
              <option value="baloncesto">Baloncesto</option>
              <option value="voleibol">Voleibol</option>
            </select>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.whereFooter}>
        <button className={styles.createEventButton} onClick={handleCreateEvent}>
          <span>Crear Evento</span>
        </button>
      </footer>
    </div>
  );
};

export default Where;
