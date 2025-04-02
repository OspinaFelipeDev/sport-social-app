import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Login.module.css"
import logo from "/src/assets/logo-sportsocial.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook para redireccionar

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí puedes agregar la lógica de autenticación
    console.log("Email:", email);
    console.log("Contraseña:", password);

    // Simulación de acceso exitoso y redirección al perfil del usuario
    navigate("/profile");
  };

  return (
    <div className={styles.loginContainer}>
      {" "}
      {/* ✅ Aplicamos CSS Modules */}
      {/* Logo */}
      <img src={logo} alt="Logo de SportSocial" className={styles.logo} />
      <div className={styles.containerInicio}>
        {" "}
        {/* ✅ Cambia clases a CSS Modules */}
        <h1>Acceder</h1>
        {/* Formulario de inicio de sesión */}
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

          <button type="submit" className={styles.loginButton}>
            <span>Iniciar Sesión</span>
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </form>
        {/* Enlace para crear una cuenta */}
        <div className={styles.containerCrear}>
          <p>
            <span className={styles.questionText}>¿Eres nuevo(a)?</span>{" "}
            <span
              onClick={() => navigate("/create")}
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
