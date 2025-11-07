# ⏳ Exercici 11: Contador Automàtic (`useEffect` i Neteja)

Aquest projecte demostra l'ús del hook **`useEffect`** per executar codi que interactua amb el món exterior (efectes secundaris o *side effects*), com ara l'ús de temporitzadors.

L'objectiu principal és veure com s'inicia un interval de temps al **muntatge** del component i, crucialment, com es **neteja** quan el component es **desmunta** per evitar problemes de rendiment i fuites de memòria.

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

## 🧠 El Cicle de Vida de l'Efecte

El component `AutoCounter` conté la lògica del temporitzador, controlada exclusivament per `useEffect`.

### 1. Muntatge (Inici de l'Efecte)

El cor de la lògica es troba dins del `useEffect`.

```javascript
// A AutoCounter.jsx
useEffect(() => {
    const intervalId = setInterval(() => {
        // ... incrementa el comptador
        setCounter(prevCounter => prevCounter + 1);
    }, 1000); 
    
    // ...
}, []); // Array de dependències buit: S'executa només UNA VEGADA (al Mount)
```

### 2. Funció de Neteja (`Cleanup`)

Qualsevol recurs o subscripció que s'iniciï dins de `useEffect` ha de ser aturat o netejat per la funció de retorn (`return`).

```javascript
// A AutoCounter.jsx
return () => {
    console.log(`Netejant l'interval: ${intervalId}`);
    clearInterval(intervalId); // Atura el temporitzador
};
```

- **Quan s'executa?** La funció de neteja s'executa just abans que el component es desmunta (o abans de re-executar l'efecte, si tingués dependències).

- **Per què és essencial?** Si no netegéssim l'interval amb `clearInterval`, el temporitzador continuaria executant-se a l'ombra (fins i tot quan el component no és visible), intentant actualitzar un estat que ja no existeix, cosa que provoca una fuita de memòria i errors.

### 3. Demostració de Muntatge/Desmuntatge (`App.jsx`)

El component pare (`App.jsx`) utilitza un estat booleà (`isCounterVisible`) i un botó de toggle per forçar el muntatge (aparició) i el desmuntatge (desaparició) del component `AutoCounter`.

```javascript
{isCounterVisible && <AutoCounter />}
```

Quan es prem el botó i `isCounterVisible` esdevé `false`, el component `AutoCounter` desapareix del DOM i React executa automàticament la funció de `cleanup`.