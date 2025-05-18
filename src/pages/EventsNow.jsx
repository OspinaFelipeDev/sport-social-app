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
            participantesActuales: data.participantes?.length || 0,
            participantesMaximos: data.maxParticipantes || 0,
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
      const userName = currentUser.displayName || "Sin nombre";

      await updateDoc(docRef, {
        participantes: arrayUnion({
          uid: currentUser.uid,
          name: userName,
        }),
      });

      navigate("/confirmedParticipation", {
        state: { userName, sportName },
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
  deporte={evento.deporte}
  ubicacion={evento.ubicacion}
  fecha={evento.fecha}
  hora={evento.hora}
  imagen={evento.imagen}
  participantesActuales={evento.participantesActuales}
  participantesMaximos={evento.participantesMaximos}
  onClick={() => handleJoinEvent(evento.id, evento.deporte)}
/>

          ))
        )}
      </main>
    </div>
  );
};

export default EventsNow;
