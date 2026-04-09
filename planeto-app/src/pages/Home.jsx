import "./pages.css";
import { useNavigate } from "react-router-dom";
import earth from "../assets/earth.png";
import astronaut from "../assets/astronaut.png";
import stars from "../assets/stars.png";
import mercury from "../assets/mercury.png";
import venus from "../assets/Venus.png";
import jupiter from "../assets/Jupiter.png";
import neptune from "../assets/neptune.png";
import uranus from "../assets/Uranus.png";
import sun from "../assets/Sun.png";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <img src={stars} className="stars" alt="stars" />

      <div className="planet-container">

        {/* Center */}
        <img src={earth} className="earth" alt="earth" />
        <img src={astronaut} className="astronaut" alt="astronaut" />

        {/* LEFT*/}
        <img src={mercury} alt="mercury" className="planet left p1"/>
        <img src={venus} alt="venus" className="planet left p2"/>
        <img src={sun} alt="sun" className="planet left p3" />

        {/* RIGHT*/}
        <img src={jupiter} alt="jupiter" className="planet right p4"/>
        <img src={neptune} alt="neptune" className="planet right p5"/>  
        <img src={uranus}  alt="uranus"  className="planet right p6"/>

      </div>
    </div>
  );
}

export default Home;