import React from 'react';
import Testimoni from './components/Testimoni';
import testimonisData from './data/testimonisData';

function App() {
  
  // Mapeig de l'array de testimonis per crear la llista
  const testimonisList = testimonisData.map((t) => (
      <Testimoni 
          // Passem les propietats de l'objecte t
          key={t.nom} // Utilitzem el nom com a clau única simple
          {...t} // Utilitzem l'spread operator per passar totes les propietats
      />
  ));

  return (
    <div className="exercise-container">
      
      <div className="exercise-box">
        <h2>Exercici 3: Testimonis</h2>
        <p>Aquest component utilitza l'array de dades per reutilitzar el component Testimoni, incloent la ruta d'imatge.</p>
        
        <div className="testimonis-grid">
            {testimonisList} 
        </div>
        
        <p style={{ marginTop: '20px', color: '#ff0000' }}>
            **NOTA IMPORTANT:** Per veure les imatges, has de crear la carpeta 
            `public/assets/testimonis/` i posar-hi els fitxers.
        </p>

      </div>
    </div>
  );
}

export default App;