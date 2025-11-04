import React, { useState } from 'react';

function RegistrationForm() {
    // 1. Estat per emmagatzemar les dades del formulari (Nom i Correu)
    const [formData, setFormData] = useState({
        nom: '',
        correu: '',
    });

    // 2. Estat per controlar si el formulari s'ha enviat
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Funció per gestionar el canvi en els inputs
    const handleChange = (e) => {
        // [e.target.name] utilitza l'atribut 'name' de l'input per saber quin camp actualitzar
        const { name, value } = e.target;
        
        setFormData(prevState => ({
            ...prevState, // Copia l'estat anterior
            [name]: value, // Actualitza només el camp que ha canviat
        }));
        
        // Reinicialitzem l'estat d'enviament si l'usuari torna a escriure
        setIsSubmitted(false);
    };

    // Funció per gestionar l'enviament del formulari
    const handleSubmit = (e) => {
        e.preventDefault(); // EVITA el comportament per defecte de recàrrega del formulari

        // Aquí podríem afegir lògica de validació, però per ara només canviarem l'estat
        setIsSubmitted(true);

        // Opcional: Podríem fer un console.log(formData) per veure les dades
    };

    return (
        <div className="form-container">
            
            <form onSubmit={handleSubmit} className="registration-form">
                
                <div className="form-group">
                    <label htmlFor="nom">Nom:</label>
                    <input
                        type="text"
                        id="nom"
                        name="nom" // IMPORTANT: Coincideix amb la clau de l'estat
                        value={formData.nom} // Input controlat: el valor ve de l'estat
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="correu">Correu Electrònic:</label>
                    <input
                        type="email"
                        id="correu"
                        name="correu" // IMPORTANT: Coincideix amb la clau de l'estat
                        value={formData.correu} // Input controlat: el valor ve de l'estat
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="btn-submit">Registrar</button>
            </form>

            {/* Missatge de Benvinguda Condicional */}
            {isSubmitted && (
                <div className="welcome-message">
                    <h3>✅ Registre Completat!</h3>
                    <p>Benvingut/da, **{formData.nom}**.</p>
                    <p>Et registrarem a la newsletter a l'adreça: <span className="highlight-email">{formData.correu}</span></p>
                </div>
            )}
            
            {/* Opcional: Mostra les dades en temps real (per debug) */}
            <div className="real-time-data">
                <p>Nom en temps real: <span>{formData.nom}</span></p>
                <p>Correu en temps real: <span>{formData.correu}</span></p>
            </div>
            
        </div>
    );
}

export default RegistrationForm;