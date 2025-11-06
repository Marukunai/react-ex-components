import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProjectDetail from './ProjectDetail';

// 1. Mockejem els Custom Hooks (Simulem la Gestió d'Estat Global)
// Aquesta és la clau de la prova: reemplacem la lògica real del Context
vi.mock('../context/ProjectContext', () => ({
  useProjectState: () => ({
    projects: [
      { id: 1, title: 'Projecte de Prova 1', description: 'Descripció del detall.', status: 'En Progrés' },
      { id: 2, title: 'Projecte 2', description: 'Descripció 2.', status: 'Completat' },
    ],
    isLoadingInitial: false,
    isErrorInitial: false,
    errorInitial: null,
  }),
  useProjectDispatch: () => vi.fn(), // No necessitem dispatch per a la lectura
}));


describe('ProjectDetail', () => {

  // Funció Helper per renderitzar el component dins del Router
  const renderDetailComponent = (projectId) => {
    // MemoryRouter s'utilitza per simular el navegador
    render(
        <MemoryRouter initialEntries={[`/detail/${projectId}`]}>
            <Routes>
                {/* Definim la ruta tal com està a App.jsx */}
                <Route path="/detail/:id" element={<ProjectDetail />} />
            </Routes>
        </MemoryRouter>
    );
  };

  test('hauria de mostrar els detalls correctes per a un projecte existent', () => {
    
    // Simulem que l'usuari navega a l'ID 1
    renderDetailComponent(1); 
    
    // Utilitzem RTL per buscar elements com ho faria l'usuari
    
    // Assert 1: Comprovem que el títol és present
    expect(screen.getByText('Projecte de Prova 1')).toBeInTheDocument();
    
    // Assert 2: Comprovem que la descripció és present
    expect(screen.getByText('Descripció del detall.')).toBeInTheDocument();
    
    // Assert 3: Comprovem que l'estat és correcte
    expect(screen.getByText(/En Progrés/i)).toBeInTheDocument(); // /i ignora majúscules/minúscules
  });

  test("hauria de mostrar un missatge d'error si el projecte no es troba", () => {
    
    // Simulem que l'usuari navega a un ID que no existeix al mock (ID 99)
    renderDetailComponent(99); 
    
    // Assert: Comprovem que es mostra el missatge d'error del component
    expect(screen.getByText(/Projecte amb ID 99 no trobat/i)).toBeInTheDocument();
  });
  
});