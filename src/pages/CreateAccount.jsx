// src/components/CreateAccount.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import styles from "../styles/CreateAccount.module.css";
import logo from "/src/assets/logo-sportsocial.png";

function CreateAccount() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreateAccount = async (e) => {
    e.preventDefault();

    try {
      // Crear cuenta con Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // ✅ Actualizar el displayName en Firebase Auth
      await updateProfile(user, {
        displayName: name,
      });

      // ✅ Guardar información adicional del usuario en Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        createdAt: new Date(),
      });

      console.log("Cuenta creada exitosamente");
      navigate("/completeProfile"); // Redirige a otra vista si deseas
    } catch (error) {
      console.error("Error al crear cuenta:", error.message);
      setError("Hubo un problema al crear la cuenta. Intenta nuevamente.");
    }
  };

  return (
    <div className={styles.container}>
      <img src={logo} alt="Logo de SportSocial" className={styles.logo} />
      <div className={styles.formWrapper}>
        <h1>Crear Cuenta</h1>
        <form onSubmit={handleCreateAccount}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Nombre completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className={styles.errorMessage}>{error}</div>}

          <div className={styles.terminosContainer}>
            <label className={styles.checkboxContainer}>
              <input type="checkbox" required />
              <svg viewBox="0 0 64 64" height="3em" width="3em">
                <path
                  d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                  pathLength="575.0541381835938"
                  className={styles.checkboxPath}
                ></path>
              </svg>
            </label>
            <div className={styles.checkText}>
              <p>
                <span>Al crear una cuenta, acepto los </span>
                <span
                  onClick={() => navigate("/terms")}
                  style={{
                    color: "#007bff",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  términos y condiciones y la política de privacidad.
                </span>
              </p>
            </div>
          </div>

          <button type="submit" className={styles.submitButton}>
            Crear Cuenta
          </button>
        </form>
        <p className={styles.loginLink} onClick={() => navigate("/login")}>
          ¿Ya tienes una cuenta? Inicia sesión
        </p>
      </div>
    </div>
  );
}

export default CreateAccount;
