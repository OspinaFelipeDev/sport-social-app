import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/CompleteProfile.module.css";

const CompleteProfile = () => {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleSave = () => {
    // Aquí podrías validar y guardar los datos si quieres
    navigate("/profile"); // Navega al componente Profile
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Completa tu perfil</h1>

        <div className={styles.profileContainer}>
          <img
            id="profileImage"
            src="https://placehold.co/150x150"
            alt="Foto de perfil"
            className={styles.profileImage}
          />
          <div className={styles.cameraIcon} onClick={handleImageClick}>
            <i className="fas fa-camera"></i>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            style={{ display: "none" }}
          />
        </div>

        <h2 className={styles.subtitle}>Subir foto de perfil</h2>
      </header>

      <main className={styles.main}>
        {/* Inputs */}
        <div className={styles.inputBox}>
          <i className="fas fa-map-marker-alt"></i>
          <input
            type="text"
            id="residencia"
            placeholder="Lugar de residencia"
            required
          />
        </div>

        <div className={styles.inputBox}>
          <i className="fas fa-futbol"></i>
          <input
            type="text"
            id="deportes"
            placeholder="Deportes favoritos"
            required
          />
        </div>

        <div className={styles.inputBox}>
          <i className="fas fa-calendar-alt"></i>
          <input
            type="number"
            id="edad"
            placeholder="Edad"
            min="0"
            max="120"
            required
          />
        </div>

        <div className={styles.inputBox}>
          <textarea
            id="descripcion"
            placeholder="Haz una breve descripción de ti...💁"
            required
          ></textarea>
        </div>
      </main>

      <footer className={styles.footer}>
        <button className={styles.saveButton} onClick={handleSave}>
          <span>Guardar</span>
        </button>
      </footer>
    </div>
  );
};

export default CompleteProfile;
