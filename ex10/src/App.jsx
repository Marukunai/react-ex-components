import React, { useState } from 'react';

// Variables per generar IDs únics (simulant una DB)
let nextId = 0; 

function App() {
    // Estat per guardar el text del nou input de tasca
    const [taskText, setTaskText] = useState(''); 
    
    // Estat que conté l'Array de totes les tasques
    const [tasks, setTasks] = useState([]); 

    // 1. Funció per afegir una tasca
    const handleAddTask = (e) => {
        e.preventDefault();
        
        if (!taskText.trim()) return; // Evita afegir tasques buides

        const newTaskList = [
            ...tasks, // 🅰️ Copia totes les tasques existents
            {           // 🅱️ Afegeix el nou objecte
                id: nextId++,
                text: taskText,
                done: false,
            },
        ];
        
        setTasks(newTaskList); // Actualitza l'estat amb el nou array
        setTaskText('');       // Neteja l'input
    };

    // 2. Funció per marcar una tasca com a feta/pendent (Toggle)
    const handleToggleTask = (id) => {
        // Mapegem l'array existent per trobar i modificar només l'ítem amb l'ID donat
        const updatedTasks = tasks.map(task => {
            if (task.id === id) {
                // Copiem l'objecte i invertim el valor 'done'
                return { ...task, done: !task.done };
            }
            return task; // Retorna la tasca sense canvis
        });
        
        setTasks(updatedTasks);
    };

    // 3. Funció per eliminar una tasca (filter)
    const handleDeleteTask = (id) => {
        // Uilitem filter per crear un nou array que exclou l'ítem amb l'ID donat
        const filteredTasks = tasks.filter(task => task.id !== id);
        setTasks(filteredTasks);
    };


    return (
        <div className="exercise-container">
            <div className="exercise-box">
                <h2>Exercici Llista de Tasques (To-Do List)</h2>
                
                {/* Formulari per afegir tasques */}
                <form onSubmit={handleAddTask} className="task-form">
                    <input
                        type="text"
                        placeholder="Afegeix una nova tasca..."
                        value={taskText}
                        onChange={(e) => setTaskText(e.target.value)} // Input controlat
                        className="task-input"
                    />
                    <button type="submit" className="btn-add">Agregar</button>
                </form>

                {/* Llista de Tasques */}
                <ul className="task-list">
                    {tasks.length === 0 ? (
                        <p className="empty-message">No hi ha tasques pendents!</p>
                    ) : (
                        tasks.map(task => (
                            <li 
                                key={task.id} 
                                className={`task-item ${task.done ? 'completed' : ''}`}
                            >
                                {/* Clic a la tasca per fer el Toggle */}
                                <span 
                                    onClick={() => handleToggleTask(task.id)} 
                                    className="task-text"
                                >
                                    {task.text}
                                </span>
                                
                                <button 
                                    onClick={() => handleDeleteTask(task.id)} 
                                    className="btn-delete"
                                >
                                    ❌
                                </button>
                            </li>
                        ))
                    )}
                </ul>

            </div>
        </div>
    );
}

export default App;