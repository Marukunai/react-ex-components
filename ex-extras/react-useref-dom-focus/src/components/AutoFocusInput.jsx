import React, { useRef, useEffect, useState } from 'react';

function AutoFocusInput() {
    // 1. Ref per a l'element del DOM (l'input)
    const inputRef = useRef(null); 
    
    // 2. Ref per a un valor mutable que no ha de causar re-renders
    // (Simularem un comptador intern de clics de focus)
    const focusCountRef = useRef(0);

    // 3. Estat simple per forçar un re-render del component
    const [renderCount, setRenderCount] = useState(0);

    // useEffect per enfocar l'input automàticament al muntatge
    useEffect(() => {
        // La referència es troba a la propietat .current
        inputRef.current.focus(); 
    }, []); // Array de dependències buit: només s'executa al muntatge

    const handleFocusClick = () => {
        // Accés directe al DOM per enfocar
        inputRef.current.focus();
        
        // Incrementar el valor del ref (NO activa re-render)
        focusCountRef.current = focusCountRef.current + 1;
        
        console.log(`[useRef] Comptador de Focus Intern (No-Render): ${focusCountRef.current}`);
    };

    const handleReadValue = () => {
        // Llegir el valor de l'input directament, sense usar useState
        const value = inputRef.current.value;
        alert(`Valor actual (llegit amb useRef): "${value}"`);
    };
    
    // Funció per forçar un re-render i veure que focusCountRef persisteix
    const handleForceRender = () => {
        setRenderCount(c => c + 1);
    };

    return (
        <div className="useref-container">
            <h3>Focus i Lectura del DOM</h3>
            
            {/* INPUT REFERENCIAT */}
            <input 
                type="text" 
                ref={inputRef} // Passem la referència
                placeholder="Escriviu aquí (Focus automàtic)"
                className="input-focus"
            />
            
            <div className="button-group">
                <button onClick={handleFocusClick} className="btn-action btn-focus">
                    Enfocar l'Input
                </button>
                <button onClick={handleReadValue} className="btn-action btn-read">
                    Llegir Valor (Sense Estat)
                </button>
            </div>
            
            <hr />
            
            <h4>Demostració de Valor Mutable Persistent</h4>
            <div className="mutable-demo">
                <p>
                    <b>Comptador Intern (useRef):</b> {focusCountRef.current}
                    <span className="note-ref"> (El valor persisteix)</span>
                </p>
                <p>
                    <b>Comptador de Render (useState):</b> {renderCount}
                    <span className="note-state"> (El valor causa re-render)</span>
                </p>
                <button onClick={handleForceRender} className="btn-action btn-render">
                    Forçar Render
                </button>
            </div>
        </div>
    );
}

export default AutoFocusInput;