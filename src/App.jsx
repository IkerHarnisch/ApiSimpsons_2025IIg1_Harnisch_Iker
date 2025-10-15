import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Characters from './pages/Characters';
import CharacterDetail from './pages/CharacterDetail';
import Episodes from './pages/Episodes';
import Locations from './pages/Locations';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="personajes" element={<Characters />} />
          <Route path="personaje/:id" element={<CharacterDetail />} />
          <Route path="episodios" element={<Episodes />} />
          <Route path="lugares" element={<Locations />} />
          {/* Rutas en inglés para compatibilidad */}
          <Route path="characters" element={<Characters />} />
          <Route path="episodes" element={<Episodes />} />
          <Route path="locations" element={<Locations />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
