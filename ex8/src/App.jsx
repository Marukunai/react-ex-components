import React from 'react';
import LikeCounter from './components/LikeCounter';

function App() {
  return (
    <div className="exercise-container">
      
      <div className="exercise-box">
        <h2>Exercici Comptador de Likes (`useState`)</h2>
        <LikeCounter />
      </div>
      
    </div>
  );
}

export default App;