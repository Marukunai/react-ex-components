# ⚛️ Exercici 21 (Extra): Comptador Avançat amb `useReducer`

Aquest exercici introdueix el hook **`useReducer`**, una alternativa a `useState` que és ideal per gestionar estats complexos o estats on la transició depèn de la lògica interna del propi estat. En lloc de cridar directament `setCount(count + 1)`, enviem una **acció** al **`reducer`** que s'encarrega d'actualitzar l'estat.

## 🎯 Conceptes Clau

1.  **Centralització de Lògica:** Tota la lògica de canvi d'estat (`increment`, `decrement`, `reset`, `setValue`) es troba a la funció `reducer`.
2.  **`dispatch` i Accions:** El component només crida a **`dispatch({ type: '...' })`**, indicant QUÈ vol fer, però no com fer-ho.
3.  **Payload:** Demostra com enviar dades addicionals (**`payload`**) amb l'acció per fer canvis dinàmics (`setValue`).

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

## 🧠 Estructura `useReducer`

### 1. Estat Inicial (`initialState`)

L'estat és un objecte complex que conté totes les dades que necessita el comptador. Guardem `initialValue` per permetre la funció `reset` sense dependre de la captura inicial.

```javascript
const initialState = {
    count: 0,
    initialValue: 0,
};
```

### 2. Funció Reducer

La funció `reducer(state, action)` rep l'estat actual i l'acció enviada. Utilitza una instrucció `switch` per determinar com ha de ser el **nou estat** en funció del `action.type`.

```javascript
// A reducer.js (o al mateix fitxer)
function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return { ...state, count: state.count + 1 };
        // ... altres casos ...
        case 'setValue':
            return { ...state, count: state.count + action.payload }; 
        default:
            throw new Error(`Tipus d'acció no suportada: ${action.type}`);
    }
}
```

**Nota**: El *reducer* sempre ha de ser una **funció pura**; mai no ha de modificar l'estat directament (ha de retornar un nou objecte d'estat) i no pot contenir efectes secundaris (com trucades API).

### 3. Ús al Component (`AdvancedCounter`)

El hook `useReducer` es connecta amb el *reducer* i l'estat inicial:

```javascript
const [state, dispatch] = useReducer(reducer, initialState);
```

Per actualitzar l'estat, simplement cridem a `dispatch` amb l'objecte d'acció:

```javascript
<button onClick={() => dispatch({ type: 'decrement' })} />
// O amb payload:
<button onClick={() => dispatch({ type: 'setValue', payload: customValue })} />
```

Aquest patró separa la lògica de la presentació, un concepte fonamental utilitzat també per llibreries més grans com Redux.