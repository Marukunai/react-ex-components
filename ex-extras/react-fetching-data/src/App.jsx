import React from 'react';
import UserListFetcher from './components/UserListFetcher';

function App() {
  return (
    <div className="exercise-container">
      
      <div className="exercise-box">
        <h2>📡 Càrrega de Dades Asíncrones amb `useEffect`</h2>
        <UserListFetcher />
      </div>
      
    </div>
  );
}

export default App;