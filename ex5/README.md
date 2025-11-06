# 📊 Exercici 5: Butlletí de Notes (Anàlisi de Dades)

Aquest exercici aplica les funcions d'array avançades de JavaScript (`map`, `reduce`, `flatMap`) en un escenari real d'anàlisi de dades: la generació d'un butlletí de notes. Es centra en:

1.  **Càlcul per Element:** Determinar la mitjana i l'estat (Aprovat/Suspès) per a cada assignatura.
2.  **Càlcul Global:** Determinar la mitjana general de tot el curs.
3.  **Renderitzat Condicional:** Aplicar estils CSS basats en el resultat del càlcul.

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

## 🧠 Lògica de Càlcul i Renderització

El projecte es divideix en la lògica de la fila (component `GradeItem`) i la lògica d'agregació general (component `GradeList`).

### 1. Càlcul Individual per Assignatura (`GradeItem.jsx`)

El component fill és responsable de processar el seu propi array de notes:

* **Mitjana amb `reduce`:** La funció `reduce` se centra a sumar l'array `notes` d'una sola assignatura.
    ```javascript
    const sumaNotes = notes.reduce((acc, nota) => acc + nota, 0);
    const mitjana = sumaNotes / notes.length;
    ```
* **Renderitzat Condicional d'Estils:** S'utilitza l'operador ternari (`? :`) per determinar l'estat i aplicar la classe CSS corresponent directament a l'element `<tr>`:
    ```javascript
    const isAprovat = mitjana >= 5;
    const estatClass = isAprovat ? 'status-aprovat' : 'status-suspes';

    return <tr className={estatClass}>...</tr>
    ```

### 2. Càlcul General i Agregació (`GradeList.jsx`)

El component pare (`GradeList`) realitza una anàlisi a nivell de taula:

#### A. Aplanar i Concatenar Dades (`flatMap`)

Per calcular la mitjana general, primer necessitem un array que contingui **totes les notes** de totes les assignatures en una sola llista.

```javascript
const allNotes = studentGrades.flatMap(g => g.notes); 
// [7, 5, 8, 6.5, 4, 6, 7.5, 5.5, 4.5, 6, 3.5, 9, 8, 9.5, 10]
```

`flatMap()` és ideal perquè fa el `map` (per retornar l'array `g.notes` de cada objecte) i el `flat` (per combinar tots els arrays en un de sol) en una sola crida.

#### B. Mitjana General

Un cop tenim totes les notes en un sol array (`allNotes`), es torna a utilitzar `reduce` per sumar-les i dividir pel total per obtenir la **mitjana general**.

### 3. Renderització de la Taula

- Les files de notes es generen utilitzant `map` dins del `<tbody>`.

- La mitjana general es mostra de manera independent utilitzant la secció `<tfoot>` de la taula HTML.