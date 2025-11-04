import React, { useState } from 'react';
import UserProfile from './components/UserProfile';

function App() {
    // 1. Estat que guarda les dades que ES MOSTRARAN (les props finals)
    const [profileData, setProfileData] = useState({
        nom: 'Marc',
        edat: 30,
    });

    // 2. Estat que guarda el que s'escriu al formulari (inputs controlats)
    const [formData, setFormData] = useState(profileData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // 3. Quan s'envia el formulari, actualitzem l'estat del perfil
        setProfileData(formData); 
        
        // El canvi a 'profileData' és el que fa que 'UserProfile' es re-renderitzi i s'activi useEffect.
    };

    return (
        <div className="exercise-container">
            <div className="exercise-box">
                <h2>Exercici: Detectar Canvis en Props</h2>
                
                <form onSubmit={handleSubmit} className="profile-form">
                    <div className="form-group">
                        <label>Nom:</label>
                        <input
                            type="text"
                            name="nom"
                            value={formData.nom}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Edat:</label>
                        <input
                            type="number"
                            name="edat"
                            value={formData.edat}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-submit">Actualitzar Perfil</button>
                </form>

                <hr style={{ margin: '30px 0' }} />

                {/* Component fill que rep les dades de l'estat 'profileData' */}
                <UserProfile 
                    nom={profileData.nom} 
                    edat={profileData.edat} 
                />
            </div>
        </div>
    );
}

export default App;