# ⚛️ Exercicis 1 i 2: Components i Props

Aquest projecte serveix com a introducció als dos conceptes més fonamentals de React: la creació de **Components Reutilitzables** i la transmissió de dades d'un component pare a un fill mitjançant les **Props**.

## ⚙️ Configuració i Execució

Aquest projecte utilitza **Vite** i **npm**.

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

## 🧠 Conceptes Fonamentals

### 1. Creació i Reutilització de Components

El component **`MyFirstComponent.jsx`** és la unitat bàsica de l'aplicació.

* **Definició:** És una funció que retorna elements JSX.
* **Reutilització:** El component **`App.jsx`** crida a `MyFirstComponent` múltiples vegades, demostrant que el mateix codi es pot utilitzar per generar diferents parts de la UI.

### 2. Transmissió de Dades (Props)

Les *props* (`properties`) són la manera com les dades flueixen en React: del pare (`App`) al fill (`MyFirstComponent`).

#### A. Al Component Pare (`App.jsx`)

El component pare defineix i passa una propietat anomenada `nom`:

```jsx
<MyFirstComponent nom={myName} /> 
<MyFirstComponent nom="Anna (Usuària 1)" />
```

#### B. Al Component Fill (```MyFirstComponent.jsx```)

El component fill rep aquestes dades a través de l'argument `props`:

```javascript
function MyFirstComponent(props) {
    const { nom } = props; // Desestructuració de la prop 'nom'
    
    return (
        <h3>
            El meu primer component. By **{nom}**
        </h3>
    );
}
```

El component fill és l'encarregat de renderitzar el valor rebut (el nom) a la seva interfície. Aquest mecanisme és essencial per crear components dinàmics.

--- 

## 📝 Estructura de Fitxers

| Fitxer/Directori | Responsabilitat | Notes Clau |
| :--- | :--- | :--- |
| `components/MyFirstComponent.jsx` | Defineix el **component reutilitzable**. | Rep i utilitza la prop `nom`. |
| `App.jsx` | **Component de layout principal**. | Conté la lògica per cridar i passar diferents valors de la prop `nom`. |
| `main.jsx` | **Punt d'entrada de l'aplicació**. | Utilitza `createRoot` i `StrictMode` per a l'inicialització. |