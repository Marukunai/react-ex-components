import React from 'react';
import GradeItem from './GradeItem';
import studentGrades from '../data/gradesData'; 

function GradeList() {
    
    // 1. Mapeig per crear la llista de components (les files de la taula)
    const gradeRows = studentGrades.map(grade => (
        <GradeItem 
            key={grade.id} 
            grade={grade} 
        />
    ));

    // 2. Càlcul Opcional: Mitjana General

    // a) Aconseguir totes les notes en un sol array pla (flat)
    const allNotes = studentGrades.flatMap(g => g.notes); // flatMap simplifica això

    // b) Càlcul de la suma i mitjana general amb reduce
    const totalSumaGeneral = allNotes.reduce((acc, nota) => acc + nota, 0);
    const mitjanaGeneral = totalSumaGeneral / allNotes.length;
    const mitjanaGeneralFormatejada = isNaN(mitjanaGeneral) ? 'N/A' : mitjanaGeneral.toFixed(2);
    
    // Utilitzem una classe CSS per la fila de la mitjana
    const finalClass = mitjanaGeneral >= 5 ? 'status-aprovat' : 'status-suspes';


    return (
        <div className="grade-list-container">
            <h3>Butlletí de Notes</h3>
            
            <table className="grades-table">
                <thead>
                    <tr>
                        <th>Assignatura</th>
                        <th>Notes</th>
                        <th>Mitjana</th>
                        <th>Estat</th>
                    </tr>
                </thead>
                <tbody>
                    {gradeRows}
                </tbody>
                <tfoot>
                    <tr className="table-footer">
                        <td colSpan="2">Mitjana General</td>
                        <td className={`highlight-mitjana ${finalClass}`}>{mitjanaGeneralFormatejada}</td>
                        <td className={`highlight-mitjana ${finalClass}`}>{mitjanaGeneral >= 5 ? 'APROVAT' : 'SUSPÈS'}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}

export default GradeList;