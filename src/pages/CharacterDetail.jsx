import '../styles/CharacterDetail.css';
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import SimpsonsApiService from '../services/simpsonsApi';
import Loader from '../components/Loader';

const CharacterDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        setLoading(true);
        const data = await SimpsonsApiService.getCharacterById(id);
        setCharacter(data);
      } catch (err) {
        setError('Error al cargar la información del personaje');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCharacter();
    }
  }, [id]);

  if (loading) {
    return <Loader message="Cargando información del personaje..." />;
  }

  if (error) {
    return (
      <div className="character-detail-error">
        <h2>¡Ops! Algo salió mal</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/personajes')} className="btn btn-primary">
          Volver a Personajes
        </button>
      </div>
    );
  }

  if (!character) {
    return (
      <div className="character-detail-error">
        <h2>Personaje no encontrado</h2>
        <p>No se pudo encontrar el personaje solicitado.</p>
        <button onClick={() => navigate('/personajes')} className="btn btn-primary">
          Volver a Personajes
        </button>
      </div>
    );
  }

  return (
    <div className="character-detail">
      <div className="character-detail-header">
        <Link to="/personajes" className="back-link">
          ← Volver a Personajes
        </Link>
      </div>

      <div className="character-detail-content">
        <div className="character-detail-image">
          <img 
            src={character.image} 
            alt={character.name}
            onError={(e) => {
              e.target.src = `data:image/svg+xml;base64,${btoa(`
                <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
                  <rect width="400" height="400" fill="#f8f9fa" stroke="#dee2e6" stroke-width="2"/>
                  <text x="200" y="180" text-anchor="middle" font-family="Arial" font-size="16" fill="#6c757d">Imagen no encontrada</text>
                  <text x="200" y="220" text-anchor="middle" font-family="Arial" font-size="14" fill="#495057">${character.name}</text>
                </svg>
              `)}`;
              e.target.alt = character.name;
            }}
          />
        </div>

        <div className="character-detail-info">
          <h1 className="character-name">{character.name}</h1>
          
          <div className="character-stats">
            <div className="stat-item">
              <span className="stat-label">Ocupación:</span>
              <span className="stat-value">
                {character.occupation || 'No especificada'}
              </span>
            </div>

            <div className="stat-item">
              <span className="stat-label">Estado:</span>
              <span className={`stat-value status-${character.status?.toLowerCase() || 'unknown'}`}>
                {character.status || 'Desconocido'}
              </span>
            </div>

            <div className="stat-item">
              <span className="stat-label">Género:</span>
              <span className="stat-value">
                {character.gender || 'No especificado'}
              </span>
            </div>

            {character.age && (
              <div className="stat-item">
                <span className="stat-label">Edad:</span>
                <span className="stat-value">{character.age} años</span>
              </div>
            )}

            {character.species && (
              <div className="stat-item">
                <span className="stat-label">Especie:</span>
                <span className="stat-value">{character.species}</span>
              </div>
            )}
          </div>

          {(character.quote || character.catchphrase || character.famous_quote) && (
            <div className="character-quote">
              <h3>Frase Célebre</h3>
              <blockquote>
                "{character.quote || character.catchphrase || character.famous_quote}"
              </blockquote>
            </div>
          )}

          {character.description && (
            <div className="character-description">
              <h3>Descripción</h3>
              <p>{character.description}</p>
            </div>
          )}
        </div>
      </div>

      <div className="character-detail-actions">
        <button onClick={() => navigate(-1)} className="btn btn-secondary">
          Volver
        </button>
        <Link to="/personajes" className="btn btn-primary">
          Ver Todos los Personajes
        </Link>
      </div>
    </div>
  );
};

export default CharacterDetail;