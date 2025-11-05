import React, { useState } from 'react';

function Product({ product }) {
    // 1. Estat local per gestionar la visibilitat dels detalls només d'aquest producte
    const [isDetailsVisible, setIsDetailsVisible] = useState(false);

    const handleToggleDetails = () => {
        setIsDetailsVisible(!isDetailsVisible);
    };

    return (
        // L'element sencer es pot fer clicable per simplicitat
        <li className="product-item" onClick={handleToggleDetails}>
            
            {/* 2. Secció Principal (Sempre Visible) */}
            <div className="product-header">
                <p className="product-name">
                    {product.nom}
                </p>
                <p className="product-price">
                    {product.preu.toFixed(2)} €
                </p>
                <span className="toggle-icon">
                    {isDetailsVisible ? '▲' : '▼'}
                </span>
            </div>

            {/* 3. Secció de Detalls (Renderitzat Condicional) */}
            {isDetailsVisible && (
                <div className="product-details-content">
                    <p>
                        <b>Descripció:</b> {product.descripcio}
                    </p>
                    <p>
                        <b>Categoria:</b> {product.categoria}
                    </p>
                </div>
            )}
        </li>
    );
}

export default Product;