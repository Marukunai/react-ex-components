import React from 'react';
import { useTheme } from '../context/ThemeProvider';
import ThemeToggler from './ThemeToggler'; // El Toggler és un component fill

function ContentPanel() {
    // 1. Accés directe a l'estat del tema
    const { theme } = useTheme();

    return (
        <div className={`content-panel ${theme}`}>
            <h3>Estat del Tema: {theme.toUpperCase()}</h3>
            
            <p>
                Aquest panell llegeix l'estat global del tema 
                per aplicar els estils. No ha rebut cap `prop`!
            </p>
            
            {/* 2. Component fill que també consumeix el context */}
            <ThemeToggler /> 

            <div className="nested-div">
                <p>
                    El Context API ens permet "saltar-nos" la jerarquia de components, 
                    evitant el *prop drilling*.
                </p>
            </div>
        </div>
    );
}

export default ContentPanel;