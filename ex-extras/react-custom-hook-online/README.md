# 🌐 React Custom Hook: `useOnlineStatus`

Aquest projecte demostra l'ús d'un **Custom Hook** anomenat **`useOnlineStatus`** per monitoritzar l'estat de la connexió a internet del navegador (`navigator.onLine`). És un exemple perfecte de com els Custom Hooks permeten **reutilitzar la lògica d'estat (sense compartir l'estat)** a través de múltiples components.

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

## 🧠 Arquitectura: Reutilització de Lògica

La principal lliçó d'aquest projecte és l'ús eficient de la lògica del component:

| Principi | Explicació |
| :--- | :--- |
| **Lògica Compartida** | La lògica de subscripció i desubscripció als esdeveniments del navegador (`online`/`offline`) es defineix **un cop** dins de `useOnlineStatus`. |
| **Estat Independent** | Cada component que crida `const isOnline = useOnlineStatus()` obté la seva pròpia instància de l'estat `isOnline`. En aquest cas, com que l'estat canvia globalment per a tots, l'efecte és sincronitzat. |
| **Simplicitat del Consumidor** | Components com `HeaderBar` i `StatusIndicator` només reben un valor booleà (`true` o `false`) i es poden centrar exclusivament en la lògica de renderitzat condicional. |

### 1. 📁 Fitxers i Responsabilitats

| Fitxer | Element Clau | Responsabilitat |
| :--- | :--- | :--- |
| **`hooks/useOnlineStatus.js`** | `useOnlineStatus()` | Conté la lògica completa per subscriure's als esdeveniments del navegador, utilitzant `useState` i `useEffect`. |
| **`components/StatusIndicator.jsx`** | `StatusIndicator` | **Consumidor:** Mostra l'estat de la xarxa (🟢 Connectat / 🔴 Desconnectat). |
| **`components/HeaderBar.jsx`** | `HeaderBar` | **Consumidor:** Aplica estils dinàmics al *header* basats en el mateix estat. |

### 2. Implementació del Custom Hook

El hook **`useOnlineStatus.js`** fa ús de les millors pràctiques de React per a la interacció amb les APIs del navegador:

1.  **Estat Inicial:** Inicialitza l'estat amb el valor actual de l'API nativa del navegador: `useState(navigator.onLine)`.
2.  **Subscripció (`useEffect`):** Utilitza `window.addEventListener('online', ...)` i `window.addEventListener('offline', ...)` dins d'un `useEffect` amb dependències buides (`[]`). Això garanteix que els *listeners* només s'afegeixen un cop al muntatge.
3.  **Neteja (*Cleanup*):** La funció de retorn (`return () => { ... }`) dins de l'efecte és **crucial**. S'encarrega d'eliminar els *listeners* amb `window.removeEventListener`, prevenint així les fuites de memòria (*memory leaks*) quan el component (o el hook) es desmunta.

### 3. Ús en Components

La crida al hook és idèntica en tots els components:

```javascript
// A HeaderBar.jsx i StatusIndicator.jsx
const isOnline = useOnlineStatus();
```

Això manté el codi del component concís i llegible, separant eficaçment la lògica de la UI.