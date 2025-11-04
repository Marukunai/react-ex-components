import React from 'react';
import WorkoutList from './components/WorkoutList';

function App() {
  return (
    <div className="exercise-container">
      
      <div className="exercise-box">
        <h2>Exercici Rutina d'Entrenament (Map & Volum)</h2>
        <WorkoutList />
      </div>
      
    </div>
  );
}

export default App;