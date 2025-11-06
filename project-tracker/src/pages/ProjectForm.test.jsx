import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProjectForm from './ProjectForm';

// === DADES GLOBALS PER ALS MOCKS ===

// Dades que simularan l'estat global del teu ProjectContext
const mockProjects = [
  { id: 10, title: 'Projecte Vella', description: 'Descripció Vella', status: 'Pendent' },
  { id: 20, title: 'Projecte 2', description: 'Descripció 2', status: 'Completat' },
];

// === 1. DEFINIM ELS MOCKS EN L'ÀMBIT HOISTED ===
const mockVars = vi.hoisted(() => {
    return {
        mockMutate: vi.fn(),
        mockUseMutation: vi.fn(),
    };
});

// Capturem la funció mockDispatch del context
const mockDispatch = vi.fn(); 


// === 2. MOCKING DE DEPENDÈNCIES ===

// MOCK: Context API
vi.mock('../context/ProjectContext', () => ({
    // Retornem els projectes per a simular l'edició, però també el mode normal
    useProjectState: () => ({ projects: mockProjects }), 
    useProjectDispatch: () => mockDispatch,
}));


// MOCK: React Query (useMutation) - Utilitza les variables HOISTED
vi.mock('@tanstack/react-query', () => {
    
    mockVars.mockUseMutation.mockImplementation(() => ({
        mutate: mockVars.mockMutate,
        isPending: false,
        isError: false,
    }));
    
    return {
        useMutation: mockVars.mockUseMutation,
        useQueryClient: vi.fn(),
    };
});

// === LA PROVA - MODE CREACIÓ ===

describe('ProjectForm - Mode Creació de Projecte', () => {

    // Helper per renderitzar en mode 'new'
    const renderFormComponent = () => {
        // Netejar els mocks abans de cada test
        mockDispatch.mockClear(); 
        mockVars.mockMutate.mockClear();
        
        // Simulem que useProjectState torna un array buit per evitar conflictes
        vi.mock('../context/ProjectContext', () => ({
            useProjectState: () => ({ projects: [] }), 
            useProjectDispatch: () => mockDispatch,
        }));

        render(
            <MemoryRouter initialEntries={['/new']}>
                <Routes>
                    <Route path="/new" element={<ProjectForm />} />
                </Routes>
            </MemoryRouter>
        );
    };

    test('hauria de simular la creació d’un nou projecte amb èxit i cridar dispatch', async () => {
        
        // 1. Arrange (Preparació):
        const mockNewProject = { 
            title: "Nou Projecte Test", 
            description: "Descripció de la prova", 
            status: "Pendent",
            id: 999 
        };
        
        // Injectem la lògica asíncrona a la funció mutate mockeada
        mockVars.mockMutate.mockImplementation((formData) => {
            const options = mockVars.mockUseMutation.mock.calls[0][0]; 
            options.onSuccess(mockNewProject);
        });

        // 2. Act (Interacció de l'Usuari):
        renderFormComponent(); 
        
        fireEvent.change(screen.getByLabelText(/títol del projecte/i), {
             target: { name: 'title', value: 'Nou Projecte Test' },
        });
        fireEvent.change(screen.getByLabelText(/descripció/i), {
            target: { name: 'description', value: 'Descripció de la prova' },
        });
        
        const createButton = screen.getByRole('button', { name: /crear projecte/i });
        fireEvent.click(createButton);

        // 3. Assert (Verificació):
        await waitFor(() => {
            expect(mockVars.mockMutate).toHaveBeenCalledWith({
                title: 'Nou Projecte Test', 
                description: 'Descripció de la prova', 
                status: 'Pendent'
            });

            expect(mockDispatch).toHaveBeenCalledWith({
                type: 'ADD_PROJECT',
                payload: mockNewProject, 
            });
        });
    });
});


// === LA PROVA - MODE EDICIÓ (UPDATE) ===

describe('ProjectForm - Mode Edició de Projecte', () => {

    const PROJECT_ID_TO_EDIT = 10;
    
    // Helper per renderitzar en mode 'edit'
    const renderEditComponent = () => {
        // Assegurem que useProjectState torna els mockProjects
        vi.mock('../context/ProjectContext', () => ({
            useProjectState: () => ({ projects: mockProjects }), 
            useProjectDispatch: () => mockDispatch,
        }));
        mockDispatch.mockClear(); 

        render(
            <MemoryRouter initialEntries={[`/edit/${PROJECT_ID_TO_EDIT}`]}>
                <Routes>
                    <Route path="/edit/:id" element={<ProjectForm />} />
                </Routes>
            </MemoryRouter>
        );
    };

    test('hauria de carregar les dades del projecte i cridar UPDATE_PROJECT', () => {
        
        const projectOriginal = mockProjects.find(p => p.id === PROJECT_ID_TO_EDIT);

        // 1. Arrange & Act (Càrrega i Interacció):
        renderEditComponent(); 
        
        // Assert A (Càrrega): Comprovem que el formulari s'ha carregat amb les dades
        expect(screen.getByDisplayValue(projectOriginal.title)).toBeInTheDocument();
        
        // 2. Act (Interacció de l'Usuari): Canviem la descripció i l'estat
        fireEvent.change(screen.getByLabelText(/descripció/i), {
            target: { name: 'description', value: 'Descripció Nova i Millorada' },
        });
        
        fireEvent.change(screen.getByLabelText(/estat/i), {
            target: { name: 'status', value: 'En Progrés' },
        });
        
        // Enviem el formulari (Botó d'actualitzar)
        const updateButton = screen.getByRole('button', { name: /actualitzar projecte/i });
        fireEvent.click(updateButton);

        // 3. Assert (Verificació):

        // Comprovem que el dispatch del Context ha estat cridat per actualitzar l'estat
        expect(mockDispatch).toHaveBeenCalledWith({
            type: 'UPDATE_PROJECT',
            payload: { 
                id: PROJECT_ID_TO_EDIT, 
                updates: {
                    title: projectOriginal.title, // El títol es manté igual que el valor inicial
                    description: 'Descripció Nova i Millorada', 
                    status: 'En Progrés' 
                }
            },
        });
    });
});