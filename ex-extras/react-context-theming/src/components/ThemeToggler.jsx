import React from 'react';
// Només importem l'hook personalitzat
import { useTheme } from '../context/ThemeProvider'; 

function ThemeToggler() {
    // 1. Accés directe a les dades del context
    const { theme, toggleTheme } = useTheme();

    return (
        <button 
            onClick={toggleTheme} 
            className={`btn-toggle ${theme === 'dark' ? 'dark-mode' : 'light-mode'}`}
        >
            {/* 2. Utilitzem l'estat actual per canviar el text del botó */}
            Canviar a Mode {theme === 'light' ? 'FOSC 🌙' : 'CLAR ☀️'}
        </button>
    );
}

export default ThemeToggler;