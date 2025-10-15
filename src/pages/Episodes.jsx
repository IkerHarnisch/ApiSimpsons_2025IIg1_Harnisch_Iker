import '../styles/Episodes.css';
import { useState, useEffect } from 'react';
import SimpsonsApiService from '../services/simpsonsApi';
import Loader from '../components/Loader';

const Episodes = () => {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        console.log('Iniciando carga de episodios...');
        setLoading(true);
        setError(null);
        
        const data = await SimpsonsApiService.getEpisodes();
        console.log('Episodios obtenidos:', data);
        
        if (data && Array.isArray(data) && data.length > 0) {
          setEpisodes(data);
        } else {
          console.warn('No se encontraron episodios o formato inválido:', data);
          setError('No se encontraron episodios disponibles');
        }
      } catch (err) {
        console.error('Error detallado al cargar episodios:', err);
        setError(`Error al cargar los episodios: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, []);

  if (loading) {
    return <Loader message="Cargando episodios..." />;
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="episodes">
      <div className="episodes-header">
        <h2>Episodios de Los Simpsons</h2>
        <p>Total de episodios: {episodes.length}</p>
      </div>

      <div className="episodes-grid">
        {episodes.map((episode, index) => (
          <div key={episode.id || index} className="episode-card animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
            <div className="episode-header">
              <div className="episode-number">S{episode.season || '?'}E{episode.episode || '?'}</div>
              <div className="episode-air-date">
                {episode.air_date ? new Date(episode.air_date).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : 'Fecha no disponible'}
              </div>
            </div>
            
            <div className="episode-info">
              <h3 className="episode-title">{episode.name || episode.title || 'Episodio sin título'}</h3>
              
              <div className="episode-details">
                <span className="episode-detail-item">
                  <strong>Temporada:</strong> {episode.season || 'N/A'}
                </span>
                <span className="episode-detail-item">
                  <strong>Episodio:</strong> {episode.episode || 'N/A'}
                </span>
                {episode.production_code && (
                  <span className="episode-detail-item">
                    <strong>Código:</strong> {episode.production_code}
                  </span>
                )}
              </div>

              {episode.description && (
                <p className="episode-description">{episode.description}</p>
              )}
              
              {episode.director && (
                <p className="episode-director">
                  <strong>Director:</strong> {episode.director}
                </p>
              )}
              
              {episode.writer && (
                <p className="episode-writer">
                  <strong>Escritor:</strong> {episode.writer}
                </p>
              )}
              
              {episode.characters && episode.characters.length > 0 && (
                <div className="episode-characters">
                  <strong>Personajes principales:</strong>
                  <div className="characters-list">
                    {episode.characters.slice(0, 3).map((character, idx) => (
                      <span key={idx} className="character-tag">{character}</span>
                    ))}
                    {episode.characters.length > 3 && (
                      <span className="character-tag more">+{episode.characters.length - 3} más</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Episodes;