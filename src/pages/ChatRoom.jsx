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

  useEffect(() => {
    // Cargar los datos del evento para validar permisos
    const cargarEvento = async () => {
      const docRef = doc(db, "eventos", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setEvento(docSnap.data());
      } else {
        setEvento(null);
      }
      setLoading(false);
    };
    cargarEvento();
  }, [id]);

  // Solo cargar mensajes si tiene permiso
  useEffect(() => {
    if (!evento || !usuarioActual) return;

    const esAdmin = usuarioActual.uid === evento.administradorId;
    const esParticipante = evento.participantes?.includes(usuarioActual.uid);

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
    const esParticipante = evento.participantes?.includes(usuarioActual.uid);

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
  const esParticipante = evento.participantes?.includes(usuarioActual?.uid);

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
        <p key={msg.id} className={styles.message}>
          <strong>{msg.userEmail}:</strong> {msg.texto}
        </p>
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
      <button type="submit" className={styles.button}>Enviar</button>
    </form>

    <Link to={`/meeting/${id}`} className={styles.backLink}>
      Volver al evento
    </Link>
  </div>
);

};

export default ChatRoom;
