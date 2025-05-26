import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Profile.module.css";
import profileImagePlaceholder from "../assets/pro.png";
import { auth, db } from "../../src/firebase";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [adminEvent, setAdminEvent] = useState(null); // <-- Para evento admin
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserDataAndEvent = async () => {
      const user = auth.currentUser;
      if (!user) {
        navigate("/login");
        return;
      }

      try {
        // Obtener datos del usuario
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.warn("No se encontraron datos del usuario");
        }

        // Buscar evento donde sea administrador
        const eventosRef = collection(db, "eventos");
        const q = query(eventosRef, where("administradorId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // Si hay más de un evento admin, puedes manejar eso aquí (por ahora solo el primero)
          setAdminEvent(querySnapshot.docs[0].data());
          // Guarda también el id para poder navegar
          setAdminEvent((prev) => ({
            ...prev,
            id: querySnapshot.docs[0].id,
          }));
        } else {
          setAdminEvent(null);
        }
      } catch (error) {
        console.error(
          "Error al obtener datos del usuario o evento:",
          error.message
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDataAndEvent();
  }, [navigate]);

  if (isLoading) {
    return <p className={styles.loading}>Cargando perfil...</p>;
  }

  if (!userData) {
    return <p className={styles.error}>No se encontraron datos del perfil.</p>;
  }

  const getSportIcon = (sportName) => {
  switch (sportName.toLowerCase()) {
    case "fútbol":
    case "futbol":
      return <i className="fas fa-futbol" style={{ marginRight: "8px" }}></i>;
    case "baloncesto":
      return <i className="fas fa-basketball-ball" style={{ marginRight: "8px" }}></i>;
    case "voleibol":
    case "volleyball":
    case "voley":
      return <i className="fas fa-volleyball-ball" style={{ marginRight: "8px" }}></i>;
    default:
      return <i className="fas fa-dumbbell" style={{ marginRight: "8px" }}></i>; // ícono genérico
  }
};


  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <i
          className={`fa-solid fa-right-from-bracket ${styles.iconoSalida}`}
          onClick={() => navigate("/login")}
        ></i>

        <img
          src={userData.photoURL || profileImagePlaceholder}
          alt="Foto de perfil"
          className={styles.profileImage}
        />

        <i
          className={`fa-solid fa-user-pen ${styles.iconoEditar}`}
          onClick={() => navigate("/completeProfile")}
        ></i>
      </div>

      <div className={styles.profileDetails}>
        <div className={styles.nameAge}>
          <h1>{userData.name || "Sin nombre"}</h1>
          <span className={styles.age}>{userData.edad}</span>
        </div>
        <p className={styles.description}>
          {userData.descripcion || "Sin descripción"}
        </p>
        <div className={styles.sports}>
          <p>{userData.deportes || "Sin deportes especificados"}</p>
        </div>
        <button
          className={styles.eventsButton}
          onClick={() => navigate("/choose")}
        >
          Eventos para hoy
        </button>

        {/* Aquí mostramos la frase y la tarjeta del evento admin */}
        {adminEvent && (
          <div className={styles.adminEventSection}>
            <p>Actualmente eres el administrador de este evento deportivo:</p>
            <div
              className={styles.eventCard}
              onClick={() => navigate(`/meeting/${adminEvent.id}`)}
            >
              <h3 className={styles.sportTitle}>
  {getSportIcon(adminEvent.sport)}
  {adminEvent.sport.charAt(0).toUpperCase() + adminEvent.sport.slice(1)}
</h3>


              <p>
                <strong>Lugar:</strong> {adminEvent.location}
              </p>
              <p>
                <strong>Fecha:</strong> {adminEvent.date}
              </p>
              <p>
                <strong>Hora:</strong> {adminEvent.time}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
