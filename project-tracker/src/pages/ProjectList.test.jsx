import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProjectList from './ProjectList';
import { MemoryRouter } from 'react-router-dom';

// === DADES GLOBALS PER AL MOCKING ===

// 1. Variable mutable per controlar l'estat del Context.
let currentProjectState = {
    projects: [],
    isLoadingInitial: false,
    errorInitial: null
};

// 2. Mocks de funció
const mockDispatch = vi.fn();
const mockNavigate = vi.fn();
const mockStartTransition = vi.fn((callback) => callback());

vi.mock('react', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        // Retornem el nostre mock per startTransition, isPending sempre fals
        useTransition: () => [false, mockStartTransition], 
    };
});

// Dades de prova
const mockProjects = [
    { id: 1, title: 'Projecte A', description: 'Descripció A', status: 'Pendent' },
    { id: 2, title: 'Projecte B', description: 'Descripció B', status: 'Completat' },
];

// === MOCKING DE DEPENDÈNCIES (HOISTED) ===

// Mock: Simulem useNavigate
vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

// Mock: Context API (Ara llegeix de la variable global 'currentProjectState')
vi.mock('../context/ProjectContext', () => ({
    // Aquesta funció SÍ es pot hoistar perquè només fa referència a la variable global 'currentProjectState'
    useProjectState: () => currentProjectState,
    useProjectDispatch: () => mockDispatch,
}));

// Mock: Simulem window.confirm per no bloquejar el test
vi.spyOn(window, 'confirm').mockReturnValue(true);


// === FUNCIÓ HELPER CORREGIDA ===

// Funció per actualitzar la variable global abans de cada test (NO crida a vi.mock)
const setProjectState = (newState) => {
    currentProjectState = newState;
};


// === LES PROVES ===

describe('ProjectList', () => {

    beforeEach(() => {
        // Assegurem que l'estat per defecte és sense carregar i sense projectes abans de cada test
        setProjectState({ projects: [], isLoadingInitial: false, errorInitial: null });
        mockDispatch.mockClear();
        mockNavigate.mockClear();
        mockStartTransition.mockClear();
    });

    // TEST 1: Càrrega
    test('hauria de mostrar l’estat de càrrega inicial', () => {
        // 1. Arrange: Actualitzem l'estat global
        setProjectState({ projects: [], isLoadingInitial: true, errorInitial: null });
        
        // 2. Act & Assert:
        render(<ProjectList />, { wrapper: MemoryRouter });
        expect(screen.getByText(/carregant projectes inicials/i)).toBeInTheDocument();
    });

    // TEST 2: Dades Correctes
    test('hauria de renderitzar la llista de projectes i el recompte', () => {
        // 1. Arrange:
        setProjectState({ projects: mockProjects, isLoadingInitial: false, errorInitial: null });
        
        // 2. Act & Assert:
        render(<ProjectList />, { wrapper: MemoryRouter });

        // Utilitzem getByRole('heading') amb el nom accessible per agafar el text sencer.
        expect(screen.getByRole('heading', { name: /total de projectes: 2/i })).toBeInTheDocument(); 
        expect(screen.getByText('Projecte A')).toBeInTheDocument();
    });

    // TEST 3: Eliminació (CRUD DELETE)
    test('hauria de cridar dispatch amb DELETE_PROJECT quan s’elimina un projecte', () => {
        // 1. Arrange:
        setProjectState({ projects: mockProjects, isLoadingInitial: false, errorInitial: null });
        render(<ProjectList />, { wrapper: MemoryRouter });
        
        // 2. Act:
        const deleteButton = screen.getAllByRole('button', { name: /eliminar/i })[0];
        fireEvent.click(deleteButton);

        // 3. Assert:
        expect(mockDispatch).toHaveBeenCalledWith({
            type: 'DELETE_PROJECT',
            payload: { id: 1 },
        });
    });

    // TEST 4: Edició (Navegació)
    test('hauria de navegar a la ruta d’edició quan es prem el botó d’editar', () => {
        // 1. Arrange:
        setProjectState({ projects: mockProjects, isLoadingInitial: false, errorInitial: null });
        render(<ProjectList />, { wrapper: MemoryRouter });
        
        // 2. Act:
        // Busquem pel nom 'Editar' (més genèric, perquè el text del botó és només "Editar")
        const editButton = screen.getAllByRole('button', { name: /editar/i })[0]; 
        fireEvent.click(editButton);

        // 3. Assert:
        expect(mockNavigate).toHaveBeenCalledWith('/edit/1');
    });
    
    // TEST 5: Error de càrrega (Extra)
    test('hauria de mostrar missatge d’error en fallar la càrrega inicial', () => {
        setProjectState({ 
            projects: [], 
            isLoadingInitial: false, 
            errorInitial: new Error("Simulated API Error") 
        });
        render(<ProjectList />, { wrapper: MemoryRouter });
        
        expect(screen.getByText(/error en la càrrega: simulated api error/i)).toBeInTheDocument();
    });

    // TEST 6: useTransition en l'eliminació
    test('hauria d’embolcallar l’eliminació amb startTransition', () => {
        // 1. Arrange:
        setProjectState({ projects: mockProjects, isLoadingInitial: false, errorInitial: null });
        render(<ProjectList />, { wrapper: MemoryRouter });
        
        // 2. Act:
        const deleteButton = screen.getAllByRole('button', { name: /eliminar/i })[0];
        fireEvent.click(deleteButton);

        // 3. Assert:
        // Verifiquem que la nostra funció mock ha estat cridada
        expect(mockStartTransition).toHaveBeenCalledTimes(1);
    });
});