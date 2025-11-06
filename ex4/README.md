# 🛒 Exercici 4: Llista de la Compra (Map & Reduce)

Aquest exercici consolida l'ús de les **funcions d'array avançades de JavaScript** (`map` i `reduce`) dins del context de React. Demostra com utilitzar **`map`** per renderitzar llistes dinàmiques i **`reduce`** per processar tota la llista de dades per obtenir un valor únic (el total final).

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

## 🧠 Conceptes Clau

El projecte es divideix en la gestió de la llista (al component fill `ShoppingItem`) i el càlcul d'agregació (al component pare `ShoppingList`).

### 1. Renderització de Llistes (`map`) i Pas de l'Objecte Sencer

El component **`ShoppingList.jsx`** utilitza `map` per iterar sobre l'array `shoppingItems`.

* **Component Fill:** En lloc de passar cada propietat individualment, l'objecte sencer de la compra es passa com a una única *prop*: **`item={item}`**.
* **Component Fill (`ShoppingItem.jsx`):** Rep la *prop* `item` i utilitza la **desestructuració** per accedir a les dades:
    ```javascript
    const { tipus, nom, preu, quantitat } = props.item; 
    ```

### 2. Càlcul d'Agregació (`reduce`)

La funció **`reduce()`** s'utilitza en **`ShoppingList.jsx`** per calcular el cost total de tots els articles.

| Element | Valor | Propòsit |
| :--- | :--- | :--- |
| **`acumulador` (acc)** | Comença a `0` | Emmagatzema el total acumulat. |
| **`item`** | L'objecte actual de l'array | Conté `preu` i `quantitat`. |
| **Operació** | `acumulador + (item.preu * item.quantitat)` | Suma el total individual de l'ítem a l'acumulador. |
| **Valor Inicial** | `0` | El segon argument de `reduce` defineix el valor inicial de l'acumulador. |

```javascript
// A ShoppingList.jsx
const totalFinal = shoppingItems.reduce((acumulador, item) => {
    return acumulador + (item.preu * item.quantitat);
}, 0);
```

### 3. Càlcul dins del Component Fill

El component `ShoppingItem.jsx` també realitza un càlcul per cada ítem, mostrant el total parcial abans de contribuir al total final:

```javascript
// A ShoppingItem.jsx
const totalItem = (preu * quantitat).toFixed(2);
```

Això demostra que la lògica de càlcul pot residir tant al component pare (per al total agregat) com al component fill (per als subtotals).