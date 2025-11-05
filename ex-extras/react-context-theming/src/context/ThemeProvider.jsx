import React, { useState, useContext } from 'react';
import { ThemeContext } from './ThemeContext'; // Importem el Context creat

// 1. Hook personalitzat per simplificar la importació del context
// Aquesta és la millor pràctica de React
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    
    // 2. Estat real del tema
    const [theme, setTheme] = useState('light');

    // 3. Funció per canviar l'estat
    const toggleTheme = () => {
        setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
    };

    // 4. Valor que es proporcionarà a tots els components que utilitzin useTheme()
    const contextValue = {
        theme,
        toggleTheme,
    };

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
};