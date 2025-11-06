import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createNewProject } from '../api/projectApi'; 
import { useProjectContext } from '../context/ProjectContext'; // Importem el hook
import Message from '../components/Message';

// El component JA NO REP CAP PROP
function ProjectForm() {
    
    // 1. Obtenim 'projects' i 'dispatch' DIRECTAMENT del Context
    const { projects, dispatch } = useProjectContext(); 
    
    const { id } = useParams();
    const isEditMode = !!id;
    const navigate = useNavigate();
    
    // Trobar el projecte a l'estat global
    const projectToEdit = isEditMode ? projects.find(p => p.id.toString() === id) : null;
    
    // [Resta del component és idèntic, ja que utilitza 'dispatch' i 'projectToEdit' correctament]
    
    const [formData, setFormData] = useState({
        title: projectToEdit?.title || '',
        description: projectToEdit?.description || '',
        status: projectToEdit?.status || 'Pendent',
    });
    const [formLoading, setFormLoading] = useState(false);

    // useRef per enfocar
    const titleRef = useRef(null);

    // Enfocament
    useEffect(() => {
        titleRef.current.focus();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormLoading(true);

        if (isEditMode) {
            // CRUD: UPDATE (Utilitza el dispatch del context)
            dispatch({ 
                type: 'UPDATE_PROJECT', 
                payload: { id: projectToEdit.id, updates: formData } 
            });
            console.log(`Context: Projecte ${id} actualitzat a l'estat global.`);

        } else {
            // CRUD: CREATE (Utilitza el dispatch del context)
            const newProject = await createNewProject(formData);
            dispatch({ type: 'ADD_PROJECT', payload: newProject }); 

            console.log("Context: Nou projecte creat i afegit a l'estat global.");
        }
        
        setFormLoading(false);
        navigate('/');
    };
    
    if (isEditMode && !projectToEdit) {
        return <Message type="error" text={`No s'ha trobat el projecte amb ID ${id} per editar.`} />;
    }
    
    return (
        <div className="project-form-container">
            <h3>{isEditMode ? '🖊️ Editar Projecte' : '➕ Nou Projecte'}</h3>
            
            {formLoading && <Message type="loading" text="Enviant dades..." />}

            <form onSubmit={handleSubmit} className="project-form">
                
                <label>Títol del Projecte</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    ref={titleRef} 
                    required
                />
                
                <label>Descripció</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
                
                {isEditMode && (
                    <>
                        <label>Estat</label>
                        <select name="status" value={formData.status} onChange={handleChange}>
                            <option value="Pendent">Pendent</option>
                            <option value="En Progrés">En Progrés</option>
                            <option value="Completat">Completat</option>
                        </select>
                    </>
                )}

                <button 
                    type="submit" 
                    className={`btn-submit ${isEditMode ? 'btn-update' : 'btn-create'}`}
                    disabled={formLoading}
                >
                    {isEditMode ? 'Actualitzar Projecte' : 'Crear Projecte'}
                </button>
            </form>
        </div>
    );
}

export default ProjectForm;