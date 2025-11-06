import React, { 
    createContext, 
    useReducer, 
    useContext, 
    useEffect,
    useMemo
} from 'react';
import { projectReducer } from '../reducer/projectReducer';
import { useFetch } from '../hooks/useFetch';

const API_PROJECTS_URL = 'https://jsonplaceholder.typicode.com/posts?_limit=20';


// 1. Creació dels DOS Contexts
// Context de l'Estat (per a la Lectura)
export const ProjectStateContext = createContext(undefined); 
// Context del Dispatch (per a l'Escriptura/Modificació)
export const ProjectDispatchContext = createContext(undefined); 


/**
 * Custom Hook per accedir ràpidament a l'ESTAT (Lectura)
 * Llença un error si no s'utilitza dins del Provider.
 */
export const useProjectState = () => {
    const context = useContext(ProjectStateContext);
    if (context === undefined) {
        throw new Error('useProjectState ha de ser utilitzat dins de ProjectProvider');
    }
    return context;
};

/**
 * Custom Hook per accedir ràpidament al DISPATCH (Escriptura/Accions)
 * Llença un error si no s'utilitza dins del Provider.
 */
export const useProjectDispatch = () => {
    const context = useContext(ProjectDispatchContext);
    if (context === undefined) {
        throw new Error('useProjectDispatch ha de ser utilitzat dins de ProjectProvider');
    }
    return context;
};


// 2. Component Provider (Conté la Lògica i exposa els dos valors)
export function ProjectProvider({ children }) {
    
    // A. Lògica d'Estat i Fetching (Idèntica a l'anterior)
    const [projects, dispatch] = useReducer(projectReducer, []);
    const { 
        data: initialData, 
        isLoading: isLoadingInitial, 
        error: errorInitial 
    } = useFetch(API_PROJECTS_URL);

    // C. Sincronització: (Idèntica a l'anterior)
    useEffect(() => {
        if (initialData && projects.length === 0) {
            console.log("Context: Sincronitzant dades inicials de l'API a l'Estat Global.");
            const normalizedData = initialData.map(item => ({
                id: item.id,
                title: item.title.substring(0, 30),
                description: item.body.substring(0, 100) + '...',
                status: item.id % 3 === 0 ? 'Completat' : (item.id % 2 === 0 ? 'En Progrés' : 'Pendent'),
            }));
            dispatch({ type: 'SET_PROJECTS', payload: normalizedData });
        }
    }, [initialData, projects.length]);


    // 3. Valor de l'ESTAT (useMemo per evitar re-creació innecessària de l'objecte)
    const stateValue = useMemo(() => ({
        projects,
        isLoadingInitial,
        errorInitial,
    }), [projects, isLoadingInitial, errorInitial]);


    // 4. Retorn del Provider amb els dos Contexts imbricats
    return (
        // El Dispatch NO canvia mai, així que es dóna una sola vegada
        <ProjectDispatchContext.Provider value={dispatch}> 
            {/* L'Estat canvia amb cada actualització de projects */}
            <ProjectStateContext.Provider value={stateValue}>
                {children}
            </ProjectStateContext.Provider>
        </ProjectDispatchContext.Provider>
    );
}