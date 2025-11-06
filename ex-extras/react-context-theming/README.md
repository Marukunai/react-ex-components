# 🌍 React Context Theming (Mode Clar/Fosc)

Aquest projecte demostra l'ús canònic de la **Context API de React** per gestionar l'estat global de l'aplicació, específicament el canvi entre els modes de tema **Clar** (`light`) i **Fosc** (`dark`).

L'arquitectura se centra en el principi de la **separació del Context** amb un **Custom Hook** per facilitar l'accés a l'estat des de qualsevol punt de la jerarquia de components.

## ⚙️ Configuració i Execució

### Instal·lació

1.  Instal·la les dependències:
    ```bash
    npm install
    ```

### Comandes Disponibles

| Comanda | Descripció |
| :--- | :--- |
| `npm run dev` | Inicia el servidor de desenvolupament local. |
| `npm run build` | Construeix el projecte per a producció. |

***

## 🧠 Arquitectura del Context

El projecte implementa la millor pràctica per a la Context API: separar la definició del Context, el seu Proveïdor (`Provider`), i l'hook de consum.

### 1. 📁 Estructura de Fitxers Clau

| Fitxer | Responsabilitat | Elements Clau |
| :--- | :--- | :--- |
| **`context/ThemeContext.js`** | **Definició del Context.** Crea l'objecte `ThemeContext` que contindrà l'estat. | `createContext()` |
| **`context/ThemeProvider.js`** | **Lògica d'Estat i Proveïdor.** Defineix l'estat (`useState` per al tema) i la lògica per canviar-lo (`toggleTheme`). Exporta el `ThemeProvider` i l'hook `useTheme`. | `useState`, `useContext`, `ThemeProvider`, `useTheme` |
| **`components/ContentPanel.jsx`** | **Consumidor (Lectura).** Llegeix l'estat del tema des del context i l'aplica a la seva classe CSS (`className`). | `useTheme()` |
| **`components/ThemeToggler.jsx`** | **Consumidor (Lectura i Escriptura).** Llegeix l'estat actual i invoca la funció `toggleTheme` per canviar l'estat. | `useTheme()` |

### 2. Flux de Dades i Implementació de Hooks

#### A. Centralització de l'Estat (`ThemeProvider.js`)

1.  **Estat Base:** L'estat actual del tema (`'light'` o `'dark'`) es manté dins del `ThemeProvider` utilitzant **`useState`**.
2.  **Funció Mutadora:** La funció **`toggleTheme`** conté la lògica per alternar l'estat.
3.  **Proveïdor:** El component `<ThemeContext.Provider value={contextValue}>` embolcalla els components fills i exposa tant l'estat (`theme`) com la funció de canvi (`toggleTheme`).

#### B. Evitant el Prop Drilling (`useTheme` Custom Hook)

La millor pràctica de React s'utilitza amb l'exportació d'un *Custom Hook*: **`useTheme`**.

```javascript
// A dins de ThemeProvider.js
export const useTheme = () => useContext(ThemeContext);
```

- **Benefici**: Qualsevol component fill (com `ContentPanel` o `ThemeToggler`) només necessita importar `useTheme` i cridar-lo, evitant la importació explícita de + `ThemeContext` i la crida manual a `useContext`.

### 3. Aplicació del Tema

El tema s'aplica mitjançant classes CSS dinàmiques:

- **Panell de contingut**:

```javascript
<div className={`content-panel ${theme}`}>
```

- **Botó Toggler**:

```javascript
<button className={`btn-toggle ${theme === 'dark' ? 'dark-mode' : 'light-mode'}`}>
```

Això permet que els estils de la classe `.light` o `.dark` definits en el CSS controlin l'aparença visual global.