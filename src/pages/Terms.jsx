import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Terms.module.css";

const Terms = () => {

  return (
    <div className={styles.termsContainer}>
      <header className={styles.header}>
      <Link to="/createAccount">
          <i className={`fa-solid fa-circle-arrow-left ${styles.iconoVolver}`}></i>
        </Link>

        <h1 className={styles.title}>Términos y condiciones</h1>
      </header>

      <main className={styles.main}>
        <p>
          1. Aceptación de los Términos Al acceder y utilizar la aplicación, el
          usuario acepta los términos y condiciones establecidos. Si no está de
          acuerdo con estos términos, no podrá utilizar los servicios
          proporcionados por la aplicación.
        </p>
        <p>
          2. Requisitos del Usuario
          Para utilizar la aplicación, el usuario debe tener al menos 15 años de
          edad o contar con el consentimiento de un tutor legal. El usuario se 
          compromete a proporcionar información precisa y actualizada al momento de registrarse.
        </p>
        <p>
          3. Registro y Seguridad de la Cuenta
          El usuario es responsable de mantener la confidencialidad de su cuenta y contraseña. 
          Cualquier actividad realizada en su cuenta será considerada responsabilidad del usuario. 
          En caso de sospecha de un uso no autorizado de la cuenta, el usuario debe notificarlo
          inmediatamente.
        </p>
        <p>
          4. Uso Permitido
          La aplicación está diseñada para la organización de encuentros deportivos y la asignación de tareas en actividades
          deportivas. El usuario se compromete a utilizar la aplicación de acuerdo con las leyes
          aplicables, y no podrá usar la plataforma para fines ilegales o no autorizados.
        </p>
        <p>
          5. Creación y Participación en Encuentros
          El usuario podrá crear y participar en encuentros deportivos, eligiendo el deporte, 
          la posición, el horario y el equipo. 
          El administrador del encuentro es responsable de gestionar los participantes y asignar
          tareas.
        </p>
        <p>
          6. Derechos de Propiedad Intelectual
          La aplicación y su contenido, incluyendo pero no limitándose a textos, gráficos, logos
          y software, están protegidos por derechos de autor. El usuario no podrá reproducir,
          distribuir ni modificar el contenido sin el permiso correspondiente.
        </p>
        <p>
          7. Privacidad y Datos Personales
          Los datos personales proporcionados por el usuario serán manejados conforme a nuestra
          Política de Privacidad, y serán utilizados para la gestión de la cuenta, participación
          en encuentros y otras funcionalidades relacionadas. El usuario autoriza el tratamiento
          de sus datos al registrarse en la aplicación.
        </p>
        <p>
          8. Modificaciones de los Términos
          La aplicación se reserva el derecho de modificar estos términos y condiciones en
          cualquier momento. Los cambios serán publicados en la aplicación, y la continuación
          del uso de la misma implicará la aceptación de los términos actualizados.
        </p>
        <p>
          9. Limitación de Responsabilidad
          La aplicación no será responsable por daños directos, indirectos, incidentales o 
          consecuentes resultantes del uso de la plataforma, incluyendo la pérdida de datos
          o interrupciones en los servicios.
        </p>
        <p>
          10. Resolución de Disputas
          Cualquier disputa relacionada con estos términos será resuelta a través de arbitraje,
          conforme a las leyes locales. El usuario se compromete a intentar resolver cualquier
          conflicto de manera amistosa antes de recurrir a acciones legales.
        </p>
        <p>
          11. Terminación de la Cuenta
          La aplicación se reserva el derecho de suspender o eliminar la cuenta de cualquier
          usuario que incumpla estos términos y condiciones.
        </p>
      </main>
    </div>
  );
};

export default Terms;
