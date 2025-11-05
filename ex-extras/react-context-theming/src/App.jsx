import React from 'react';
import { ThemeProvider } from './context/ThemeProvider';
import ContentPanel from './components/ContentPanel';

function App() {
  return (
    // 1. Emboliquem l'aplicació dins del Provider
    <ThemeProvider> 
      <div className="exercise-container">
        
        <div className="exercise-box">
          <h2>🌍 Exercici: Context API (Theming)</h2>
          
          {/* 2. ContentPanel, sense props, accedeix al context */}
          <ContentPanel /> 
          
        </div>
        
      </div>
    </ThemeProvider>
  );
}

export default App;