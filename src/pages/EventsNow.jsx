// src/components/EventsNow.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase';
import EventCard from './EventCard';
import styles from '../styles/EventsNow.module.css';
import balonImage from '../assets/balon.png';
import balonBaloncestoImage from '../assets/balon.png';

import { getAuth } from 'firebase/auth';

const EventsNow = () => {
  const [eventos, setEventos] = useState([]);
  const navigate = useNavigate();
  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'eventos'));
        const eventosData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            deporte: data.sport,
            ubicacion: data.location,
            hora: data.time,
            fecha: data.date,
            imagen:
              data.sport === 'futbol'
                ? balonImage
                : data.sport === 'baloncesto'
                ? balonBaloncestoImage
                : balonImage,
          };
        });
        setEventos(eventosData);
      } catch (error) {
        console.error('Error al obtener eventos:', error);
      }
    };

    fetchEventos();
  }, []);

  const handleJoinEvent = async (eventoId, sportName) => {
    if (!currentUser) {
      alert("Debes iniciar sesión para unirte a un evento.");
      return;
    }

    const docRef = doc(db, "eventos", eventoId);

    try {
      // Guardamos en localStorage el nombre del usuario y el deporte
      localStorage.setItem("userName", currentUser.displayName || "Sin nombre");
      localStorage.setItem("sportName", sportName);

      await updateDoc(docRef, {
        participantes: arrayUnion({
          uid: currentUser.uid,
          nombre: currentUser.displayName || "Sin nombre",
        }),
      });

      // Redirigir a ConfirmedParticipation
      navigate("/confirmedParticipation");
    } catch (err) {
      console.error("Error al unirse al evento:", err);
    }
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.containerName}>
          <i
            className="fa-solid fa-circle-arrow-left"
            onClick={() => navigate("/choose")}
            style={{ cursor: "pointer" }}
          ></i>
          <p>Eventos disponibles</p>
        </div>
      </header>

      <main className={styles.main}>
        {eventos.length === 0 ? (
          <p>No hay eventos disponibles.</p>
        ) : (
          eventos.map((evento) => (
            <EventCard
              key={evento.id}
              {...evento}
              onClick={() => handleJoinEvent(evento.id, evento.deporte)}
            />
          ))
        )}
      </main>
    </div>
  );
};

export default EventsNow;
