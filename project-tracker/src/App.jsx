import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProjectProvider } from './context/ProjectContext'; // Importem el Provider
import Layout from './components/Layout';
import ProjectList from './pages/ProjectList';
import ProjectForm from './pages/ProjectForm';
import ProjectDetail from './pages/ProjectDetail';
// El projectReducer i useReducer s'han mogut al ProjectContext.jsx!

function App() {
  return (
    // 1. Embolcallar amb el Provider
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
  );
}

export default App;