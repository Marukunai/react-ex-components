import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProjectState } from '../context/ProjectContext';
import Message from '../components/Message';

// El component JA NO REP CAP PROP
function ProjectDetail() { 
    const { id } = useParams();
    
    // 1. Obtenim 'projects' DIRECTAMENT de l'estat
    const { projects } = useProjectState(); 
    
    // Cercar el projecte a l'estat global (Lectura)
    const project = projects.find(p => p.id.toString() === id);

    if (!project) return <Message type="error" text={`Projecte amb ID ${id} no trobat a l'estat global.`} />;

    return (
        <div className="project-detail-view">
            <h3>Detall del Projecte #{project.id}</h3>
            
            <div className="detail-box">
                <h4 className="detail-title">{project.title}</h4>
                <p className="detail-status">Estat: 
                    <span className={`status-tag ${project.status.toLowerCase().replace(' ', '-')}`}>
                        {project.status}
                    </span>
                </p>
                <p className="detail-description">{project.description}</p>
            </div>
            
            <Link to={`/edit/${project.id}`} className="btn btn-detail-edit">Editar</Link>
            <Link to="/" className="btn btn-back">Tornar a la Llista</Link>
        </div>
    );
}

export default ProjectDetail;