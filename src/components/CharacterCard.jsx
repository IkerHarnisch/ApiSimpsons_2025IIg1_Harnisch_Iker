import { Link } from 'react-router-dom';

const CharacterCard = ({ character, animationDelay = 0 }) => {
  return (
    <div 
      className="character-card animate-fade-in" 
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <div className="character-image-container">
        <img 
          src={character.image} 
          alt={character.name}
          className="character-image"
          onError={(e) => {
            e.target.src = `data:image/svg+xml;base64,${btoa(`
              <svg xmlns="http://www.w3.org/2000/svg" width="300" height="220" viewBox="0 0 300 220">
                <rect width="300" height="220" fill="#f8f9fa" stroke="#dee2e6" stroke-width="2"/>
                <text x="150" y="100" text-anchor="middle" font-family="Arial" font-size="14" fill="#6c757d">Imagen no encontrada</text>
                <text x="150" y="130" text-anchor="middle" font-family="Arial" font-size="12" fill="#495057">${character.name}</text>
              </svg>
            `)}`;
            e.target.alt = character.name;
          }}
        />
      </div>
      
      <div className="character-info">
        <h3 className="character-title">{character.name}</h3>
        
        <p className="character-occupation">
          <strong>Ocupación:</strong> {character.occupation || 'No especificado'}
        </p>
        
        <p className="character-status">
          <strong>Estado:</strong> 
          <span className={`status-badge status-${character.status?.toLowerCase() || 'unknown'}`}>
            {character.status || 'Desconocido'}
          </span>
        </p>
        
        <p className="character-gender">
          <strong>Género:</strong> {character.gender || 'No especificado'}
        </p>

        {character.age && (
          <p className="character-age">
            <strong>Edad:</strong> {character.age} años
          </p>
        )}

        <div className="character-actions">
          <Link 
            to={`/personaje/${character.id}`} 
            className="btn btn-primary character-detail-btn"
          >
            Ver Detalles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;