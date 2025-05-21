import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/CompleteProfile.module.css";
import { auth, db } from "../../src/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const CompleteProfile = () => {
  const [nombre, setNombre] = useState("");
  const [residencia, setResidencia] = useState("");
  const [deportes, setDeportes] = useState("");
  const [edad, setEdad] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [profileImageURL, setProfileImageURL] = useState("https://placehold.co/150x150");
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setNombre(userData.name || "");
          setResidencia(userData.residencia || "");
          setDeportes(userData.deportes || "");
          setEdad(userData.edad || "");
          setDescripcion(userData.descripcion || "");
          if (userData.photoURL) {
            setProfileImageURL(userData.photoURL);
          }
        }
      }
    };

    fetchUserData();
  }, []);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    const user = auth.currentUser;

    if (!file || !user) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsigned_profile_upload");
    formData.append("folder", "profilePics");

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dqstbikug/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      const imageUrl = data.secure_url;
      setProfileImageURL(imageUrl);

      // Guarda la URL en Firestore
      await setDoc(doc(db, "users", user.uid), { photoURL: imageUrl }, { merge: true });
    } catch (error) {
      console.error("Error al subir la imagen a Cloudinary:", error.message);
    }
  };

  const handleSave = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const profileData = {
      name: nombre,
      residencia,
      deportes,
      edad,
      descripcion,
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
            src={profileImageURL}
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
            onChange={handleImageChange}
          />
        </div>

        <h2 className={styles.subtitle}>¡Hola, {nombre}!</h2>
        <p className={styles.subtitle}>Sube tu foto de perfil y completa tus datos</p>
      </header>

      <main className={styles.main}>
        <div className={styles.inputBox}>
          <i className="fas fa-user"></i>
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputBox}>
          <i className="fas fa-map-marker-alt"></i>
          <input
            type="text"
            placeholder="Lugar de residencia"
            value={residencia}
            onChange={(e) => setResidencia(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputBox}>
          <i className="fas fa-futbol"></i>
          <input
            type="text"
            placeholder="Deportes favoritos"
            value={deportes}
            onChange={(e) => setDeportes(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputBox}>
          <i className="fas fa-calendar-alt"></i>
          <input
            type="number"
            placeholder="Edad"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            min="0"
            max="120"
            required
          />
        </div>

        <div className={styles.inputBox}>
          <textarea
            placeholder="Haz una breve descripción de ti...💁"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
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
