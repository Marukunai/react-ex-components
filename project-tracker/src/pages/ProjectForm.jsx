import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNewProject } from '../api/projectApi'; 
import { useProjectState, useProjectDispatch } from '../context/ProjectContext';
import Message from '../components/Message';

function ProjectForm() {
    
    // 1. Lectura de l'Estat Global (Projecte a editar)
    const { projects } = useProjectState(); 
    
    // 2. Escriptura de l'Estat Global (dispatch per afegir/editar)
    const dispatch = useProjectDispatch();
    
    const { id } = useParams();
    const isEditMode = !!id;
    const navigate = useNavigate();
    
    // Trobar el projecte a l'estat global
    const projectToEdit = isEditMode ? projects.find(p => p.id.toString() === id) : null;
    
    // Lògica de l'Estat Local del Formulari
    const [formData, setFormData] = useState({
        title: projectToEdit?.title || '',
        description: projectToEdit?.description || '',
        status: projectToEdit?.status || 'Pendent',
    });
    
    // Inicialitzem useQueryClient (encara que aquí no l'utilitzem per invalidar, és bona pràctica)
    const queryClient = useQueryClient();

    // 3. Mutació de React Query per a la CREACIÓ (l'acció asíncrona)
    const createProjectMutation = useMutation({
        mutationFn: createNewProject, // La funció API asíncrona
        onSuccess: (newProject) => {
            console.log("RQ Mutation: Projecte creat amb èxit. Actualitzant useReducer.");
            
            // Un cop la crida API és exitosa, actualitzem l'estat useReducer
            dispatch({ type: 'ADD_PROJECT', payload: newProject }); 

            navigate('/'); // Redirigir després de l'èxit
        },
        onError: (error) => {
             console.error("RQ Mutation Error:", error);
             // Aquí podríem mostrar un missatge d'error a l'usuari
        }
    });

    // Usem l'estat de la mutació per controlar la càrrega
    const formLoading = createProjectMutation.isPending; 
    
    const titleRef = useRef(null);

    useEffect(() => {
        titleRef.current.focus();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (isEditMode) {
            // CRUD: UPDATE (Acció Síncrona) - Directament a useReducer, ja que simulem l'èxit de l'API.
            dispatch({ 
                type: 'UPDATE_PROJECT', 
                payload: { id: projectToEdit.id, updates: formData } 
            });
            console.log(`Context: Projecte ${id} actualitzat a l'estat global.`);
            navigate('/');
        } else {
            // CRUD: CREATE (Acció Asíncrona) - Deleguem a useMutation
            // El mutate cridarà a createNewProject(formData) i gestionarà l'estat de càrrega.
            createProjectMutation.mutate(formData);
        }
    };
    
    if (isEditMode && !projectToEdit) {
        return <Message type="error" text={`No s'ha trobat el projecte amb ID ${id} per editar.`} />;
    }
    
    return (
        <div className="project-form-container">
            <h3>{isEditMode ? '🖊️ Editar Projecte' : '➕ Nou Projecte'}</h3>
            
            {/* Utilitzem l'estat isPending de React Query */}
            {formLoading && <Message type="loading" text="Enviant dades (via React Query)..." />}
            {createProjectMutation.isError && <Message type="error" text="Error en crear el projecte! Torna-ho a intentar." />}

            <form onSubmit={handleSubmit} className="project-form">
                
                {/* ... (camps del formulari) ... */}
                {/* CORRECCIÓ 1: Títol - Afegim htmlFor i id */}
                <label htmlFor="title">Títol del Projecte</label>
                <input
                    id="title"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    ref={titleRef} 
                    required
                />
                
                {/* CORRECCIÓ 2: Descripció - Afegim htmlFor i id */}
                <label htmlFor="description">Descripció</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
                
                {isEditMode && (
                    <>
                        {/* CORRECCIÓ 3: Estat - Afegim htmlFor i id */}
                        <label htmlFor="status">Estat</label>
                        <select 
                            id= "status"
                            name="status" 
                            value={formData.status} 
                            onChange={handleChange}
                        >
                            <option value="Pendent">Pendent</option>
                            <option value="En Progrés">En Progrés</option>
                            <option value="Completat">Completat</option>
                        </select>
                    </>
                )}

                <button 
                    type="submit" 
                    className={`btn-submit ${isEditMode ? 'btn-update' : 'btn-create'}`}
                    disabled={formLoading} // Controlat per useMutation.isPending
                >
                    {isEditMode ? 'Actualitzar Projecte' : 'Crear Projecte'}
                </button>
            </form>
        </div>
    );
}

export default ProjectForm;