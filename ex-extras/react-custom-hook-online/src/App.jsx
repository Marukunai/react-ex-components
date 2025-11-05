import React from 'react';
import HeaderBar from './components/HeaderBar';
import StatusIndicator from './components/StatusIndicator';

function App() {
  return (
    <div className="exercise-container">
      <HeaderBar />
      
      <div className="main-content-area">
        <div className="exercise-box">
          <h2>♻️ Exercici: Custom Hook (`useOnlineStatus`)</h2>
          <p>
            El component <b>StatusIndicator</b> i el <b>HeaderBar</b> utilitzen el mateix custom hook per monitoritzar l'estat de la connexió del navegador.
            <br />
            (Prova de desconnectar el Wi-Fi o l'Ethernet del teu ordinador per veure el canvi)
          </p>
        </div>
        
        {/* Component que fa servir el hook */}
        <StatusIndicator /> 
        
      </div>
      
    </div>
  );
}

export default App;