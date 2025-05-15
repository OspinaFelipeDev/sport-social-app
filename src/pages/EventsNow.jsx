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
  const currentUser = auth.currentUser;  // ✅ Aquí obtenemos el usuario autenticado

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
      // Usamos el nombre del usuario directamente desde Firebase Auth
      const userName = currentUser.displayName || "Sin nombre";

      await updateDoc(docRef, {
        participantes: arrayUnion({
          uid: currentUser.uid,
          name: userName,
        }),
      });

      // Redirigir a ConfirmedParticipation
      navigate("/confirmedParticipation", {
        state: { userName, sportName },  // Pasamos directamente los datos al siguiente componente
      });
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
