import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import './App.css';
import inicioPro from "./assets/inicio-pro.png";

function Home() {
  const navigate = useNavigate(); 

  return (
    <div className="home"> {/* ⬅️ Clase añadida para evitar conflictos de estilos */}
      <div className="container">
        <div className="circle"></div>
        <img src={inicioPro} alt="Imagen" className="image" />
      </div>

      <div className="container-inicio">
        <h1>SportSocial</h1>
        <p>Estás listo(a) para reunirte!</p>
        <button onClick={() => navigate("/login")}>
          <span>Hagamos Deporte</span>
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router basename="/sport-social-app">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<div>Página de Login</div>} />
    </Routes>
  </Router>
  
  );
}

export default App;
