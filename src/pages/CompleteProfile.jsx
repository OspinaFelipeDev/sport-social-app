import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/CompleteProfile.module.css";
import { auth, db } from "../../src/firebase"; // Ajusta si la ruta cambia
import { doc, getDoc, setDoc } from "firebase/firestore";

const CompleteProfile = () => {
  const [nombre, setNombre] = useState("");
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Obtener nombre del usuario desde Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setNombre(docSnap.data().name || "");
        }
      }
    };

    fetchUserData();
  }, []);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleSave = async () => {
    const user = auth.currentUser;

    if (!user) {
      console.error("Usuario no autenticado.");
      return;
    }

    const profileData = {
      residencia: document.getElementById("residencia").value,
      deportes: document.getElementById("deportes").value,
      edad: document.getElementById("edad").value,
      descripcion: document.getElementById("descripcion").value,
    };

    try {
      await setDoc(doc(db, "users", user.uid), profileData, { merge: true });
      navigate("/profile");
    } catch (error) {
      console.error("Error al guardar perfil:", error.message);
    }
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

        <h2 className={styles.subtitle}>¡Hola, {nombre}!</h2>
        <p className={styles.subtitle}>Sube tu foto de perfil y completa tus datos</p>
      </header>

      <main className={styles.main}>
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
