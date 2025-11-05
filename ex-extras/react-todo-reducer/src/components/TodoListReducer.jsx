import React, { useReducer, useState } from 'react';

// Dades inicials (per provar)
const initialTasks = [
    { id: 1, text: 'Planificar estructura de components', completed: true },
    { id: 2, text: 'Definir el Reducer i les Accions', completed: false },
    { id: 3, text: 'Maquetar el formulari d\'entrada', completed: false },
];

let nextId = 4; // Per assignar IDs úniques a les noves tasques

// L'estat és simplement l'array de tasques
const initialState = initialTasks;

function tasksReducer(tasks, action) {
    switch (action.type) {
        
        case 'ADD_TASK': {
            // Retorna un nou array: l'array antic + la nova tasca
            return [
                ...tasks,
                {
                    id: nextId++,
                    text: action.payload.text, // Obtenim el text del payload
                    completed: false,
                },
            ];
        }
        
        case 'DELETE_TASK': {
            // Retorna un nou array amb la tasca filtrada (eliminada)
            return tasks.filter(t => t.id !== action.payload.id);
        }
        
        case 'TOGGLE_TASK': {
            // Retorna un nou array on l'element modificat és una còpia amb 'completed' invertit
            return tasks.map(t => {
                if (t.id === action.payload.id) {
                    // Retorna un NOU objecte
                    return { ...t, completed: !t.completed }; 
                } else {
                    return t; // Retorna la tasca sense canvis
                }
            });
        }
        
        case 'CLEAR_COMPLETED': {
            // Retorna un nou array només amb les tasques no completades
            return tasks.filter(t => !t.completed);
        }

        default: {
            throw Error('Acció desconeguda: ' + action.type);
        }
    }
}

function TodoListReducer() {
    // Utilitzem useReducer per gestionar la llista de tasques
    const [tasks, dispatch] = useReducer(tasksReducer, initialState);
    
    // Estat local per al nou input (gestionat amb useState, ja que és un estat simple)
    const [taskText, setTaskText] = useState('');

    const handleAdd = (e) => {
        e.preventDefault();
        if (!taskText.trim()) return;

        // 1. Enviem l'acció ADD_TASK amb el text com a payload
        dispatch({
            type: 'ADD_TASK',
            payload: { text: taskText.trim() },
        });
        setTaskText('');
    };

    const handleClearCompleted = () => {
        // 2. Enviem l'acció simple CLEAR_COMPLETED
        dispatch({ type: 'CLEAR_COMPLETED' });
    };

    // 3. Funció per alternar l'estat d'una tasca (es passarà a cada ítem de la llista)
    const handleToggle = (taskId) => {
        dispatch({
            type: 'TOGGLE_TASK',
            payload: { id: taskId },
        });
    };

    // 4. Funció per eliminar una tasca (es passarà a cada ítem de la llista)
    const handleDelete = (taskId) => {
        dispatch({
            type: 'DELETE_TASK',
            payload: { id: taskId },
        });
    };
    
    // Comptadors
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.completed).length;

    return (
        <div className="todo-app-container">
            
            <form onSubmit={handleAdd} className="todo-form">
                <input
                    type="text"
                    placeholder="Quina tasca s'ha de fer?"
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                    className="task-input"
                />
                <button type="submit" className="btn-add">Afegir</button>
            </form>
            
            <div className="todo-stats">
                <span>Total: <b>{totalTasks}</b></span>
                <span>Completades: <b>{completedTasks}</b></span>
            </div>

            <ul className="task-list">
                {tasks.map(task => (
                    <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                        
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => handleToggle(task.id)}
                        />
                        <span className="task-text">{task.text}</span>
                        
                        <button onClick={() => handleDelete(task.id)} className="btn-delete">
                            🗑️
                        </button>
                    </li>
                ))}
            </ul>

            <button 
                onClick={handleClearCompleted} 
                className="btn-clear"
                disabled={completedTasks === 0}
            >
                Netejar Completades
            </button>

        </div>
    );
}

export default TodoListReducer;