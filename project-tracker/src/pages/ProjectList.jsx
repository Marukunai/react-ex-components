import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import ProjectCard from '../components/ProjectCard';
import Message from '../components/Message';

const API_PROJECTS_URL = 'https://jsonplaceholder.typicode.com/posts';

// El component rep l'estat i el dispatch com a props!
function ProjectList({ projects, dispatch }) { 
    const navigate = useNavigate();
    
    // useFetch per a la càrrega inicial de dades (Només Lectura)
    // Utilitzem un Custom Hook + useFetch
    const { data, isLoading, error } = useFetch(API_PROJECTS_URL + '?_limit=20'); 

    // 1. Sincronitzar: Quan data (del fetch) canvia, actualitzem l'estat local (useReducer)
    useEffect(() => {
        if (data && projects.length === 0) { // Només carregar la primera vegada
            // Normalització i dispatch (Completat/En Progrés/Pendent)
            const normalizedData = data.map(item => ({
                id: item.id,
                title: item.title.substring(0, 30),
                description: item.body.substring(0, 100) + '...',
                status: item.id % 3 === 0 ? 'Completat' : (item.id % 2 === 0 ? 'En Progrés' : 'Pendent'),
            }));
            dispatch({ type: 'SET_PROJECTS', payload: normalizedData });
        }
    }, [data, dispatch, projects.length]);

    // Funció CRUD: DELETE
    const handleDelete = (id) => {
        if (window.confirm(`Segur que vols eliminar el projecte ${id}?`)) {
            // SIMULACIÓ API: Aquí aniria la crida DELETE, que retornaria èxit.
            
            // Actualització de l'estat local amb useReducer
            dispatch({ type: 'DELETE_PROJECT', payload: { id } });
        }
    };


    // Renderitzat d'estats de la càrrega inicial
    if (isLoading) return <Message type="loading" text="Carregant projectes inicials..." />;
    if (error) return <Message type="error" text={`Error en la càrrega: ${error}`} />;
    
    return (
        <div className="project-list-layout">
            <h3 className="list-count">Total de Projectes: <b>{projects.length}</b></h3>
            
            <div className="project-grid">
                {projects.map(project => (
                    <ProjectCard 
                        key={project.id} 
                        project={project}
                        onDelete={handleDelete}
                        // Navegació a la ruta d'edició
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