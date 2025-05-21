import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Profile.module.css";
import profileImagePlaceholder from "../assets/pro.png"; // Imagen por defecto
import { auth, db } from "../../src/firebase";
import { doc, getDoc } from "firebase/firestore";

function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) {
        navigate("/login");
        return;
      }

      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.warn("No se encontraron datos del usuario");
        }
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (isLoading) {
    return <p className={styles.loading}>Cargando perfil...</p>;
  }

  if (!userData) {
    return <p className={styles.error}>No se encontraron datos del perfil.</p>;
  }

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
      </div>
    </div>
  );
}

export default Profile;
