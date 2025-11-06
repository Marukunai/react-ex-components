import React from 'react';
import { Link } from 'react-router-dom';

function ProjectCard({ project, onDelete, onEdit }) {
    
    // Class dinàmica basada en l'estat
    const statusClass = project.status.toLowerCase().replace(' ', '-');

    return (
        <div className={`project-card ${statusClass}`}>
            <div className="card-header">
                <span className={`status-tag ${statusClass}`}>{project.status}</span>
                <h4 className="project-title">{project.title}</h4>
            </div>
            
            <p className="project-description">{project.description}</p>
            
            <div className="card-actions">
                {/* 1. Ruta de Detall Dinàmica (Llegir) */}
                <Link to={`/detail/${project.id}`} className="btn btn-view">Veure</Link>
                
                {/* 2. Botó d'Edició (Ruta Dinàmica) */}
                <button onClick={onEdit} className="btn btn-edit">Editar</button>
                
                {/* 3. Botó d'Eliminació (useReducer) */}
                <button onClick={() => onDelete(project.id)} className="btn btn-delete">Eliminar</button>
            </div>
        </div>
    );
}

export default ProjectCard;