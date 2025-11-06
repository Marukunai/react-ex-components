import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { projectReducer } from '../reducer/projectReducer';
import { useFetch } from '../hooks/useFetch';

// URL de l'API per a la càrrega inicial (fins a 20 ítems)
const API_PROJECTS_URL = 'https://jsonplaceholder.typicode.com/posts?_limit=20';

// 1. Creació del Context: Contindrà l'Estat (projects) i les Accions (dispatch)
// Utilitzem un valor inicial per defecte (que realment s'ignora quan es fa servir el Provider)
export const ProjectContext = createContext({
    projects: [],
    dispatch: () => null, // Funció buida per defecte
    isLoadingInitial: true,
    errorInitial: null,
});

/**
 * Custom Hook per accedir ràpidament al Context
 * Això simplifica la importació en els components.
 */
export const useProjectContext = () => {
    return useContext(ProjectContext);
};

// 2. Component Provider: Conté la Lògica de useReducer i useFetch
export function ProjectProvider({ children }) {
    
    // A. Lògica d'Estat: useReducer
    const [projects, dispatch] = useReducer(projectReducer, []);
    
    // B. Lògica de Fetching Inicial: useFetch (Custom Hook)
    const { 
        data: initialData, 
        isLoading: isLoadingInitial, 
        error: errorInitial 
    } = useFetch(API_PROJECTS_URL);

    // C. Sincronització: Carregar dades de l'API a l'estat useReducer només un cop.
    useEffect(() => {
        if (initialData && projects.length === 0) {
            
            console.log("Context: Sincronitzant dades inicials de l'API a l'Estat Global.");

            // Normalització de les dades (Igual que a ProjectList.jsx abans)
            const normalizedData = initialData.map(item => ({
                id: item.id,
                title: item.title.substring(0, 30),
                description: item.body.substring(0, 100) + '...',
                status: item.id % 3 === 0 ? 'Completat' : (item.id % 2 === 0 ? 'En Progrés' : 'Pendent'),
            }));
            
            // Dispatch inicial per establir l'estat
            dispatch({ type: 'SET_PROJECTS', payload: normalizedData });
        }
    }, [initialData, projects.length]);


    // 3. Valor del Context: L'objecte que s'exposarà a tota l'aplicació
    const contextValue = {
        projects,
        dispatch,
        isLoadingInitial,
        errorInitial,
    };

    // 4. Retorn del Provider amb el valor
    return (
        <ProjectContext.Provider value={contextValue}>
            {children}
        </ProjectContext.Provider>
    );
}