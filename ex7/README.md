# 💰 Exercici 7: Pressupost de Viatge (Càlcul de Despeses)

Aquest exercici simula una eina de gestió de pressupostos. Utilitza un array de despeses de viatge per:

1.  **Càlcul d'Ítem:** Determinar l'Import Total de cada despesa individual (Cost Unitari $\times$ Unitats).
2.  **Càlcul d'Agregació:** Calcular el Cost Total Agregat de tot el viatge.

Reforça els conceptes d'ús de **`map`** i **`reduce`** per a la visualització i resum de dades financeres.

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

## 🧠 Lògica de Càlcul i Format

El projecte manté la separació de responsabilitats, amb el component fill centrat en la fila i el component pare en l'agregació.

### 1. Càlcul i Format Individual (`ExpenseItem.jsx`)

El component fill (`ExpenseItem`) s'encarrega del càlcul de l'import per a la seva despesa i el format de moneda.

* **Càlcul de l'Import:**
    $$ \text{Import Total} = \text{Cost Unitari} \times \text{Unitats} $$

```javascript
// A ExpenseItem.jsx
const { costUnitari, unitats } = props.expense; 
const importTotal = costUnitari * unitats;
const importFormatejat = importTotal.toFixed(2);
```

- **Format**: S'utilitza `.toFixed(2)` per garantir dos decimals (format de moneda) i s'afegeix el símbol '€'.

### 2. Càlcul del Total del Viatge (`TripBudget.jsx`)

El component pare (`TripBudget`) realitza la suma de totes les despeses utilitzant la funció `reduce()`.

- **Estratègia de** `reduce`:

    - L'acumulador (`acc`) suma el cost de cada despesa individual (calculat en el moment de la reducció).

```javascript
// A TripBudget.jsx
const totalViatge = tripExpenses.reduce((acc, ex) => {
    // Es calcula l'import en el moment de la reducció
    return acc + (ex.costUnitari * ex.unitats);
}, 0);
```

### 3. Estructura de la Taula

- **Renderització**: L'array `tripExpenses` es transforma en un array de components `<ExpenseItem>` (files `<tr>`) mitjançant `map` i es col·loca al `<tbody>`.

- **Resum**: El resultat agregat (`totalViatge`) es mostra a la secció `<tfoot>` per una clara distinció visual del total.