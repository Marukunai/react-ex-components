import { useState, useEffect } from 'react';

export function useFetch(url) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isCancelled = false;
        
        const fetchData = async () => {
            setIsLoading(true); 
            setError(null);    
            // ... (resta de la lògica de fetching)
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
                const result = await response.json();
                
                if (!isCancelled) setData(result);
                
            } catch (err) {
                if (!isCancelled) setError(err.message || 'Error desconegut.');
            } finally {
                if (!isCancelled) setIsLoading(false);
            }
        };

        fetchData();
        return () => {
            isCancelled = true;
        };
    }, [url]);

    return { data, isLoading, error };
}