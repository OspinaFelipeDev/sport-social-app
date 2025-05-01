import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Login.module.css";
import logo from "/src/assets/logo-sportsocial.png";
import { auth, signInWithEmailAndPassword } from "../../src/firebase"; // Cambia a 'auth'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Estado para manejar los errores
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Usa la instancia de 'auth' que ya tienes importada
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Inicio de sesión exitoso");
      navigate("/profile");
    } catch (error) {
      // Captura el error y muestra el mensaje correspondiente
      console.error("Error al iniciar sesión:", error.message);
      setError("Correo o contraseña incorrectos."); // Actualiza el estado de error
    }
  };

  return (
    <div className={styles.loginContainer}>
      <img src={logo} alt="Logo de SportSocial" className={styles.logo} />
      <div className={styles.containerInicio}>
        <h1>Acceder</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <i className="fas fa-envelope"></i>
            <input
              type="email"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <i className="fas fa-lock"></i>
            <input
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Mostrar error si existe */}
          {error && <div className={styles.errorMessage}>{error}</div>}

          <button type="submit" className={styles.loginButton}>
            <span>Iniciar Sesión</span>
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </form>
        <div className={styles.containerCrear}>
          <p>
            <span className={styles.questionText}>¿Eres nuevo(a)?</span>{" "}
            <span
              onClick={() => navigate("/createAccount")}
              className={styles.createAccountText}
            >
              Crear Cuenta
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
