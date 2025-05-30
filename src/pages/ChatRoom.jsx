import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "../styles/ChatRoom.module.css";
import { auth, db } from "../../src/firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";

const ChatRoom = () => {
  const { id } = useParams(); // id del evento
  const [evento, setEvento] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const usuarioActual = auth.currentUser;

  // Cargar el evento
  useEffect(() => {
    const cargarEvento = async () => {
      try {
        const docRef = doc(db, "eventos", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setEvento(docSnap.data());
        } else {
          setEvento(null);
        }
      } catch (error) {
        console.error("Error al cargar el evento:", error);
        setEvento(null);
      } finally {
        setLoading(false);
      }
    };

    cargarEvento();
  }, [id]);

  // Cargar mensajes si el usuario tiene permiso
  useEffect(() => {
    if (!evento || !usuarioActual) return;

    const esAdmin = usuarioActual.uid === evento.administradorId;

    const uidsParticipantes = (evento.participantes || []).map((p) => p.uid);
    const esParticipante = uidsParticipantes.includes(usuarioActual.uid);

    if (!esAdmin && !esParticipante) return;

    const chatRef = collection(db, "chats", id, "mensajes");
    const q = query(chatRef, orderBy("createdAt"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMensajes(msgs);
    });

    return () => unsubscribe();
  }, [evento, id, usuarioActual]);

  const enviarMensaje = async (e) => {
    e.preventDefault();
    if (!mensaje.trim()) return;

    const esAdmin = usuarioActual.uid === evento.administradorId;
    const uidsParticipantes = (evento.participantes || []).map((p) => p.uid);
    const esParticipante = uidsParticipantes.includes(usuarioActual.uid);

    if (!esAdmin && !esParticipante) {
      alert("No tienes permiso para enviar mensajes en este chat.");
      return;
    }

    const chatRef = collection(db, "chats", id, "mensajes");
    await addDoc(chatRef, {
      texto: mensaje,
      createdAt: serverTimestamp(),
      userId: usuarioActual.uid,
      userEmail: usuarioActual.email,
    });
    setMensaje("");
  };

  if (loading) return <p>Cargando chat...</p>;
  if (!evento) return <p>Evento no encontrado.</p>;

  const esAdmin = usuarioActual?.uid === evento.administradorId;
  const uidsParticipantes = (evento.participantes || []).map((p) => p.uid);
  const esParticipante = uidsParticipantes.includes(usuarioActual?.uid);

  if (!esAdmin && !esParticipante) {
    return (
      <div>
        <p>No tienes permiso para acceder a este chat.</p>
        <Link to={`/meeting/${id}`}>Volver al evento</Link>
      </div>
    );
  }

  return (
    <div className={styles.chatContainer}>
      <h2 className={styles.chatTitle}>Chat del evento: {evento.sport}</h2>

      <div className={styles.chatBox}>
        {mensajes.map((msg) => (
          <div
            key={msg.id}
            className={`${styles.message} ${
              msg.userId === usuarioActual.uid
                ? styles.myMessage
                : styles.otherMessage
            }`}
          >
            <strong>{msg.userEmail}:</strong> {msg.texto}
          </div>
        ))}
      </div>

      <form onSubmit={enviarMensaje} className={styles.form}>
        <input
          type="text"
          placeholder="Escribe un mensaje"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Enviar
        </button>
      </form>

      <Link
        to={esAdmin ? `/meeting/${id}` : `/participants/${id}`}
        className={styles.backLink}
      >
        Volver al evento
      </Link>
    </div>
  );
};

export default ChatRoom;
