import React from 'react';
import ExerciseItem from './ExerciseItem';
import workoutExercises from '../data/workoutData'; 

function WorkoutList() {
    
    // 1. Mapeig per crear la llista de components (les files de la taula)
    const exerciseRows = workoutExercises.map(ex => (
        <ExerciseItem 
            key={ex.id} 
            exercise={ex} 
        />
    ));

    // 2. Càlcul Opcional: Volum Total de la Sessió (amb REDUCE)
    const volumTotal = workoutExercises.reduce((acc, ex) => {
        // Volum de l'ítem = ex.series * ex.repeticions * ex.pes
        return acc + (ex.series * ex.repeticions * ex.pes);
    }, 0); 
    
    const volumTotalFormatejat = volumTotal.toFixed(2);

    return (
        <div className="workout-list-container">
            <h3>Rutina d'Entrenament: Dia de Força</h3>
            
            <table className="workout-table">
                <thead>
                    <tr>
                        <th>Exercici</th>
                        <th>Sèries</th>
                        <th>Repeticions</th>
                        <th>Pes (kg)</th>
                        <th>Volum (kg)</th>
                    </tr>
                </thead>
                <tbody>
                    {exerciseRows}
                </tbody>
                <tfoot>
                    <tr className="table-footer">
                        <td colSpan="4">Volum Total de la Sessió</td>
                        <td className="highlight-volum-total">{volumTotalFormatejat} kg</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}

export default WorkoutList;