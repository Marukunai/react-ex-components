import React from 'react';

function GradeItem(props) {
    const { assignatura, notes } = props.grade; 

    // 1. Càlcul de la Mitjana (utilitzant reduce)
    const sumaNotes = notes.reduce((acc, nota) => acc + nota, 0);
    const mitjana = sumaNotes / notes.length;
    const mitjanaFormatejada = mitjana.toFixed(2);

    // 2. Determinació de l'Estat
    const isAprovat = mitjana >= 5;
    const estat = isAprovat ? 'Aprovat' : 'Suspès';

    // Utilitzem una classe CSS per canviar el color de l'estat
    const estatClass = isAprovat ? 'status-aprovat' : 'status-suspes';

    // Converteix l'array de notes en una cadena separada per comes
    const notesString = notes.join(', ');

    return (
        <tr className={estatClass}>
            <td>{assignatura}</td>
            <td>{notesString}</td>
            <td>{mitjanaFormatejada}</td>
            <td>
                <span className={estatClass}>{estat}</span>
            </td>
        </tr>
    );
}

export default GradeItem;