import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Choose.module.css";
import chooseImage from "../assets/choose.png";
import joinImage from "../assets/join.png";

const Choose = () => {
  return (
    <div className={styles.chooseContainer}>
      <header className={styles.header}>
        <div className={styles.containerHeader}>
          <Link to="/profile">
            <i className={`fa-solid fa-circle-arrow-left ${styles.iconoVolver}`}></i>
          </Link>
          <h1>Escoger</h1>
        </div>
      </header>

      <main className={styles.main}>
        {/* Sección Crear */}
        <Link to="/where" className={styles.linkContainer}>
          <section className={styles.containerCreate}>
            <h2>Crear</h2>
            <p>Crea un encuentro deportivo, gestiona y sé el administrador del grupo.</p>
            <div className={styles.imageContainer}>
              <img src={chooseImage} alt="Crear Encuentro" />
              <i className={`fa-solid fa-chevron-right ${styles.iconoGo}`}></i>
            </div>
          </section>
        </Link>

        {/* Sección Unirse */}
        <Link to="/eventsNow" className={styles.linkContainer}>
          <section className={styles.containerJoin}>
            <h2>Unirse</h2>
            <p>Únete a un encuentro deportivo, escoge el deporte y la posición en la cual vas a participar.</p>
            <div className={styles.imageContainer}>
              <img src={joinImage} alt="Unirse a Encuentro" />
              <i className={`fa-solid fa-chevron-right ${styles.iconoGo}`}></i>
            </div>
          </section>
        </Link>
      </main>
    </div>
  );
};

export default Choose;
