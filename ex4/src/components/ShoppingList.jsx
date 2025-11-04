import React from 'react';
import ShoppingItem from './shoppingItem';
import shoppingItems from '../data/shoppingData'; // Importem l'array de dades

function ShoppingList() {
    // 1. Mapeig per crear la llista de components
    const listItems = shoppingItems.map(item => (
        <ShoppingItem 
            key={item.id} // Clau única per a la llista
            item={item}   // Passem l'objecte sencer com a prop
        />
    ));

    // 2. Càlcul del Total Final utilitzant REDUCE
    const totalFinal = shoppingItems.reduce((acumulador, item) => {
        // Acumula (acc) el total de cada ítem (preu * quantitat)
        return acumulador + (item.preu * item.quantitat);
    }, 0); // El '0' és el valor inicial de l'acumulador

    return (
        <div className="shopping-list-container">
            <h3>Llista de la Compra</h3>
            
            <ul className="list-group">
                {listItems}
            </ul>

            <div className="total-bar">
                <p>
                    <b>Total Pressupostat:</b> <span className="highlight-total">{totalFinal.toFixed(2)}€</span>
                </p>
            </div>
        </div>
    );
}

export default ShoppingList;