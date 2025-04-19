import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Asegúrate de importar useNavigate
import styles from '../styles/ChoosePosition.module.css';
import chatIcon from '../assets/chat.png';

const ChoosePosition = () => {
  const positions = Array.from({ length: 11 }, (_, i) => i + 1);

  const [dropdownsAbiertos, setDropdownsAbiertos] = useState({});
  const [selectedPositions, setSelectedPositions] = useState({
    blue: null,
    red: null,
  });

  const navigate = useNavigate(); // Usamos useNavigate para redirigir al usuario

  const toggleDropdown = (team, num) => {
    const key = `${team}-${num}`;
    setDropdownsAbiertos((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handlePositionSelect = (team, num) => {
    setSelectedPositions((prev) => {
      if (team === 'blue') {
        return { blue: num, red: null }; // Si eliges una posición azul, deselecciona la roja
      }
      if (team === 'red') {
        return { red: num, blue: null }; // Si eliges una posición roja, deselecciona la azul
      }
      return prev;
    });
  };

  const handleConfirmClick = () => {
    // Si no se ha seleccionado ninguna posición, muestra el alert
    if (selectedPositions.blue === null && selectedPositions.red === null) {
      alert("Debes seleccionar una posición para poder continuar.");
    } else {
      // Si se seleccionó una posición, redirige al usuario a la siguiente página
      navigate('/confirmedParticipation'); // Cambia '/next-screen' por la ruta de tu siguiente pantalla
    }
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.containerName}>
          <Link to="/eventsNow">
            <i className={`fa-solid fa-circle-arrow-left ${styles.iconoVolver}`}></i>
          </Link>
          <p className={styles.titulo}>Escoge tu posición</p>
          <div className={styles.chatIconContainer}>
            <a
              href="tu-url-de-chat.html"
              className={styles.chatLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir chat"
            >
              <img src={chatIcon} alt="Chat" />
            </a>
          </div>
        </div>
      </header>

      <main className={styles.choosePositionMain}>
        <div className={styles.field}>
          {/* Team Blue */}
          {positions.map((num) => {
            const key = `blue-${num}`;
            const disabled = selectedPositions.red !== null;
            return (
              <div key={key} className={`${styles.player} ${styles.blue} ${styles[`bluePosition${num}`]}`}>
                <span>{num}</span>
                <button
                  className={styles.dropdownBtn}
                  onClick={() => toggleDropdown('blue', num)}
                  aria-label="Seleccionar posición"
                  disabled={disabled}
                >
                  <i className="fas fa-chevron-down"></i>
                </button>
                {dropdownsAbiertos[key] && (
                  <div className={styles.dropdownMenu}>
                    <label>
                      <input
                        type="radio"
                        name="bluePosition"
                        value={num}
                        checked={selectedPositions.blue === num}
                        onChange={() => handlePositionSelect('blue', num)}
                      />
                      Participar en esta posición
                    </label>
                  </div>
                )}
              </div>
            );
          })}

          {/* Team Red */}
          {positions.map((num) => {
            const key = `red-${num}`;
            const disabled = selectedPositions.blue !== null;
            return (
              <div key={key} className={`${styles.player} ${styles.red} ${styles[`redPosition${num}`]}`}>
                <span>{num}</span>
                <button
                  className={styles.dropdownBtn}
                  onClick={() => toggleDropdown('red', num)}
                  aria-label="Seleccionar posición"
                  disabled={disabled}
                >
                  <i className="fas fa-chevron-down"></i>
                </button>
                {dropdownsAbiertos[key] && (
                  <div className={styles.dropdownMenu}>
                    <label>
                      <input
                        type="radio"
                        name="redPosition"
                        value={num}
                        checked={selectedPositions.red === num}
                        onChange={() => handlePositionSelect('red', num)}
                      />
                      Participar en esta posición
                    </label>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <footer className={styles.footer}>
        <button className={styles.confirmBtn} onClick={handleConfirmClick}>
          <span>Confirmar asistencia</span>
        </button>
      </footer>
    </div>
  );
};

export default ChoosePosition;
