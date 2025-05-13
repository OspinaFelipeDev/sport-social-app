import React, { useEffect, useState } from 'react';
import styles from '../styles/AssignPositions.module.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import chatIcon from '../assets/chat.png';

import { db } from '../../src/firebase';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';

const renderPlayers = (team, positions, participants, handleAssign) => {
  return Array.from({ length: 11 }, (_, i) => {
    const positionNum = i + 1;
    const assigned = positions?.[team]?.[positionNum];

    return (
      <div
        key={`${team}-${positionNum}`}
        className={`${styles.player} ${styles[team]} ${styles[`${team}-position-${positionNum}`]}`}
      >
        <span>{positionNum}</span>
        <button className={styles.dropdownBtn}>
          <i className="fas fa-chevron-down"></i>
        </button>
        <ul className={styles.dropdownContent}>
          {participants.map((p) => (
            <li
              key={p.uid}
              onClick={() => handleAssign(team, positionNum, p)}
            >
              {p.nombre}
            </li>
          ))}
        </ul>
        {assigned && <p className={styles.assignedName}>{assigned.nombre}</p>}
      </div>
    );
  });
};

const cleanUndefined = (posiciones) => {
  const cleaned = {};
  for (const team in posiciones) {
    cleaned[team] = {};
    for (const pos in posiciones[team]) {
      const val = posiciones[team][pos];
      if (val && val.uid) {
        cleaned[team][pos] = val;
      }
    }
  }
  return cleaned;
};

const AssignPositions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const eventoId = location.state?.id;

  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!eventoId) return;
    const docRef = doc(db, "eventos", eventoId);
    const unsubscribe = onSnapshot(docRef, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setEvento(data);
      } else {
        console.log("Evento no encontrado");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [eventoId]);

  const handleAssign = (team, position, player) => {
    const updated = {
      ...evento.posiciones,
      [team]: {
        ...evento.posiciones?.[team],
        [position]: { uid: player.uid, nombre: player.nombre },
      },
    };

    setEvento((prev) => ({
      ...prev,
      posiciones: updated,
    }));
  };

  const handleSave = async () => {
    if (!evento || !evento.posiciones) {
      alert("No hay posiciones asignadas.");
      return;
    }

    const cleaned = cleanUndefined(evento.posiciones);

    if (Object.keys(cleaned.blue || {}).length === 0 && Object.keys(cleaned.red || {}).length === 0) {
      alert("Debes asignar al menos una posición antes de guardar.");
      return;
    }

    try {
      const docRef = doc(db, "eventos", eventoId);
      await updateDoc(docRef, {
        posiciones: cleaned,
      });
      navigate("/tasks");
    } catch (err) {
      console.error("Error al guardar las posiciones:", err);
    }
  };

  if (loading) return <p>Cargando posiciones...</p>;
  if (!evento) return <p>Evento no encontrado</p>;

  const participants = evento.participantes || [];
  const posiciones = evento.posiciones || {};

  return (
    <div className={styles.assignContainer}>
      <header className={styles.header}>
        <div className={styles.containerName}>
          <Link to={`/meeting/${eventoId}`}>
            <i className="fa-solid fa-circle-arrow-left"></i>
          </Link>
          <p>Asignar posiciones</p>
          <div className={styles.chatIconContainer}>
            <a href="tu-url-de-chat.html" target="_blank" rel="noopener noreferrer">
              <img src={chatIcon} alt="chat" />
            </a>
          </div>
        </div>
      </header>

      <main className={styles.field}>
        {renderPlayers('blue', posiciones, participants, handleAssign)}
        {renderPlayers('red', posiciones, participants, handleAssign)}
      </main>

      <footer className={styles.footer}>
        <button onClick={handleSave}>
          <span>Guardar</span>
        </button>
      </footer>
    </div>
  );
};

export default AssignPositions;
