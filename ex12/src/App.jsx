import React from 'react';
import APIDataFetcher from './components/APIDataFetcher';

function App() {
  return (
    <div className="exercise-container">
      
      <div className="exercise-box">
        <h2>Exercici Component de Dades de l'API (`useEffect` de dades)</h2>
        <APIDataFetcher />
      </div>
      
    </div>
  );
}

export default App;