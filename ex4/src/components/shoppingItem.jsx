import React from 'react';

function ShoppingItem(props) {
    const { tipus, nom, preu, quantitat } = props.item; // Rebem l'objecte sencer com a 'item' prop

    // Càlcul del total de l'ítem
    const totalItem = (preu * quantitat).toFixed(2);

    return (
        <li>
            <div className="item-details">
                <span className="tipus">[{tipus}]</span>
                <span className="nom highlight">{nom}</span>
                
                <div className="details-group">
                    <span>Preu: {preu.toFixed(2)}€/unitat</span>
                    <span>Quantitat: {quantitat}</span>
                    <span className="total-item">Total: <strong className="highlight">{totalItem}€</strong></span>
                </div>
            </div>
        </li>
    );
}

export default ShoppingItem;