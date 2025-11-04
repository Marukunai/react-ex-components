import React, { useState, useEffect } from 'react';

function AutoCounter() {
    const [counter, setCounter] = useState(0);

    // 1. Efecte (useEffect)
    useEffect(() => {
        // Funció que s'executarà cada 1000ms (1 segon)
        const intervalId = setInterval(() => {
            // Utilitzem la forma funcional de setCounter (prevState => newValue)
            // Això assegura que l'increment es basa en l'estat més actual
            setCounter(prevCounter => prevCounter + 1);
        }, 1000); // Interval d'1 segon

        // 2. Cleanup (Funció de Neteja)
        // Aquesta funció s'executa quan el component es desmunta o abans de re-executar l'efecte.
        return () => {
            console.log(`Netejant l'interval: ${intervalId}`);
            clearInterval(intervalId);
        };
        
    }, []); // 3. Array de dependències buit: l'efecte només s'executa un cop al muntatge.

    return (
        <div className="counter-box">
            <h3>Contador Automàtic</h3>
            <p>Aquest número s'actualitza cada segon (gràcies a useEffect):</p>
            <div className="counter-display highlight-value">{counter}</div>
            <p className="note">Obre la consola del teu navegador per veure el missatge de 'Netejant' quan el desmuntis!</p>
        </div>
    );
}

export default AutoCounter;