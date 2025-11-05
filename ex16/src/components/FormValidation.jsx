import React, { useState } from 'react';

// Constantes per als estats de validació
const STATUS_INITIAL = 0;
const STATUS_SUCCESS = 1;
const STATUS_ERROR = 2;

function FormValidation() {
    // 1. Estat per als inputs (Nom i Correu)
    const [formData, setFormData] = useState({
        nom: '',
        correu: '',
    });

    // 2. Estat per a l'estat de la validació (0: Inicial, 1: Èxit, 2: Error)
    const [validationStatus, setValidationStatus] = useState(STATUS_INITIAL);

    // Gestor de canvis als inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Reinicialitzem l'estat en escriure per netejar el missatge anterior
        setValidationStatus(STATUS_INITIAL); 
    };

    // Gestor de l'enviament del formulari
    const handleSubmit = (e) => {
        e.preventDefault(); 

        const { nom, correu } = formData;

        // 3. Lògica de Validació
        if (!nom.trim() || !correu.trim()) {
            // Si falta el nom O el correu
            setValidationStatus(STATUS_ERROR);
        } else {
            // Si tots dos estan plens
            setValidationStatus(STATUS_SUCCESS);
            
            // Opcional: Netejar el formulari
            // setFormData({ nom: '', correu: '' });
        }
    };

    // Funció de Renderitzat Condicional del Missatge
    const renderValidationMessage = () => {
        if (validationStatus === STATUS_SUCCESS) {
            return (
                <p className="message-text message-success">
                    ✅ <b>Formulari enviat amb èxit!</b>
                </p>
            );
        } else if (validationStatus === STATUS_ERROR) {
            return (
                <p className="message-text message-error">
                    ❌ <b>Falten dades</b>. Si us plau, omple tots els camps.
                </p>
            );
        }
        return null; // No mostrar res si és STATUS_INITIAL
    };

    return (
        <div className="validation-container">
            
            <form onSubmit={handleSubmit} className="validation-form">
                
                <div className="form-group">
                    <label htmlFor="nom">Nom:</label>
                    <input
                        type="text"
                        id="nom"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                        placeholder="Introdueix el teu nom"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="correu">Correu Electrònic:</label>
                    <input
                        type="email"
                        id="correu"
                        name="correu"
                        value={formData.correu}
                        onChange={handleChange}
                        placeholder="Introdueix el teu correu"
                    />
                </div>

                <button type="submit" className="btn-submit-validate">Enviar</button>
            </form>

            {/* Missatge de validació (Renderitzat condicional) */}
            <div className="validation-message-box">
                {renderValidationMessage()}
            </div>
            
        </div>
    );
}

export default FormValidation;