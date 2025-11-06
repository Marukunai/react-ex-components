export function projectReducer(state, action) {
    switch (action.type) {
        
        // 1. Carregar dades inicials (després del fetch amb èxit)
        case 'SET_PROJECTS': {
            return action.payload; // Reemplaça l'estat amb les dades de l'API
        }
        
        // 2. Afegir un nou projecte (CRUD: Create)
        case 'ADD_PROJECT': {
            return [action.payload, ...state]; // Afegir al principi de la llista
        }

        // 3. Eliminar un projecte (CRUD: Delete)
        case 'DELETE_PROJECT': {
            return state.filter(p => p.id !== action.payload.id);
        }

        // 4. Actualitzar un projecte (CRUD: Update)
        case 'UPDATE_PROJECT': {
            return state.map(p => {
                if (p.id === action.payload.id) {
                    // Retorna una còpia del projecte amb les dades actualitzades
                    return { ...p, ...action.payload.updates };
                }
                return p;
            });
        }
        
        default: {
            return state;
        }
    }
}