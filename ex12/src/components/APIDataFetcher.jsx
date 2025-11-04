import React, { useState, useEffect } from 'react';

// URL de l'API de prova (usuaris)
const API_URL = 'https://jsonplaceholder.typicode.com/users';

function APIDataFetcher() {
    // 1. Estats necessaris per a la càrrega de dades
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true); // Indica si la petició està en curs
    const [error, setError] = useState(null);     // Guarda l'error en cas de fallada

    // 2. Efecte per realitzar la petició
    useEffect(() => {
        // Funció asíncrona per utilitzar 'await'
        const fetchData = async () => {
            setLoading(true); // Comença la càrrega

            try {
                const response = await fetch(API_URL);
                
                // Comprova si la resposta HTTP és satisfactòria (status 200-299)
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }
                
                const data = await response.json();
                setUsers(data); // Guarda les dades rebudes
                setError(null); // Neteja qualsevol error anterior

            } catch (err) {
                console.error("Error durant la petició:", err);
                setError("No s'han pogut carregar les dades. Intenta-ho de nou més tard.");
                setUsers([]); // Neteja les dades
            } finally {
                // S'executa sempre, tant si hi ha èxit com si hi ha fallada
                setLoading(false); 
            }
        };

        fetchData(); 

        // Cleanup: No hi ha necessitat de cleanup en una petició fetch simple,
        // però podríem incloure un 'AbortController' si fos una petició llarga.
        
    }, []); // Array de dependències buit: càrrega només al muntatge

    
    // 3. Renderitzat condicional (Loading, Error, Data)
    if (loading) {
        return <div className="loading-message">Carregant dades... 🌐</div>;
    }

    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    // Renderitzat de les dades (Llista d'Usuaris)
    return (
        <div className="data-list-container">
            <h3>Llista d'Usuaris de l'API</h3>
            <ul className="user-list">
                {users.map(user => (
                    <li key={user.id} className="user-item">
                        <span className="user-name highlight">{user.name}</span>
                        <span className="user-details">| Correu: {user.email}</span>
                        <span className="user-details">| Ciutat: {user.address.city}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default APIDataFetcher;