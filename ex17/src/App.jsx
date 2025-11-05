import React from 'react';
import ProductList from './components/ProductList';
import './data/products'; 

function App() {
  return (
    <div className="exercise-container">
      
      <div className="exercise-box">
        <h2>Exercici: Mostrar Detalls al Fer Clic en una Llista</h2>
        <ProductList />
      </div>
      
    </div>
  );
}

export default App;