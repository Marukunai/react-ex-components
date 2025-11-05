import React from 'react';

// Square és un component funcional simple
function Square({ value, onClick }) {
    // 1. Assignem una classe dinàmica 'value-X' o 'value-O'
    const valueClass = value ? `value-${value}` : ''; 
    
    return (
        <button 
            className={`square ${valueClass}`} // Apliquem la classe
            onClick={onClick}
            disabled={value !== null} 
        >
            {value}
        </button>
    );
}

export default Square;