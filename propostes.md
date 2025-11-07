# 🧠 Exercicis de Repàs de React (Nous Reptes)

Aquí teniu una sèrie de propostes d'exercicis, agrupades per conceptes clau, que us desafiaran a aplicar useState, useEffect, Props i Renderitzat Condicional de manera creativa.

Aquests exercicis estan dissenyats per ser construïts des de zero, basant-se en els conceptes clau de React.

## I. Mòdul: Components i Props

### 1. 💳 Component de Targeta de Crèdit (Props)

Creeu un component anomenat `CreditCard` que rebi les següents props: `ownerName`, `cardNumber`, `expiryDate` i `type` (Visa / MasterCard).

**Objectiu 1:** Formateja el `cardNumber` per mostrar-lo en blocs de quatre dígits separats per espais.

**Objectiu 2:** Fes que el fons de la targeta canviï de color (p. ex., blau per Visa, vermell per MasterCard) mitjançant el renderitzat condicional de classes basat en la prop `type`.

### 2. 📝 Etiqueta de Preu amb Descompte (Props i Lògica)

Creeu un component anomenat `PriceTag` que rebi les props: `preuOriginal` i `descomptePercentatge` (un número entre 0 i 100).

**Objectiu 1:** Calcula el `preuFinal` aplicant el descompte.

**Objectiu 2 (Renderitzat Condicional):** Si el descompte és superior a 0, mostra el `preuOriginal` ratllat i el `preuFinal` en color vermell. Si el descompte és 0, només mostra el `preuOriginal`.

## II. Mòdul: Estat (useState) i Interacció

### 3. 🌡️ Selector de Temperatura (Múltiples States)

Creeu un component anomenat `TemperatureConverter`. L'usuari ha de poder introduir un valor en Celsius.

**Objectiu 1:** Mantén el valor de l'input Celsius en un estat (`celsius`).

**Objectiu 2:** Calcula i mostra el valor en Fahrenheit (`fahrenheit = celsius * 9/5 + 32`).

**Objectiu 3 (Renderitzat Condicional):** Si la temperatura Celsius és superior a 30, mostra un emoji de sol (☀️); si és inferior a 0, mostra un floc de neu (❄️).

### 4. 🔑 Verificador de Contrasenya (Validació en Temps Real)

Creeu un formulari amb un sol input per a una contrasenya.

**Objectiu 1:** Utilitza `useState` per emmagatzemar la contrasenya escrita.

**Objectiu 2:** Mentre l'usuari escriu, mostra sota l'input tres indicadors (amb colors verd/vermell) que validin:
- Té almenys 8 caràcters.
- Conté almenys un número.
- Conté almenys una majúscula.

### 5. ⏱️ Cronòmetre Bàsic (useState i Event Handling)

Creeu un component amb un text que mostra el temps (p. ex., 00:00:00) i tres botons: Iniciar, Pausa i Reiniciar.

**Objectiu:** Utilitza l'estat per controlar si el cronòmetre està actiu (`isRunning: boolean`) i el temps transcorregut (`time: number`). Quan es prem "Iniciar", hauria de començar a incrementar els segons (podeu utilitzar `setInterval` aquí i netejar-lo correctament).

## III. Mòdul: Llistes i Immutabilitat

### 6. 🛒 Gestor de Carrito de Compra (Array State)

Creeu un component `ShoppingCart` que mostri una llista d'ítems (nom, quantitat) i un botó "Afegir nou ítem".

**Objectiu 1:** Mantén la llista d'ítems en un array d'estat (p. ex., `[{ id: 1, nom: 'Pomes', quantitat: 1 }]`).

**Objectiu 2:** Implementa la funció `handleIncrementQuantity(id)` que, quan es fa clic a un ítem, incrementa només la seva quantitat sense mutar l'array original (utilitza `map`).

**Objectiu 3:** Implementa la funció `handleRemoveItem(id)` que utilitzi el mètode `filter` per eliminar l'ítem de la llista.

### 7. 👤 Contactes amb Cerca (Filtre de Llista)

Creeu un component que mostri una llista de contactes (Nom, Email). Afegiu un input de cerca a la part superior.

**Objectiu 1:** Mantén la llista completa de contactes en una variable de dades fora de l'estat.

**Objectiu 2:** Mantén el text de cerca de l'usuari en un estat (`searchTerm`).

**Objectiu 3:** Filtra l'array de contactes basant-te en el `searchTerm` abans de cridar a `map`. La llista només ha de mostrar els contactes que coincideixin amb el text de cerca.

## IV. Mòdul: Efectes Secundaris (useEffect)

### 8. 📜 Contador de Scroll (Event Listener i Cleanup)

Creeu un component que mostri un número gran a la pantalla: "Scroll Y: X".

**Objectiu 1:** Utilitza `useEffect` per afegir un Event Listener a l'esdeveniment `scroll` de l'objecte `window` al muntatge.

**Objectiu 2:** El handler ha de llegir la posició vertical actual (`window.scrollY`) i actualitzar un estat.

**Objectiu 3 (Crític):** Implementa la funció de cleanup dins de `useEffect` per eliminar l'Event Listener quan el component es desmunta.

### 9. 🖼️ Fetch de Dades Bàsic (API)

Creeu un component anomenat `PostFetcher`.

**Objectiu 1:** Utilitza `useEffect` sense dependències per fer una crida `fetch` a una API de prova (p. ex., `https://jsonplaceholder.typicode.com/posts/1`).

**Objectiu 2:** Un cop rebudes les dades, actualitza un estat (`postData`) amb el resultat.

**Objectiu 3 (Feedback d'Estat):** Mentre s'espera la resposta de l'API (abans d'actualitzar `postData`), mostra el text: "Carregant...".

## V. Mòdul: Lògica Avançada

### 10. 🧮 Calculadora de Tips (Chaining de Components)

Creeu una petita aplicació amb tres components:

- **InputForm:** Conté un input per al `BillAmount` (total del compte) i un input per al `TipPercentage` (p. ex., 15%). Les dades es mantenen en l'estat del pare.

- **ResultsDisplay:** Rep `BillAmount` i `TipPercentage` com a props. Calcula i mostra:
  - Import del Tip.
  - Total a Pagar (Bill + Tip).

- **TipCalculator (Pare):** Manté l'estat del `BillAmount` i `TipPercentage`. Passa els setters a `InputForm` i els valors a `ResultsDisplay`.

---

Aquests exercicis et permetran consolidar la gestió d'estat, el maneig d'esdeveniments, la interacció amb el navegador i la correcta separació de responsabilitats entre components de React.

Proveu a fer els exercicis plantejats en el vostre repositori personal!
