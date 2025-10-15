import '../styles/Characters.css';
import { useState, useEffect } from 'react';
import SimpsonsApiService from '../services/simpsonsApi';
import CharacterCard from '../components/CharacterCard';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        console.log('Iniciando carga de personajes...');
        setLoading(true);
        setError(null);
        
        const data = await SimpsonsApiService.getCharacters();
        console.log('Personajes obtenidos:', data);
        
        if (data && Array.isArray(data) && data.length > 0) {
          setCharacters(data);
          setFilteredCharacters(data);
        } else {
          console.warn('No se encontraron personajes o formato inválido:', data);
          setError('No se encontraron personajes disponibles');
        }
      } catch (err) {
        console.error('Error detallado al cargar personajes:', err);
        setError(`Error al cargar los personajes: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = characters.filter(character =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCharacters(filtered);
      setCurrentPage(1); 
    } else {
      setFilteredCharacters(characters);
    }
  }, [searchTerm, characters]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCharacters = filteredCharacters.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return <Loader message="Cargando personajes..." />;
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="characters">
      <div className="characters-header">
        <h2>Personajes de Los Simpsons</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar personaje..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="characters-grid">
        {currentCharacters.map((character, index) => (
          <CharacterCard 
            key={character.id} 
            character={character}
            animationDelay={index * 0.1}
          />
        ))}
      </div>

      {filteredCharacters.length > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalItems={filteredCharacters.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      )}

      {filteredCharacters.length === 0 && searchTerm && (
        <div className="no-results">
          <h3>No se encontraron resultados</h3>
          <p>No se encontraron personajes con el término "{searchTerm}"</p>
          <p>Intenta con otro nombre o término de búsqueda.</p>
        </div>
      )}
    </div>
  );
};

export default Characters;