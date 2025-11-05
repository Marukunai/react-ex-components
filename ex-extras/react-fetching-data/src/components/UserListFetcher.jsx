import React, { useState, useEffect } from 'react';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

function UserListFetcher() {
    // 1. Estats de la Màquina Asíncrona
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // 2. Control de neteja (cleanup): Per evitar actualitzacions d'estat
        // en un component que es desmunta abans que la petició acabi.
        let isCancelled = false;
        
        const fetchUsers = async () => {
            setIsLoading(true); // Comencem la càrrega
            setError(null);    // Netejar errors anteriors

            try {
                // 3. Execució de la petició asíncrona
                const response = await fetch(API_URL);
                
                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status}`);
                }
                
                const data = await response.json();
                
                // 4. Actualització de l'estat només si no s'ha cancel·lat
                if (!isCancelled) {
                    setUsers(data);
                    setIsLoading(false);
                }
            } catch (err) {
                // 5. Maneig d'error
                if (!isCancelled) {
                    setError('Error en carregar les dades: ' + err.message);
                    setIsLoading(false);
                }
            }
        };

        fetchUsers();

        // 6. Funció de Neteja (Cleanup)
        return () => {
            // Marca la petició com a cancel·lada si el component es desmunta
            isCancelled = true;
        };
    }, []); // Array buit: s'executa només al muntatge

    // 7. Renderitzat Condicional Basat en l'Estat

    if (isLoading) {
        return (
            <div className="status-message loading">
                Càrrega de dades en curs... 🔄
            </div>
        );
    }

    if (error) {
        return (
            <div className="status-message error">
                {error} ❌
                <p>Si us plau, revisa la connexió a Internet o la URL de l'API.</p>
            </div>
        );
    }
    
    if (users.length === 0) {
        return (
            <div className="status-message no-data">
                No s'han trobat usuaris. 🤷‍♂️
            </div>
        );
    }

    // 8. Renderitzat de les dades amb èxit
    return (
        <div className="user-list-container">
            <h3>Llista d'Usuaris Obtinguda de JSONPlaceholder</h3>
            <ul className="user-list">
                {users.map(user => (
                    <li key={user.id} className="user-card">
                        <span className="user-name">👤 {user.name}</span>
                        <span className="user-info">@{user.username} | {user.email}</span>
                        <span className="user-website">🌐 {user.website}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserListFetcher;