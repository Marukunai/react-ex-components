import React, { 
    createContext, 
    useReducer, 
    useContext, 
    useEffect,
    useMemo
} from 'react';
import { useQuery } from '@tanstack/react-query';
import { projectReducer } from '../reducer/projectReducer';

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
    
    const [projects, dispatch] = useReducer(projectReducer, []);
    
    // 3. Lògica de Fetching amb React Query: useQuery
    const { 
        data: initialData, 
        isLoading: isLoadingInitial, 
        isError: isErrorInitial, // Utilitzem isError de RQ
        error: errorInitial 
    } = useQuery({
        // Clau única per a la cache. Si les dades del context canvien, no és necessari tornar-ho a carregar.
        queryKey: ['initialProjects'], 
        // Funció per obtenir les dades (retorna una Promise)
        queryFn: async () => {
             const response = await fetch(API_PROJECTS_URL);
             if (!response.ok) throw new Error('Error al carregar les dades de l’API.');
             return response.json();
        },
        // Opcions: Només executar la query una vegada.
        staleTime: Infinity, // Marcar les dades com a "fresques" indefinidament.
        refetchOnWindowFocus: false, // Opcionalment desactivem el refetch automàtic.
    });


    // 4. Sincronització: UseEffect (NOMÉS per a la càrrega inicial)
    // Utilitzem un missatge de dispatch CONDICIONAL per establir l'estat useReducer un cop.
    React.useEffect(() => {
        if (initialData && projects.length === 0) { 
            console.log("RQ: Dades rebudes. Sincronitzant a l'Estat Global (useReducer).");

            const normalizedData = initialData.map(item => ({
                id: item.id,
                title: item.title.substring(0, 30),
                description: item.body.substring(0, 100) + '...',
                status: item.id % 3 === 0 ? 'Completat' : (item.id % 2 === 0 ? 'En Progrés' : 'Pendent'),
            }));
            
            // Dispatch inicial
            dispatch({ type: 'SET_PROJECTS', payload: normalizedData });
        }
    }, [initialData, projects.length, dispatch]); // Afegim dispatch a les dependencies

    const stateValue = useMemo(() => ({
        projects,
        isLoadingInitial,
        errorInitial,
        isErrorInitial // Incloem isErrorInitial de React Query
    }), [projects, isLoadingInitial, errorInitial, isErrorInitial]);

    return (
        <ProjectDispatchContext.Provider value={dispatch}> 
            <ProjectStateContext.Provider value={stateValue}>
                {children}
            </ProjectStateContext.Provider>
        </ProjectDispatchContext.Provider>
    );
}