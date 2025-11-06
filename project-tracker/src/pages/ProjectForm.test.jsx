import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProjectForm from './ProjectForm';

// === 1. DEFINIM ELS MOCKS EN L'ÀMBIT HOISTED ===
// Tot el que estigui aquí estarà definit abans que qualsevol importació de mòdul (com React Query)
const mockVars = vi.hoisted(() => {
    return {
        // Variables que el nostre mock de useMutation utilitzarà
        mockMutate: vi.fn(),
        mockUseMutation: vi.fn(),
    };
});

// Capturem la funció mockDispatch del context, que no pateix tant el hoisting
const mockDispatch = vi.fn(); 

// === 2. MOCKING DE DEPENDÈNCIES ===

// MOCK: Context API
vi.mock('../context/ProjectContext', () => ({
    useProjectState: () => ({ projects: [] }), 
    useProjectDispatch: () => mockDispatch,
}));


// MOCK: React Query (useMutation) - Utilitza les variables HOISTED
vi.mock('@tanstack/react-query', () => {
    
    // Configurem el retorn de useMutation
    mockVars.mockUseMutation.mockImplementation(() => ({
        mutate: mockVars.mockMutate, // Referenciem la funció del vi.hoisted
        isPending: false,
        isError: false,
    }));
    
    return {
        useMutation: mockVars.mockUseMutation, // Retornem el mock que hem configurat
        useQueryClient: vi.fn(),
    };
});

// === LA PROVA ===

describe('ProjectForm - Mode Creació de Projecte', () => {

    const renderFormComponent = () => {
        // Netejar els mocks abans de cada test
        mockDispatch.mockClear(); 
        mockVars.mockMutate.mockClear();
        
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
        const mockNewProject = { /* ... */ }; // Dades simulades
        
        // Injectem la lògica asíncrona a la funció mutate mockeada
        mockVars.mockMutate.mockImplementation((formData) => {
            // Accedim a les opcions (onSuccess) que el component va passar a useMutation.
            const options = mockVars.mockUseMutation.mock.calls[0][0]; 
            options.onSuccess(mockNewProject); // Simulem l'èxit de l'API
        });

        // 2. Act (Interacció de l'Usuari):
        renderFormComponent(); 
        // ... (Interaccions de fireEvent es mantenen igual) ...
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
            // Assert A: Comprovem que la funció mutate ha estat cridada
            expect(mockVars.mockMutate).toHaveBeenCalledWith({
                title: 'Nou Projecte Test', 
                description: 'Descripció de la prova', 
                status: 'Pendent'
            });

            // Assert B: Comprovem que el dispatch del Context ha estat cridat
            expect(mockDispatch).toHaveBeenCalledWith({
                type: 'ADD_PROJECT',
                payload: mockNewProject, 
            });
        });
    });
});