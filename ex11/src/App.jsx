import React, { useState } from 'react';
import AutoCounter from './components/AutoCounter';

function App() {
    // Estat per controlar si el component AutoCounter ha de ser visible o no
    const [isCounterVisible, setIsCounterVisible] = useState(true);

    const handleToggle = () => {
        setIsCounterVisible(!isCounterVisible);
    };

    return (
        <div className="exercise-container">
            <div className="exercise-box">
                <h2>Exercici 11: Contador amb useEffect i Cleanup</h2>
                
                <button onClick={handleToggle} className="btn-toggle">
                    {isCounterVisible ? 'Desmuntar Contador (Ocultar)' : 'Muntar Contador (Mostrar)'}
                </button>
                
                <hr style={{ margin: '20px 0' }}/>
                
                {/* Renderitzat condicional: Muntatge/Desmuntatge */}
                {isCounterVisible && <AutoCounter />}
                
                {!isCounterVisible && (
                    <p className="cleanup-message">
                        El contador està **DESMUNTAT**. El `useEffect` hauria d'haver netejat el temporitzador.
                    </p>
                )}
            </div>
        </div>
    );
}

export default App;