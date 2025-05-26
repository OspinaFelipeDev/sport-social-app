import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  deleteField,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import EventCard from "./EventCard";
import styles from "../styles/EventsNow.module.css";
import balonFutbolImage from "../assets/balonFutbol.png";
import balonBaloncestoImage from "../assets/balonBaloncesto.jpg";
import balonVoleibolImage from "../assets/balonVoleibol.jpg";
import defaultSportImage from "../assets/balonFutbol.png"; // o similar


import { getAuth } from "firebase/auth";

const getSportImage = (sport) => {
  switch (sport.toLowerCase()) {
    case "futbol":
    case "fútbol":
      return balonFutbolImage;
    case "baloncesto":
      return balonBaloncestoImage;
    case "voleibol":
    case "volleyball":
    case "voley":
      return balonVoleibolImage;
    default:
      return defaultSportImage;
  }
};

const EventsNow = () => {
  const [eventos, setEventos] = useState([]);
  const navigate = useNavigate();
  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "eventos"));
        const eventosData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          const yaUnido = data.participantes?.some(
            (part) => part.uid === currentUser?.uid
          );

          return {
            id: doc.id,
            deporte: data.sport,
            ubicacion: data.location,
            hora: data.time,
            fecha: data.date,
            participantes: data.participantes || [],
            participantesActuales: data.participantes?.length || 0,
            participantesMaximos: data.maxParticipantes || 0,
            yaUnido: yaUnido,
            imagen: getSportImage(data.sport),
          };
        });

        setEventos(eventosData);
      } catch (error) {
        console.error("Error al obtener eventos:", error);
      }
    };

    fetchEventos();
  }, [currentUser]);

  const handleJoinEvent = async (eventoId, sportName) => {
    if (!currentUser) {
      alert("Debes iniciar sesión para unirte a un evento.");
      return;
    }

    const docRef = doc(db, "eventos", eventoId);

    try {
      const userSnap = await getDocs(collection(db, "users"));
      const userData = userSnap.docs
        .find((doc) => doc.id === currentUser.uid)
        ?.data();

      const userName =
        userData?.name || currentUser.displayName || "Sin nombre";
      const photoURL = userData?.photoURL || "";

      await updateDoc(docRef, {
        participantes: arrayUnion({
          uid: currentUser.uid,
          name: userName,
          photoURL: photoURL,
        }),
      });

      setEventos((prev) =>
        prev.map((ev) =>
          ev.id === eventoId
            ? {
                ...ev,
                yaUnido: true,
                participantesActuales: ev.participantesActuales + 1,
              }
            : ev
        )
      );

      navigate("/confirmedParticipation", {
        state: { userName, sportName, id: eventoId },
      });
    } catch (err) {
      console.error("Error al unirse al evento:", err);
    }
  };

  const handleLeaveEvent = async (eventoId) => {
    if (!currentUser) return;

    const docRef = doc(db, "eventos", eventoId);

    try {
      const eventoSnap = await getDoc(docRef);
      const eventoData = eventoSnap.data();

      if (!eventoData) {
        console.error("Evento no encontrado");
        return;
      }

      const participanteExacto = eventoData.participantes?.find(
        (part) => part.uid === currentUser.uid
      );

      if (!participanteExacto) {
        console.warn("No se encontró al usuario entre los participantes");
        return;
      }

      const nuevasTareas = (eventoData.tareas || []).filter(
        (tarea) => tarea.userId !== currentUser.uid
      );

      const nuevasPosiciones = { ...eventoData.posiciones };
      for (const equipo in nuevasPosiciones) {
        for (const pos in nuevasPosiciones[equipo]) {
          if (nuevasPosiciones[equipo][pos]?.uid === currentUser.uid) {
            delete nuevasPosiciones[equipo][pos];
          }
        }
      }

      // Limpieza de equipos vacíos
      for (const equipo in nuevasPosiciones) {
        if (Object.keys(nuevasPosiciones[equipo]).length === 0) {
          delete nuevasPosiciones[equipo];
        }
      }

      const updates = {
        participantes: arrayRemove(participanteExacto),
        posiciones: nuevasPosiciones,
        tareas: nuevasTareas,
        [`equipos.${currentUser.uid}`]: deleteField(),
      };

      await updateDoc(docRef, updates);

      setEventos((prev) =>
        prev.map((ev) =>
          ev.id === eventoId
            ? {
                ...ev,
                yaUnido: false,
                participantesActuales: ev.participantesActuales - 1,
                posiciones: nuevasPosiciones, // Asegura que se actualiza el estado
              }
            : ev
        )
      );
    } catch (error) {
      console.error("Error al cancelar la participación:", error);
    }
  };

  return (
    <div className={styles.wrapper}>
     <header className={styles.header}>
  <i
    className={`fa-solid fa-circle-arrow-left ${styles.iconoVolver}`}
    onClick={() => navigate("/choose")}
  ></i>
  <p className={styles.tituloCentro}>Eventos disponibles</p>
</header>


      <main className={styles.main}>
        {eventos.length === 0 ? (
          <p>No hay eventos disponibles.</p>
        ) : (
          eventos.map((evento) => (
            <div key={evento.id} className={styles.eventContainer}>
              <EventCard
                deporte={evento.deporte}
                ubicacion={evento.ubicacion}
                fecha={evento.fecha}
                hora={evento.hora}
                imagen={evento.imagen}
                participantesActuales={evento.participantesActuales}
                participantesMaximos={evento.participantesMaximos}
                yaUnido={evento.yaUnido}
                onClick={() => handleJoinEvent(evento.id, evento.deporte)}
                onLeave={() => handleLeaveEvent(evento.id)}
              />
            </div>
          ))
        )}
      </main>
    </div>
  );
};

export default EventsNow;
