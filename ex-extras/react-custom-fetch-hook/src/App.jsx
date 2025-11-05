import React from 'react';
import PostViewer from './components/PostViewer';

function App() {
  return (
    <div className="exercise-container">
      
      <div className="exercise-box">
        <h2>🛠️ Custom Hook Avançat: `useFetch`</h2>
        <p className="description">
            Aquest component utilitza el hook `useFetch` per gestionar 
            automàticament els estats de càrrega i error.
        </p>
        <PostViewer />
      </div>
      
    </div>
  );
}

export default App;