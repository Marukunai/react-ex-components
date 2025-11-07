# ❌🅾️ Exercici 20: El Joc del Tres en Ratlla (Tic-Tac-Toe)

Aquest projecte és una implementació completa del clàssic joc del Tres en Ratlla, servint com a revisió final dels conceptes bàsics de React: `useState`, *props*, immutabilitat, i lògica de joc.

## 🎯 Objectius Clau

1.  **Gestió Centralitzada de l'Estat:** El component `Board` manté tot l'estat del joc (les 9 caselles i el torn).
2.  **Immutabilitat:** Assegurar que l'array `squares` es clona (`.slice()`) abans de cada modificació per garantir que React detecti el canvi d'estat correctament.
3.  **Lifting State Up:** El component `Square` (casella) només rep el seu valor i una funció per cridar al pare (`onClick`).
4.  **Lògica Complexa:** Integrar la lògica per detectar el guanyador i gestionar l'empat.

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

## 🧠 Estructura i Lògica del Joc

### 1. Estats Clau (`Board.jsx`)

El component `Board` gestiona l'estat crític del joc:

* **`squares`:** Array de 9 elements que representa el tauler. Conté `null`, `'X'` o `'O'`.
* **`xIsNext`:** Booleà (`true` si toca a la 'X', `false` si toca a la 'O').

### 2. Funció `handleClick(i)`

El gestor de clic és el cor del joc. Ha de realitzar diverses comprovacions abans de permetre un moviment:

1.  **Guarda Ràpida (Guardrails):** Comprova si la casella ja té un valor o si el joc ha acabat.
2.  **Immutabilitat:** Crea una còpia (`nextSquares = squares.slice();`).
3.  **Execució:** Actualitza la còpia de l'array a la posició `i` i alterna el torn amb `setXIsNext(!xIsNext)`.

### 3. Detecció de la Victòria (`calculateWinner`)

La funció externa `calculateWinner` s'executa amb cada *render* (o dins de `handleClick`). Recorre totes les combinacions guanyadores predefinides i retorna el símbol (`'X'` o `'O'`) que compleix la condició, o `null` si no hi ha guanyador.

### 4. Renderitzat del Tauler (DRY)

En lloc de repetir el codi per a cada casella, s'utilitza una funció de suport **`renderSquare(i)`** que genera la casella amb les *props* correctes (valor i *handler* de clic), fent el codi JSX del tauler més net.

```javascript
// A Board.jsx
const renderSquare = (i) => {
    return (
        <Square
            value={squares[i]}
            onClick={() => handleClick(i)}
        />
    );
};
```

### 5. Estat del Joc i Reinici

- **Estat**: El missatge superior (`status`) es calcula dinàmicament utilitzant el resultat de `calculateWinner` i la detecció d'empat (`isDraw`).

- **Reinici**: El botó "**Reiniciar Joc**" apareix només quan hi ha un guanyador o un empat (Renderitzat Condicional amb `&&`), i crida a `resetGame`, que simplement reinicia els dos estats a les seves condicions inicials.