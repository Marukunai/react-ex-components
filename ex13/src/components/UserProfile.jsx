import React, { useEffect } from 'react';

function UserProfile({ nom, edat }) {
    
    // 1. Efecte que es llança quan canvia qualsevol de les dependències
    useEffect(() => {
        // Aquesta funció simula una acció que només hauria de passar si les dades canvien
        console.log(`[LOG] Dades del perfil actualitzades: ${nom}, ${edat} anys.`);

        // Opcional: Actualitzar el títol de la pàgina
        document.title = `Perfil: ${nom} (${edat})`;
        
    }, [nom, edat]); // <-- Array de dependències: Només s'executa si 'nom' o 'edat' canvien.

    return (
        <div className="user-profile-card">
            <h3>Dades del Perfil</h3>
            <p><strong>Nom:</strong> <span className="highlight-data">{nom}</span></p>
            <p><strong>Edat:</strong> <span className="highlight-data">{edat}</span> anys</p>
            <p className="note"><b>(Revisa la consola quan prems "Actualitzar")</b></p>
        </div>
    );
}

export default UserProfile;