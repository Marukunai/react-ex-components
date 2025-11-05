import { useState, useEffect } from 'react';

/**
 * Custom Hook per carregar dades d'una URL
 * @param {string} url - La URL de l'API a la qual fer la petició.
 * @returns {{data: any, isLoading: boolean, error: string | null}}
 */
export function useFetch(url) {
    // 1. Estat de la màquina asíncrona
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isCancelled = false;
        
        const fetchData = async () => {
            setIsLoading(true); 
            setError(null);    

            try {
                const response = await fetch(url);
                
                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status} per a ${url}`);
                }
                
                const result = await response.json();
                
                // 2. Actualitza l'estat només si no s'ha cancel·lat
                if (!isCancelled) {
                    setData(result);
                }
                
            } catch (err) {
                // 3. Maneig d'error
                if (!isCancelled) {
                    setError(err.message || 'Error desconegut en fer la petició.');
                }
            } finally {
                // 4. Finalitza l'estat de càrrega (independentment de l'èxit o el fracàs)
                if (!isCancelled) {
                    setIsLoading(false);
                }
            }
        };

        fetchData();

        // 5. Funció de Neteja (cleanup)
        return () => {
            isCancelled = true;
        };
    }, [url]); // La petició es torna a executar si la URL canvia (reutilització!)

    // 6. Retornem l'objecte d'estat
    return { data, isLoading, error };
}