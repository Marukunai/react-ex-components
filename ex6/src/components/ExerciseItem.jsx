import React from 'react';

function ExerciseItem(props) {
    const { exercici, series, repeticions, pes } = props.exercise; 

    // 1. Càlcul del Volum: sèries * repeticions * pes
    const volum = series * repeticions * pes;
    const volumFormatejat = volum.toFixed(2); 

    return (
        <tr>
            <td>{exercici}</td>
            <td>{series}</td>
            <td>{repeticions}</td>
            <td>{pes} kg</td>
            <td className="volum-item">{volumFormatejat} kg</td>
        </tr>
    );
}

export default ExerciseItem;