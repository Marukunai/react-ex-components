import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProjectProvider } from './context/ProjectContext';
import Layout from './components/Layout';
import ProjectList from './pages/ProjectList';
import ProjectForm from './pages/ProjectForm';
import ProjectDetail from './pages/ProjectDetail';
// El projectReducer i useReducer s'han mogut al ProjectContext.jsx!

// Creem una instància del client de Query
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* 1. Embolcallar amb el Provider */}
      <ProjectProvider> 
        <BrowserRouter>
          <Routes>
            
            <Route path="/" element={<Layout />}>
                
                {/* 2. RUTES: Ja NO passem cap prop d'estat */}
                <Route index element={<ProjectList />} /> 
                
                <Route path="new" element={<ProjectForm />} />
                
                <Route path="edit/:id" element={<ProjectForm />} />

                <Route path="detail/:id" element={<ProjectDetail />} />

                <Route path="*" element={<h3 className="not-found">Error 404: Ruta no trobada</h3>} />
                
            </Route>
            
          </Routes>
        </BrowserRouter>
      </ProjectProvider>
    </QueryClientProvider>
  );
}

export default App;