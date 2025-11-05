import React from 'react';
import ListManager from './components/ListManager';

function App() {
  return (
    <div className="exercise-container">
      
      <div className="exercise-box">
        <h2>⚡ Optimització amb useMemo & useCallback</h2>
        <ListManager />
      </div>
      
    </div>
  );
}

export default App;