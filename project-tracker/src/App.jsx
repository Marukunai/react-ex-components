import React, { useReducer } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProjectList from './pages/ProjectList';
import ProjectForm from './pages/ProjectForm';
import ProjectDetail from './pages/ProjectDetail';
import { projectReducer } from './reducer/projectReducer';

// Estat inicial: una llista buida
const initialProjects = []; 

function App() {
  // 1. useReducer a l'arrel de l'aplicació per gestionar l'estat global
  const [projects, dispatch] = useReducer(projectReducer, initialProjects);

  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Layout />}>
            
            {/* 2. RUTA: Llista de Projectes (Read & Delete) */}
            {/* Injectem l'estat (projects) i el dispatch per actualitzar-lo */}
            <Route 
                index 
                element={<ProjectList projects={projects} dispatch={dispatch} />} 
            /> 
            
            {/* 3. RUTA: Crear Nou Projecte (Create) */}
            {/* Injectem només el dispatch per afegir nous projectes */}
            <Route 
                path="new" 
                element={<ProjectForm dispatch={dispatch} />} 
            />
            
            {/* 4. RUTA: Editar Projecte (Update) */}
            {/* Injectem l'estat per trobar l'objecte i el dispatch per actualitzar-lo */}
            <Route 
                path="edit/:id" 
                element={<ProjectForm projects={projects} dispatch={dispatch} />} 
            />

            {/* 5. RUTA: Detall Dinàmic (Llegir un ítem) */}
            {/* Injectem només l'estat per buscar l'ítem pel seu ID */}
            <Route 
                path="detail/:id" 
                element={<ProjectDetail projects={projects} />} 
            />

            <Route path="*" element={<h3 className="not-found">Error 404: Ruta no trobada</h3>} />
            
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;