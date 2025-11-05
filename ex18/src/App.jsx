import React from 'react';
import ConnectionStatus from './components/ConnectionStatus';

function App() {
  return (
    <div className="exercise-container">
      
      <div className="exercise-box">
        <h2>Exercici: Indicador de Connexió en Temps Real</h2>
        <ConnectionStatus />
      </div>
      
    </div>
  );
}

export default App;