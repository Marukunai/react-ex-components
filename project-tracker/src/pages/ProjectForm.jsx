import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createNewProject } from '../api/projectApi'; 
import Message from '../components/Message';

// El component rep els projectes (per editar) i el dispatch (per actualitzar)
function ProjectForm({ projects, dispatch }) {
    const { id } = useParams();
    const isEditMode = !!id;
    const navigate = useNavigate();
    
    // Trobar el projecte si estem en mode edició
    const projectToEdit = isEditMode ? projects.find(p => p.id.toString() === id) : null;
    
    // Estat del formulari amb dades inicials
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
            // CRUD: UPDATE
            // SIMULACIÓ API
            
            // Actualització de l'estat amb useReducer
            dispatch({ 
                type: 'UPDATE_PROJECT', 
                payload: { id: projectToEdit.id, updates: formData } 
            });
            console.log(`CRUD: Projecte ${id} actualitzat localment.`);

        } else {
            // CRUD: CREATE
            const newProject = await createNewProject(formData); // Crida a l'API (simulada)
            
            // Actualització de l'estat amb useReducer
            dispatch({ type: 'ADD_PROJECT', payload: newProject }); 

            console.log("CRUD: Nou projecte creat i afegit localment.");
        }
        
        setFormLoading(false);
        navigate('/'); // Tornar a la llista
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