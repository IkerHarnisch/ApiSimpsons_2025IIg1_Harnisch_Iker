import '../styles/Locations.css';
import { useState, useEffect } from 'react';
import SimpsonsApiService from '../services/simpsonsApi';
import Loader from '../components/Loader';

const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        console.log('Iniciando carga de ubicaciones...');
        setLoading(true);
        setError(null);
        
        const data = await SimpsonsApiService.getLocations();
        console.log('Ubicaciones obtenidas:', data);
        
        if (data && Array.isArray(data) && data.length > 0) {
          setLocations(data);
        } else {
          console.warn('No se encontraron ubicaciones o formato inválido:', data);
          setError('No se encontraron ubicaciones disponibles');
        }
      } catch (err) {
        console.error('Error detallado al cargar ubicaciones:', err);
        setError(`Error al cargar las ubicaciones: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  if (loading) {
    return <Loader message="Cargando ubicaciones..." />;
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="locations">
      <div className="locations-header">
        <h2>Lugares de The Simpsons</h2>
        <p>Lugares de la serie</p>
      </div>

      <div className="locations-grid">
        {locations.map((location, index) => (
          <div key={location.id || index} className="location-card animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
            <div className="location-image-container">
              {location.image ? (
                <img 
                  src={location.image} 
                  alt={location.name}
                  className="location-image"
                  onError={(e) => {
                    e.target.src = `data:image/svg+xml;base64,${btoa(`
                      <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
                        <rect width="400" height="300" fill="#f8f9fa" stroke="#dee2e6" stroke-width="2"/>
                        <text x="200" y="140" text-anchor="middle" font-family="Arial" font-size="14" fill="#6c757d">Imagen no encontrada</text>
                        <text x="200" y="170" text-anchor="middle" font-family="Arial" font-size="12" fill="#495057">${location.name}</text>
                      </svg>
                    `)}`;
                    e.target.alt = location.name;
                  }}
                />
              ) : (
                <div className="location-placeholder">
                  <span className="location-icon">🏢</span>
                </div>
              )}
              {location.type && (
                <div className="location-type-badge">
                  {location.type}
                </div>
              )}
            </div>
            
            <div className="location-info">
              <h3 className="location-title">{location.name || 'Lugar sin nombre'}</h3>
              
              <div className="location-details">
                {location.type && (
                  <div className="location-detail-item">
                    <span className="detail-label">Tipo:</span>
                    <span className="detail-value">{location.type}</span>
                  </div>
                )}
                
                {location.dimension && (
                  <div className="location-detail-item">
                    <span className="detail-label">Dimensión:</span>
                    <span className="detail-value">{location.dimension}</span>
                  </div>
                )}
                
                {location.residents && location.residents.length > 0 && (
                  <div className="location-detail-item">
                    <span className="detail-label">Residentes:</span>
                    <span className="detail-value resident-count">
                      {location.residents.length} {location.residents.length === 1 ? 'residente' : 'residentes'}
                    </span>
                  </div>
                )}
                
                {location.description && (
                  <div className="location-description">
                    <p>{location.description}</p>
                  </div>
                )}
                
                {location.address && (
                  <div className="location-detail-item">
                    <span className="detail-label">Dirección:</span>
                    <span className="detail-value">{location.address}</span>
                  </div>
                )}
                
                {location.first_appearance && (
                  <div className="location-detail-item">
                    <span className="detail-label">Primera aparición:</span>
                    <span className="detail-value">{location.first_appearance}</span>
                  </div>
                )}
              </div>
              
              {location.residents && location.residents.length > 0 && (
                <div className="location-residents">
                  <span className="residents-label">Personajes frecuentes:</span>
                  <div className="residents-list">
                    {location.residents.slice(0, 3).map((resident, idx) => (
                      <span key={idx} className="resident-tag">{resident}</span>
                    ))}
                    {location.residents.length > 3 && (
                      <span className="resident-tag more">+{location.residents.length - 3} más</span>
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

export default Locations;