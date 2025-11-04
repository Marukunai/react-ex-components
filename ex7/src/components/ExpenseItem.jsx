import React from 'react';

function ExpenseItem(props) {
    const { categoria, concepte, costUnitari, unitats } = props.expense; 

    // 1. Càlcul de l'Import: costUnitari * unitats
    const importTotal = costUnitari * unitats;
    const importFormatejat = importTotal.toFixed(2); 

    // Format moneda
    const costUnitariFormatejat = costUnitari.toFixed(2) + ' €';

    return (
        <tr>
            <td className="categoria-cell">{categoria}</td>
            <td>{concepte}</td>
            <td>{costUnitariFormatejat}</td>
            <td>{unitats}</td>
            <td className="import-cell highlight">{importFormatejat} €</td>
        </tr>
    );
}

export default ExpenseItem;