import React from 'react';

const IMAGE_DIR = '/assets/testimonis/';

function Testimoni(props) {
    const { nom, esport, imatge, edat, institut, text } = props;

    // Construeix la ruta final de la imatge per al navegador
    const imagePath = `${IMAGE_DIR}${imatge}.jpg`;

    return (
        <div className="testimoni-card">
            
            <div className="header-testimoni">
                <img 
                    src={imagePath} // RUTA FINAL
                    alt={`Imatge de ${nom}`}
                    className="testimoni-img"
                />
                <div className="info-testimoni">
                    <h4 className="highlight-name">{nom} ({edat} anys)</h4>
                    <p>
                        <b>Esport:</b> {esport} | <b>Institut:</b> {institut}
                    </p>
                </div>
            </div>
            
            <p className="text-testimoni">
                "{text}"
            </p>
            
            <small>
                (Fitxer: {imatge}.jpg)
            </small>

        </div>
    );
}

export default Testimoni;