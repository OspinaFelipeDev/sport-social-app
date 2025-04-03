import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Profile.module.css";
import profileImage from "../assets/pro.png"; // Imagen de perfil

function Profile() {
  const navigate = useNavigate();

  return (
    <div className={styles.profileContainer}>
      {/* 📌 Sección superior con imagen de perfil e iconos */}
      <div className={styles.profileHeader}>
        {/* Icono de salir (izquierda, arriba de la imagen) */}
        <i className={`fa-solid fa-right-from-bracket ${styles.iconoSalida}`} 
           onClick={() => navigate(-1)}></i>

        <img src={profileImage} alt="Foto de perfil" className={styles.profileImage} />

        {/* Icono de editar perfil (derecha, arriba de la imagen) */}
        <i className={`fa-solid fa-user-pen ${styles.iconoEditar}`} 
           onClick={() => navigate("/edit-profile")}></i>
      </div>

      {/* 📌 Sección inferior con la información del usuario */}
      <div className={styles.profileDetails}>
        <div className={styles.nameAge}>
          <h1>Misa Amane</h1>
          <span className={styles.age}>25</span>
        </div>
        <p className={styles.description}>
          Apasionado por el fútbol y el baloncesto. Me encanta compartir buenos momentos y practicar deportes en equipo.
        </p>
        <div className={styles.sports}>
          <p>Fútbol, Baloncesto</p>
        </div>
        <button className={styles.eventsButton} onClick={() => navigate("/events-today")}>
          Eventos para hoy
        </button>
      </div>
    </div>
  );
}

export default Profile;
