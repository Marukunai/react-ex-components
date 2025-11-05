import React from 'react';

// 1. Simula una funció amb càlcul pesat (e.g., filtratge complex)
function slowCalculation(number, maxIterations = 50000000) {
    console.log(`[SLOW CALCULATION] Executant càlcul per al número: ${number}`);
    let result = 0;
    for (let i = 0; i < maxIterations; i++) {
        result += Math.sqrt(i) * number;
    }
    return Math.floor(result % 100); // Retorna un valor de prova
}

// 2. Component que serà memoitzat
// Rep value, list i la funció handleDelete
function OptimizedList({ value, list, handleDelete }) {
    
    // NOTA: Aquesta funció lenta NO està a useMemo aquí! 
    // Si ho féssim, el component pare s'hauria de re-renderitzar igualment
    // i el càlcul es tornaria a fer si no utilitzem 'useMemo' al component PARE.
    // L'aplicació REAL de useMemo es farà al PARE.
    
    return (
        <div className="optimized-list-panel">
            <h4>Component Fill (OptimizedList)</h4>
            
            {/* Càlcul simulat del valor pesat dins del component */}
            <p className="slow-output">
                Càlcul lent: <b>{slowCalculation(value)}</b>
            </p>

            <ul className="item-list">
                {list.map(item => (
                    <li key={item.id} className="item-row">
                        <span>{item.text}</span>
                        {/* 3. Utilitzem la funció (que vindrà de useCallback) */}
                        <button onClick={() => handleDelete(item.id)} className="btn-delete">
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

// 4. Eina clau: React.memo()
// Només es tornarà a renderitzar si les seves props (value, list, handleDelete) han canviat.
export default React.memo(OptimizedList);