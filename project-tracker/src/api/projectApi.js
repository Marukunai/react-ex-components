const BASE_URL = 'https://jsonplaceholder.typicode.com/posts'; // Simula una llista de projectes

let lastApiId = 20; // Últim ID carregat
let nextLocalId = lastApiId + 1;

export const fetchAllProjects = async () => {
    // Simula una càrrega de dades
    const response = await fetch(BASE_URL + '?_limit=20'); // Limitem a 20 ítems
    if (!response.ok) throw new Error('Error al carregar la llista de projectes.');
    
    // Normalitzem les dades per fer-les semblants a projectes
    const data = await response.json();
    return data.map(item => ({
        id: item.id,
        title: item.title.substring(0, 30),
        description: item.body.substring(0, 100) + '...',
        status: item.id % 3 === 0 ? 'Completat' : (item.id % 2 === 0 ? 'En Progrés' : 'Pendent'),
    }));
};

export const createNewProject = async (projectData) => {
    // SIMULACIÓ d'una API que retorna el nou objecte amb ID
    return new Promise(resolve => {
        setTimeout(() => {
            const newProject = {
                id: nextLocalId++,
                ...projectData,
                status: 'Pendent', // Per defecte
            };
            console.log("SIMULACIÓ API: Nou projecte creat", newProject);
            resolve(newProject);
        }, 500);
    });
};

// Les funcions d'actualització i eliminació es faran més tard
export const updateProject = async (id, updates) => { /* ... */ };
export const deleteProject = async (id) => { /* ... */ };