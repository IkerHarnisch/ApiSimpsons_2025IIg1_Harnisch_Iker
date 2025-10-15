import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <h1>Los Simpsons</h1>
        </Link>
        <div className="navbar-menu">
          <Link 
            to="/" 
            className={`navbar-link ${isActive('/') ? 'active' : ''}`}
          >
            Inicio
          </Link>
          <Link 
            to="/personajes" 
            className={`navbar-link ${isActive('/personajes') ? 'active' : ''}`}
          >
            Personajes
          </Link>
          <Link 
            to="/episodios" 
            className={`navbar-link ${isActive('/episodios') ? 'active' : ''}`}
          >
            Episodios
          </Link>
          <Link 
            to="/lugares" 
            className={`navbar-link ${isActive('/lugares') ? 'active' : ''}`}
          >
            Lugares
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;