import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Macro
        </Link>

        <div className="navbar-links">
          <Link to="/">Inicio</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/about">Sobre mí</Link>
          <Link to="/contact">Contacto</Link>
          <Link to="/ipim">IPIM</Link>
    
        </div>
      </div>
    </nav>
  );
}

export default Navbar;