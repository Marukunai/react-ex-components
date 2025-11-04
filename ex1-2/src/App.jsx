import React from 'react';
import MyFirstComponent from './components/MyFirstComponent'; 

function App() {
  const myName = "Marukunai";

  return (
    <div className="exercise-container">
      
      {/* Exercicis 1 i 2 */}
      <div className="exercise-box">
        <h2>Exercicis 1 i 2: Components i Props</h2>
        
        {/* Reutilització del component i pas de la prop 'nom' */}
        <MyFirstComponent nom={myName} /> 
        <MyFirstComponent nom="Anna (Usuària 1)" /> 
        <MyFirstComponent nom="Pere (Usuari 2)" /> 
      </div>
    </div>
  );
}

export default App;