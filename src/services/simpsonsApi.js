const BASE_URL = 'https://thesimpsonsapi.com/api';

/**
 * Servicio para consumir The Simpsons API
 */
export class SimpsonsApiService {
  /**
   * Obtiene personajes de la primera página
   * @returns {Promise<Array>} Lista de personajes
   */
  static async getCharacters() {
    try {
      console.log('Fetching characters from:', `${BASE_URL}/characters`);
      
      const response = await fetch(`${BASE_URL}/characters`);
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Raw API response:', data);
      
      // La API devuelve un objeto con results
      if (data.results && Array.isArray(data.results)) {
        console.log('Found', data.results.length, 'characters in results');
        // Mapear los datos a un formato consistente
        const mappedCharacters = data.results.map(character => ({
          ...character,
          image: character.portrait_path ? `https://thesimpsonsapi.com${character.portrait_path}` : null,
          quote: character.phrases && character.phrases.length > 0 ? character.phrases[0] : null,
          catchphrase: character.phrases && character.phrases.length > 0 ? character.phrases[0] : null,
          birth_date: character.birthdate
        }));
        return mappedCharacters;
      } 
      
      // Si es un array directamente
      if (Array.isArray(data)) {
        console.log('Found', data.length, 'characters in direct array');
        return data;
      }
      
      // Si es un objeto individual
      console.log('Single character object received');
      return [data];
      
    } catch (error) {
      console.error('Error fetching characters:', error);
      throw error;
    }
  }

  /**
   * Obtiene un personaje por ID
   * @param {number} id - ID del personaje
   * @returns {Promise<Object>} Datos del personaje
   */
  static async getCharacterById(id) {
    try {
      const response = await fetch(`${BASE_URL}/characters/${id}`);
      if (!response.ok) {
        throw new Error(`Error fetching character: ${response.status}`);
      }
      const character = await response.json();
      
      // Usar la imagen original de la API
      const avatarUrl = character.portrait_path ? `https://thesimpsonsapi.com${character.portrait_path}` : null;
      
      return {
        ...character,
        image: avatarUrl,
        quote: character.phrases && character.phrases.length > 0 ? character.phrases[0] : null,
        catchphrase: character.phrases && character.phrases.length > 0 ? character.phrases[0] : null,
        birth_date: character.birthdate
      };
    } catch (error) {
      console.error('Error fetching character:', error);
      throw error;
    }
  }

  /**
   * Obtiene episodios
   * @returns {Promise<Array>} Lista de episodios
   */
  static async getEpisodes() {
    try {
      console.log('Fetching episodes from:', `${BASE_URL}/episodes`);
      
      const response = await fetch(`${BASE_URL}/episodes`);
      console.log('Episodes response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Episodes raw response:', data);
      
      if (data.results && Array.isArray(data.results)) {
        console.log('Found', data.results.length, 'episodes in results');
        // Mapear los datos a un formato consistente
        const mappedEpisodes = data.results.map(episode => ({
          ...episode,
          air_date: episode.airdate,
          episode: episode.episode_number,
          description: episode.synopsis
        }));
        return mappedEpisodes;
      }
      
      if (Array.isArray(data)) {
        console.log('Found', data.length, 'episodes in direct array');
        return data;
      }
      
      console.log('Single episode object received');
      return [data];
      
    } catch (error) {
      console.error('Error fetching episodes:', error);
      throw error;
    }
  }

  /**
   * Obtiene un episodio por ID
   * @param {number} id - ID del episodio
   * @returns {Promise<Object>} Datos del episodio
   */
  static async getEpisodeById(id) {
    try {
      const response = await fetch(`${BASE_URL}/episodes/${id}`);
      if (!response.ok) {
        throw new Error(`Error fetching episode: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching episode:', error);
      throw error;
    }
  }

  /**
   * Obtiene ubicaciones
   * @returns {Promise<Array>} Lista de ubicaciones
   */
  static async getLocations() {
    try {
      console.log('Fetching locations from:', `${BASE_URL}/locations`);
      
      const response = await fetch(`${BASE_URL}/locations`);
      console.log('Locations response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Locations raw response:', data);
      
      if (data.results && Array.isArray(data.results)) {
        console.log('Found', data.results.length, 'locations in results');
        // Mapear los datos a un formato consistente
        const mappedLocations = data.results.map(location => ({
          ...location,
          image: location.image_path ? `https://thesimpsonsapi.com${location.image_path}` : null,
          type: location.use,
          description: location.town ? `Ubicado en ${location.town}` : 'Springfield'
        }));
        return mappedLocations;
      }
      
      if (Array.isArray(data)) {
        console.log('Found', data.length, 'locations in direct array');
        return data;
      }
      
      console.log('Single location object received');
      return [data];
      
    } catch (error) {
      console.error('Error fetching locations:', error);
      throw error;
    }
  }

  /**
   * Obtiene una ubicación por ID
   * @param {number} id - ID de la ubicación
   * @returns {Promise<Object>} Datos de la ubicación
   */
  static async getLocationById(id) {
    try {
      const response = await fetch(`${BASE_URL}/locations/${id}`);
      if (!response.ok) {
        throw new Error(`Error fetching location: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching location:', error);
      throw error;
    }
  }

  /**
   * Busca personajes por nombre
   * @param {string} name - Nombre del personaje
   * @returns {Promise<Array>} Lista de personajes que coinciden
   */
  static async searchCharacters(name) {
    try {
      const characters = await this.getCharacters();
      return characters.filter(character => 
        character.name.toLowerCase().includes(name.toLowerCase())
      );
    } catch (error) {
      console.error('Error searching characters:', error);
      throw error;
    }
  }
}

export default SimpsonsApiService;