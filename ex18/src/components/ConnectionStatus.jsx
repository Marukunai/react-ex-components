import React, { useState, useEffect } from 'react';

function ConnectionStatus() {
    // 1. Estat: inicialitzat amb l'estat actual del navegador
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    // 2. Funció de gestió de canvis (s'utilitzarà com a callback)
    const handleStatusChange = () => {
        // navigator.onLine és una propietat del navegador (true/false)
        setIsOnline(navigator.onLine); 
        console.log(`[Estat Canviat] Connexió ara és: ${navigator.onLine ? 'ONLINE' : 'OFFLINE'}`);
    };

    // 3. Efecte per subscriure's i netejar
    useEffect(() => {
        // 🅰️ Subscripció (al muntatge)
        // Afegeix el mateix handler a ambdós esdeveniments
        window.addEventListener('online', handleStatusChange);
        window.addEventListener('offline', handleStatusChange);
        
        console.log("EventListeners registrats.");

        // 🅱️ Cleanup (al desmuntatge o abans de re-execució)
        return () => {
            window.removeEventListener('online', handleStatusChange);
            window.removeEventListener('offline', handleStatusChange);
            console.log("EventListeners NETEJATS.");
        };

    }, []); // Array de dependències buit: s'executa només al muntatge i al desmuntatge.

    
    // 4. Renderitzat condicional
    const statusText = isOnline ? 'ONLINE' : 'OFFLINE';
    const statusClass = isOnline ? 'status-online' : 'status-offline';

    return (
        <div className="status-container">
            <h3>Estat de la Connexió</h3>
            <div className={`connection-indicator ${statusClass}`}>
                {isOnline ? '🟢' : '🔴'} {statusText}
            </div>
            <p className="note">
                <b>Prova:</b> Obre les eines de desenvolupament (F12) 
                i ves a la pestanya 'Network' (Xarxa). 
                Selecciona 'Offline' per simular la desconnexió.
            </p>
        </div>
    );
}

export default ConnectionStatus;