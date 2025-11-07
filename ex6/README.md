# 💪 Exercici 6: Rutina d'Entrenament (Càlcul de Volum)

Aquest exercici utilitza les dades d'una rutina d'entrenament per demostrar dos tipus de càlcul:
1.  **Càlcul d'Ítem:** Calcular el Volum de treball per a cada exercici (sèries $\times$ repeticions $\times$ pes).
2.  **Càlcul d'Agregació:** Sumar el Volum Total de tots els exercicis per a la sessió completa.

El projecte reforça l'ús de **`map`** per renderitzar llistes dins d'una taula i **`reduce`** per obtenir un valor final agregat.

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

## 🧠 Lògica de Càlcul del Volum

El projecte aplica la lògica de càlcul en dos nivells diferents, depenent del seu abast.

### 1. Càlcul del Volum Individual (`ExerciseItem.jsx`)

El component fill (`ExerciseItem`) és l'encarregat de calcular i mostrar el volum de treball d'un sol exercici.

* **Fórmula de Càlcul:**
    $$ \text{Volum} = \text{Sèries} \times \text{Repeticions} \times \text{Pes} $$

```javascript
// A ExerciseItem.jsx
const { exercici, series, repeticions, pes } = props.exercise;
const volum = series * repeticions * pes;
```

### 2. Càlcul del Volum Total de la Sessió (`WorkoutList.jsx`)

El component pare (`WorkoutList`) utilitza la funció `reduce()` sobre l'array complet (`workoutExercises`) per sumar els volums individuals i obtenir el total de la sessió.

- Estratègia de `reduce`:

    - L'acumulador (`acc`) comença a 0.

    - En cada iteració, s'afegeix el càlcul del volum de l'exercici actual (el total de les sèries i repeticions amb el pes utilitzat) a l'acumulador.

```javascript
// A WorkoutList.jsx
const volumTotal = workoutExercises.reduce((acc, ex) => {
    // Es calcula el volum en el moment de la reducció
    return acc + (ex.series * ex.repeticions * ex.pes);
}, 0);
```

### 3. Renderització de la Taula

Les files (`<tr>`) es generen utilitzant `map` dins del `<tbody>`.

El resultat agregat final (`volumTotal`) es col·loca a la secció `<tfoot>` per subratllar que és el resum de la taula.