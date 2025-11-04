import React from 'react';
import ExpenseItem from './ExpenseItem';
import tripExpenses from '../data/budgetData'; 

function TripBudget() {
    
    // 1. Mapeig per crear la llista de despeses (les files de la taula)
    const expenseRows = tripExpenses.map(ex => (
        <ExpenseItem 
            key={ex.id} 
            expense={ex} 
        />
    ));

    // 2. Càlcul Opcional: Total del Viatge (amb REDUCE)
    const totalViatge = tripExpenses.reduce((acc, ex) => {
        // Import de la despesa = ex.costUnitari * ex.unitats
        return acc + (ex.costUnitari * ex.unitats);
    }, 0); 
    
    const totalViatgeFormatejat = totalViatge.toFixed(2);

    return (
        <div className="budget-list-container">
            <h3>Pressupost de Viatge</h3>
            
            <table className="budget-table">
                <thead>
                    <tr>
                        <th>Categoria</th>
                        <th>Concepte</th>
                        <th>Cost Unitari</th>
                        <th>Unitats</th>
                        <th>Import (€)</th>
                    </tr>
                </thead>
                <tbody>
                    {expenseRows}
                </tbody>
                <tfoot>
                    <tr className="table-footer">
                        <td colSpan="4">Total del Viatge</td>
                        <td className="highlight-total-viatge">{totalViatgeFormatejat} €</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}

export default TripBudget;