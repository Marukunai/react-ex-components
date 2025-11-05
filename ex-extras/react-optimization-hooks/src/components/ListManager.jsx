import React, { useState, useMemo, useCallback } from 'react';
import OptimizedList from './OptimizedList';

const initialItems = [
    { id: 1, text: "Element A" },
    { id: 2, text: "Element B" },
    { id: 3, text: "Element C" },
];

function ListManager() {
    // 1. Estat que canvia constantment (força re-render)
    const [count, setCount] = useState(0); 
    
    // 2. Estat que alimenta el component fill
    const [items, setItems] = useState(initialItems); 
    
    // 3. useMemo: Memoització d'una llista de dades
    // Aquesta llista (listToDisplay) només es recalculada si 'items' canvia.
    const listToDisplay = useMemo(() => {
        console.log("[useMemo] Recalculant listToDisplay...");
        // Simulem aquí un càlcul (e.g., ordenar o filtrar)
        return items.filter(item => item.text.includes('Element'));
    }, [items]); // Dependència: només es recalcula si 'items' canvia
    
    // 4. useCallback: Memoització d'una funció (handleDelete)
    // Aquesta funció NO es recrea en cada re-render del pare (per canvis a 'count')
    const handleDelete = useCallback((id) => {
        console.log(`[useCallback] Eliminant element amb ID: ${id}`);
        // Usant la forma funcional de setState per no dependre de 'items' en la llista de dependències
        setItems(prevItems => prevItems.filter(item => item.id !== id));
    }, []); // Dependència: Array buit, la funció es crea UNA vegada.

    return (
        <div className="manager-container">
            
            {/* CONTADOR DE RE-RENDERS (El Pare) */}
            <div className="control-panel">
                <button onClick={() => setCount(c => c + 1)} className="btn-force-render">
                    Incrementar Comptador: <b>{count}</b>
                </button>
                <p className="render-note">
                    *El component pare (`ListManager`) es torna a renderitzar amb cada clic.*
                </p>
            </div>
            
            <hr />
            
            {/* Component Fill (OptimizedList) */}
            {/* Com que useMemo i useCallback aïllen les props, el fill NO es renderitzarà 
                quan només canviï 'count', sinó només quan 'items' o 'handleDelete' canviïn. */}
            <OptimizedList 
                value={count % 3} // Un valor simple que canvia
                list={listToDisplay} // Passat per useMemo
                handleDelete={handleDelete} // Passat per useCallback
            />

        </div>
    );
}

export default ListManager;