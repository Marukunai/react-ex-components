import React from 'react';
// 1. Components de React Router necessaris
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// 2. Components de les pàgines
import Home from './components/Home';
import About from './components/About';
import UserDetail from './components/UserDetail';

function App() {
  return (
    // 3. Embolcallar amb BrowserRouter
    <BrowserRouter>
      
      <nav className="nav-bar">
        {/* 4. Utilitzar Link per a la navegació */}
        <Link to="/" className="nav-link">Inici</Link>
        <Link to="/about" className="nav-link">Sobre Nosaltres</Link>
        
        {/* Exemple de ruta dinàmica amb un ID fix */}
        <Link to="/user/7" className="nav-link nav-dynamic">Veure Usuari 7</Link>
      </nav>

      <div className="exercise-box">
        <h2>🌐 Exercici: React Router (Routing SPA)</h2>
        
        {/* 5. Contenidor de Rutes */}
        <Routes>
          
          {/* Ruta Estàtica: Pàgina principal */}
          <Route path="/" element={<Home />} />
          
          {/* Ruta Estàtica: Pàgina Sobre Nosaltres */}
          <Route path="/about" element={<About />} />
          
          {/* Ruta Dinàmica: L'ID serà llegida pel component UserDetail amb useParams */}
          <Route path="/user/:id" element={<UserDetail />} />
          
          {/* Ruta de Contingència (404) */}
          <Route path="*" element={<h3 className="not-found">Error 404: Pàgina no trobada</h3>} />

        </Routes>
      </div>
      
    </BrowserRouter>
  );
}

export default App;