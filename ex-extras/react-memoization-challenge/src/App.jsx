import React, { useState, useMemo, useCallback } from 'react';
import { heavyCalculation } from './utils/heavyCalculations';
import MemoizedButton from './components/MemoizedButton';

const INITIAL_NUMBER = 25;

function App() {
    // 1. Estat de control (canvia amb el botó MemoizedButton)
    const [simpleCount, setSimpleCount] = useState(0); 

    // 2. Estat que controla el càlcul (El canvi provoca un nou càlcul)
    const [baseNumber, setBaseNumber] = useState(INITIAL_NUMBER); 
    const [input, setInput] = useState(INITIAL_NUMBER);

    // 3. useMemo: Memorització del Càlcul Costós
    // Només es tornarà a executar la funció heavyCalculation si baseNumber canvia.
    // Si simpleCount canvia, aquesta part s'ignora.
    const calculatedResult = useMemo(() => {
        return heavyCalculation(baseNumber);
    }, [baseNumber]); // Dependència: només si baseNumber canvia

    // 4. useCallback: Memorització de la Funció
    // Aquesta funció es passa al MemoizedButton. 
    // Només es recrea si setSimpleCount canvia (que mai ho fa) o si la seva dependència canvia (que és buida).
    // Això garanteix que MemoizedButton no es re-renderitzi innecessàriament.
    const incrementCountCallback = useCallback(() => {
        setSimpleCount(prev => prev + 1);
    }, []); // Dependència buida: la funció sempre és la mateixa instància

    const handleNewCalculation = () => {
        // Això canvia la dependència de useMemo, forçant un nou càlcul pesat
        setBaseNumber(Number(input));
    };

    return (
        <div className="container">
            <div className="exercise-box">
                <h2>🧠 Optimització amb `useMemo` i `useCallback`</h2>
                
                <p className="note">
                    Obre la **Consola** del navegador per veure els missatges de "Càlcul costós" i "MemoizedButton: Renderitzat".
                </p>
                
                {/* -------------------- 1. Àrea de Càlcul Costós (useMemo) -------------------- */}
                <div className="section calculation-section">
                    <h3>Càlcul Pesat (`useMemo`)</h3>
                    <div className="input-group">
                        <label>Base Numèrica (Actual: {baseNumber})</label>
                        <input
                            type="number"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Introdueix un número"
                        />
                        <button onClick={handleNewCalculation} className="btn-calculate">
                            Executar Càlcul Pesat
                        </button>
                    </div>

                    <div className="result-box">
                        Resultat Calculat: 
                        <span className="result-value">{calculatedResult}</span>
                    </div>
                </div>

                {/* -------------------- 2. Àrea de Control sense Relació (useCallback) -------------------- */}
                <div className="section counter-section">
                    <h3>Comptador Simple (`useCallback` / `React.memo`)</h3>
                    
                    {/* Aquest botó rep una funció useMemo i usa React.memo */}
                    <MemoizedButton 
                        onClick={incrementCountCallback} 
                        count={simpleCount} 
                    />
                    
                    <p className="result-text">
                        Si fas clic al botó anterior, el **càlcul costós NO es torna a executar**, i el **`MemoizedButton` NO es re-renderitza** (només ho fa quan `count` canvia, que és un *prop*).
                    </p>
                    <p className="result-text">
                        *(Si el MemoizedButton NO utilitzés `React.memo` ni `useCallback`, es renderitzaria cada vegada que fas clic a qualsevol botó)*.
                    </p>
                </div>
                
            </div>
        </div>
    );
}

export default App;