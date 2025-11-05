import React from 'react';
import TodoListReducer from './components/TodoListReducer';

function App() {
  return (
    <div className="exercise-container">
      
      <div className="exercise-box">
        <h2>✅ Gestor de Tasques (useReducer)</h2>
        <TodoListReducer />
      </div>
      
    </div>
  );
}

export default App;