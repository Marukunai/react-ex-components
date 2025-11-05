import React from 'react';
import Product from './Product';
import { initialProducts } from '../data/products'; // Importem les dades

function ProductList() {
    return (
        <div className="product-list-container">
            <h3>Fes clic en un producte per veure'n els detalls:</h3>
            
            <ul className="product-list">
                {/* Fem el map de les dades per crear un component Product per cada element */}
                {initialProducts.map(product => (
                    <Product 
                        key={product.id} // La clau és crucial per a les llistes
                        product={product} 
                    />
                ))}
            </ul>
        </div>
    );
}

export default ProductList;