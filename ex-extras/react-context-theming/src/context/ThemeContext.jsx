import { createContext } from 'react';

// 1. Definim el Context. 
// L'objecte de l'estructura inicial és només per a l'autocompletat i els valors per defecte.
export const ThemeContext = createContext({
    theme: 'light',
    toggleTheme: () => {}, // Funció de prova buida
});