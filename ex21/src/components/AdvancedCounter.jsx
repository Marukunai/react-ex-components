import React, { useReducer, useState } from 'react';

const initialState = {
    count: 0,
    initialValue: 0, // Guardem el valor inicial per poder-hi tornar
};

function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return { ...state, count: state.count + 1 };

        case 'decrement':
            return { ...state, count: state.count - 1 };

        case 'reset':
            // Utilitza el valor inicial guardat
            return { ...state, count: state.initialValue }; 
            
        case 'setValue':
            // L'acció porta un 'payload' (dades addicionals) amb el nou valor
            return { ...state, count: state.count + action.payload }; 
            
        default:
            // És crucial llançar un error si hi ha un tipus d'acció desconegut
            throw new Error(`Tipus d'acció no suportada: ${action.type}`);
    }
}

function AdvancedCounter() {
    // 1. Hook useReducer: [estat_actual, funcio_dispatch] = useReducer(reducer, estat_inicial);
    const [state, dispatch] = useReducer(reducer, initialState);
    
    // 2. Estat local per al input de valor dinàmic
    const [customValue, setCustomValue] = useState(0);

    const handleCustomChange = (e) => {
        // Assegurem que el valor és numèric
        setCustomValue(Number(e.target.value)); 
    };

    return (
        <div className="counter-panel">
            <p className="current-count">
                Comptador Actual: <b>{state.count}</b>
            </p>

            <div className="button-group">
                {/* 3. El botó envia una acció simple (type) al reducer */}
                <button onClick={() => dispatch({ type: 'decrement' })} className="btn-action btn-negative">
                    Decrementar -1
                </button>
                <button onClick={() => dispatch({ type: 'increment' })} className="btn-action btn-positive">
                    Incrementar +1
                </button>
            </div>
            
            <button onClick={() => dispatch({ type: 'reset' })} className="btn-action btn-reset">
                Reiniciar a {state.initialValue}
            </button>
            
            <hr className="divider" />
            
            {/* 4. Input per a l'acció amb Payload (Dades Adicionals) */}
            <div className="custom-control-group">
                <input
                    type="number"
                    value={customValue}
                    onChange={handleCustomChange}
                    placeholder="Valor a sumar/restar"
                    className="custom-input"
                />
                <button 
                    onClick={() => dispatch({ type: 'setValue', payload: customValue })} 
                    className="btn-action btn-custom"
                >
                    Aplicar Valor ({customValue > 0 ? '+' : ''}{customValue})
                </button>
            </div>
            
            <p className="note">
                <b>useReducer</b> centralitza la lògica a la funció `reducer`, 
                fent que el component sigui més net.
            </p>
        </div>
    );
}

export default AdvancedCounter;