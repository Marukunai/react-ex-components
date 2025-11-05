import { useState, useEffect } from 'react';

// Un custom hook ha de començar sempre per 'use'
export function useOnlineStatus() {
    // 1. Estat per emmagatzemar la connexió
    // navigator.onLine és una API del navegador que retorna true/false
    const [isOnline, setIsOnline] = useState(navigator.onLine); 

    useEffect(() => {
        // 2. Funcions per canviar l'estat
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        // 3. Afegir els listeners al muntatge
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        // 4. Funció de neteja (cleanup)
        // Aquesta funció s'executa quan el component es desmunta 
        // o abans que useEffect es torni a executar
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []); // Array de dependències buit: l'efecte només s'executa un cop al muntatge

    // 5. Retornem l'estat que serà utilitzat pel component
    return isOnline; 
}