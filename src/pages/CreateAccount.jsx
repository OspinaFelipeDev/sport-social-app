import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/CreateAccount.module.css";
import logo from "../assets/logo-sportsocial.png";
import { Link } from "react-router-dom";
import { auth, db, createUserWithEmailAndPassword } from "../../src/firebase";
import { doc, setDoc } from "firebase/firestore";

const CreateAccount = () => {
  const navigate = useNavigate();

  // Estados
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState("");

  const handleCreateAccount = async (e) => {
    e.preventDefault();

    // Validación simple
    if (!termsAccepted) {
      setError("Debes aceptar los términos y condiciones.");
      return;
    }

    if (password !== repeatPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      // Crear cuenta en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Guardar nombre en Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        createdAt: new Date()
      });

      console.log("Cuenta creada correctamente");
      navigate("/completeProfile");
    } catch (error) {
      console.error("Error al crear la cuenta:", error.message);
      setError("Error al crear la cuenta. Intenta con otro correo.");
    }
  };

  return (
    <div className={styles.createAccount}>
      <header className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate("/login")}>
          <i className={`fa-solid fa-circle-arrow-left ${styles.iconoVolver}`}></i>
        </button>
        <img src={logo} alt="Logo" />
      </header>

      <main className={styles.main}>
        <form className={styles.form} onSubmit={handleCreateAccount}>
          <h1>Crear Cuenta</h1>

          <div className={styles.inputContainer}>
            <i className="fas fa-user"></i>
            <input
              type="text"
              placeholder="Nombre completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputContainer}>
            <i className="fas fa-envelope"></i>
            <input
              type="email"
              placeholder="Correo Electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputContainer}>
            <i className="fas fa-lock"></i>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputContainer}>
            <i className="fas fa-lock"></i>
            <input
              type="password"
              placeholder="Repite tu contraseña"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
            />
          </div>

          {/* Error */}
          {error && <div className={styles.errorMessage}>{error}</div>}

          <div className={styles.containerTerminos}>
            <label className={styles.checkboxContainer}>
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={() => setTermsAccepted(!termsAccepted)}
              />
              <svg viewBox="0 0 64 64" height="3em" width="3em">
                <path
                  d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                  className={styles.path}
                ></path>
              </svg>
            </label>

            <div className={styles.containerCheck}>
              <p>
                <span>Al crear una cuenta, acepto los </span>
                <Link to="/terms">términos y condiciones y la política de privacidad.</Link>
              </p>
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <button type="submit">
              <span>Crear</span>
            </button>
          </div>
        </form>
      </main>

      <footer className={styles.footer}>
        <div className={styles.containerCrear}>
          <p>
            <span>¿Ya tienes una cuenta? </span>
            <button className={styles.linkButton} onClick={() => navigate("/login")}>
              Ingresar
            </button>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CreateAccount;
