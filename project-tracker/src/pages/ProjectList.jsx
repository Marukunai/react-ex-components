import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjectState, useProjectDispatch } from '../context/ProjectContext';
import ProjectCard from '../components/ProjectCard';
import Message from '../components/Message';

// El component JA NO REP CAP PROP
function ProjectList() { 
    const navigate = useNavigate();
    
    // 1. Obtenim l'estat i la lògica de fetching DIRECTAMENT del context
    const { 
        projects, 
        isLoadingInitial, 
        errorInitial 
    } = useProjectState(); 

    // 2. Obtenim només el DISPATCH (useProjectDispatch)
    const dispatch = useProjectDispatch();

    // Renderitzat d'estats de la càrrega inicial (ara des del Context)
    if (isLoadingInitial) return <Message type="loading" text="Carregant projectes inicials (via Context)..." />;
    if (errorInitial) return <Message type="error" text={`Error en la càrrega: ${errorInitial.message}`} />;
    
    // Funció CRUD: DELETE (Utilitza el dispatch del context)
    const handleDelete = (id) => {
        if (window.confirm(`Segur que vols eliminar el projecte ${id}?`)) {
            dispatch({ type: 'DELETE_PROJECT', payload: { id } });
        }
    };


    return (
        <div className="project-list-layout">
            <h3 className="list-count">Total de Projectes: <b>{projects.length}</b></h3>
            
            <div className="project-grid">
                {projects.map(project => (
                    <ProjectCard 
                        key={project.id} 
                        project={project}
                        onDelete={handleDelete}
                        onEdit={() => navigate(`/edit/${project.id}`)}
                    />
                ))}
            </div>
            
            {projects.length === 0 && (
                 <Message type="no-data" text="No hi ha projectes. Afegeix-ne un!" />
            )}
        </div>
    );
}

export default ProjectList;