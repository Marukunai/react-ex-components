# ✅ Gestor de Tasques: `useReducer` (Patró Redux-like)

Aquest projecte implementa un Gestor de Tasques (*To-Do List*) utilitzant el hook **`useReducer`**. L'objectiu és separar la lògica de la gestió de l'estat (la funció *Reducer*) de la lògica de la interfície d'usuari (el component *TodoListReducer*), un patró essencial per a aplicacions amb estat complex.

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

## 🧠 Arquitectura de Gestió de l'Estat

El projecte es divideix en dos conceptes fonamentals que interactuen constantment: **`dispatch`** i **`tasksReducer`**.

### 1. El Hook Central: `useReducer`

```javascript
const [tasks, dispatch] = useReducer(tasksReducer, initialState);
```

- `tasks`: Conté l'estat actual, un array d'objectes tasca.

- `dispatch`: La funció única utilitzada pel component per enviar accions al Reducer, sol·licitant un canvi d'estat.

- `tasksReducer`: La funció pura que conté tota la lògica per mutar l'estat.

### 2. Funció tasksReducer i Immutabilitat

El *Reducer* és el cor del projecte. Totes les operacions (afegir, eliminar, alternar) segueixen el principi d'**immutabilitat: mai modifiquen directament l'estat anterior**.

| Tipus d'Acció (action.type) | Estratègia d'Immutabilitat | Descripció |
| :--- | :--- | :--- |
| ADD_TASK | Utilitza el spread operator (...tasks) per crear un nou array. | Afegeix una nova tasca amb un ID únic. |
| DELETE_TASK | Utilitza .filter() per crear un nou array excloent l'element donat. | Elimina la tasca amb l'ID especificat. |
| TOGGLE_TASK | Utilitza .map() per crear un nou array; dins, utilitza el spread operator ({...t, completed: !t.completed}) per crear un nou objecte tasca només per al canvi. | Inverteix l'estat completed d'una tasca. |
| CLEAR_COMPLETED | Utilitza .filter() per retornar un nou array amb només les tasques incompletes. | Neteja massiva d'elements. |

### 3. Interacció del Component (`TodoListReducer`)

El component `TodoListReducer` és purament presentacional i només s'encarrega de:

- Gestionar l'estat simple de l'input (`taskText`) amb useState.

- Cridar `dispatch` amb l'acció i el *payload* correctes quan hi ha una interacció (botó d'afegir, checkbox, botó d'eliminar).

Aquesta separació fa que la lògica de la llista de tasques sigui fàcil de seguir, de provar i de mantenir.