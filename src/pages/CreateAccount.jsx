import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/CreateAccount.module.css";
import logo from "../assets/logo-sportsocial.png";
import { Link } from "react-router-dom";

const CreateAccount = () => {
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    navigate("/completeProfile");
  };

  const handleGoBack = () => {
    navigate("/login");
  };

  return (
    <div className={styles.createAccount}>
      <header className={styles.header}>
        <button className={styles.backButton} onClick={handleGoBack}>
          <i className={`fa-solid fa-circle-arrow-left ${styles.iconoVolver}`}></i>
        </button>
        <img src={logo} alt="Logo" />
      </header>

      <main className={styles.main}>
        <form className={styles.form}>
          <h1>Crear Cuenta</h1>

          <div className={styles.inputContainer}>
            <i className="fas fa-user"></i>
            <input type="text" placeholder="Nombre completo" required />
          </div>

          <div className={styles.inputContainer}>
            <i className="fas fa-envelope"></i>
            <input type="email" placeholder="Correo Electrónico" required />
          </div>

          <div className={styles.inputContainer}>
            <i className="fas fa-lock"></i>
            <input type="password" placeholder="Contraseña" required />
          </div>

          <div className={styles.inputContainer}>
            <i className="fas fa-lock"></i>
            <input type="password" placeholder="Repite tu contraseña" required />
          </div>
        </form>

        <div className={styles.containerTerminos}>
          <label className={styles.checkboxContainer}>
            <input type="checkbox" />
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
          <button onClick={handleCreateAccount}>
            <span>Crear</span>
          </button>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.containerCrear}>
          <p>
            <span>¿Ya tienes una cuenta? </span>
            <button
              className={styles.linkButton}
              onClick={handleGoBack}
            >
              Ingresar
            </button>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CreateAccount;
