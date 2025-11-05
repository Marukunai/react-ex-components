import React, { useState } from 'react';

function ToggleMessage() {
    // 1. Estat Booleà per controlar la visibilitat
    const [isVisible, setIsVisible] = useState(false); // S'inicia com a ocult

    // 2. Funció per alternar l'estat (Toggle)
    const handleToggle = () => {
        // Inverteix el valor actual de l'estat
        setIsVisible(!isVisible); 
    };

    // 3. Text i classes del botó dinàmic
    const buttonText = isVisible ? 'Ocultar missatge' : 'Mostrar missatge';
    const buttonClass = isVisible ? 'btn-toggle btn-hide' : 'btn-toggle btn-show';

    return (
        <div className="toggle-container">
            
            <button 
                onClick={handleToggle} 
                className={buttonClass}
            >
                {buttonText}
            </button>

            <hr />
            
            {/* 4. Renderitzat Condicional amb && (Si isVisible és true, renderitza el <div>) */}
            {isVisible && (
                <div className="message-box">
                    <p>
                        <b>¡Hola, React!</b> Estic controlat pel teu estat (`useState`)!
                    </p>
                </div>
            )}
            
            {/* Opcional: Renderitzat condicional amb un Ternari (Mostra A si és true, B si és false) */}
            {/* <p className="status-text">
                Estat: {isVisible ? "Visible" : "Ocult"}
            </p> */}

        </div>
    );
}

export default ToggleMessage;