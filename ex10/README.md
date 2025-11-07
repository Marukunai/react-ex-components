# ✅ Exercici 10: Llista de Tasques (To-Do List: CRUD amb Immutabilitat)

Aquest projecte implementa una aplicació bàsica de Llista de Tasques (To-Do List). És l'exercici de React més important per entendre com s'han de gestionar els arrays a l'estat d'un component funcional.

L'objectiu principal és dominar la **Immutabilitat de l'Estat** a l'hora de realitzar les operacions **CRUD** (Create, Read, Update, Delete) sobre un array amb **`useState`**.

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

## 🧠 Lògica de Gestió de l'Array (Immutabilitat)

Tota la lògica es basa en la premissa que **mai es modifica l'estat directament**. En lloc d'això, sempre es crea un **nou array** o **nou objecte** per passar a la funció `setTasks`.

### 1. ➕ Crear/Afegir Tasca (`handleAddTask`)

Per afegir un element, utilitzem el **Spread Operator (`...`)** per generar un nou array.

```javascript
const newTaskList = [
    ...tasks, // 🅰️ Copia totes les tasques existents
    {           // 🅱️ Afegeix el nou objecte al final
        id: nextId++, 
        text: taskText,
        done: false,
    },
];

setTasks(newTaskList); // Actualitza l'estat amb el NOU array
```

### 2. 🔄 Actualitzar Tasca (Toggle `handleToggleTask`)

Per canviar l'estat `done` d'una tasca, utilitzem `map()`. `map` sempre retorna un nou array.

```javascript
const updatedTasks = tasks.map(task => {
    if (task.id === id) {
        // PER IMMUTABILITAT: Copiem la tasca amb {...task} 
        // i només canviem la propietat 'done'.
        return { ...task, done: !task.done };
    }
    return task; // Retorna la resta de tasques sense canvis
});

setTasks(updatedTasks);
```

### 3. ❌ Esborrar Tasca (`handleDeleteTask`)

Per eliminar un element, utilitzem `filter()`. `filter` sempre retorna un nou array que conté tots els elements excepte el que s'ha exclòs per la condició.

```javascript
// La condició exclou la tasca que té l'ID que hem passat com a argument
const filteredTasks = tasks.filter(task => task.id !== id);
setTasks(filteredTasks);
```

### 4. Renderització Dinàmica

El component renderitza la llista d'elements dins de l'array `tasks` utilitzant `map()` i aplica estils condicionals per a les tasques completades:

```javascript
<li 
    key={task.id} 
    className={`task-item ${task.done ? 'completed' : ''}`} // Estil condicional
>
    {/* ... */}
</li>
```