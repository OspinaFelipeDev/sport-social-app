import { useNavigate } from "react-router-dom";
import inicioPro from "../assets/inicio-pro.png";

function Home() {
  const navigate = useNavigate(); 

  return (
    <div className="home">
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

export default Home;
