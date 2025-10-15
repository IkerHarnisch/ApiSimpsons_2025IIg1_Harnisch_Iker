import '../styles/Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <div className="hero">
        <h2>El Mundo de Los Simpsons</h2>
        <p>Averigua sobre personajes, episodios y lugares de la serie.</p>
      </div>
      
      <div className="features">
        <div className="feature-card">
          <h3>Personajes</h3>
          <p>Habitantes de Springfield</p>
          <Link to="/personajes" className="feature-link">
            Explorar Personajes →
          </Link>
        </div>
        
        <div className="feature-card">
          <h3>Episodios</h3>
          <p>Episodios de la serie</p>
          <Link to="/episodios" className="feature-link">
            Ver Episodios →
          </Link>
        </div>
        
        <div className="feature-card">
          <h3>Lugares</h3>
          <p>Lugares de la serie</p>
          <Link to="/lugares" className="feature-link">
            Visitar Lugares →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;