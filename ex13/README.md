# 👂 Exercici 13: `useEffect` amb Dependències (Sincronització de Dades)

Aquest projecte il·lustra l'ús de l'**Array de Dependències** dins del hook `useEffect` per sincronitzar un efecte secundari amb canvis específics a les *props* o a l'estat.

L'objectiu principal és veure que l'efecte dins de `UserProfile` només s'executarà si el `nom` o l'`edat` rebuts (les dependències) canvien el seu valor respecte al renderitzat anterior.

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

## 🧠 El Control de la Re-execució

La lògica es divideix en la gestió de l'estat de l'aplicació (`App.jsx`) i la reacció a les dades (`UserProfile.jsx`).

### 1. Gestió d'Estat (`App.jsx`)

El component pare (`App`) utilitza un doble estat per simular un cicle d'edició:

* **`formData`:** Estat temporal per als inputs controlats. S'actualitza amb cada tecleig (`handleChange`).
* **`profileData`:** Estat que realment es passa com a *prop* al component `UserProfile`. Només s'actualitza quan l'usuari prem **"Actualitzar Perfil"** (`handleSubmit`).

Aquesta separació és clau: **Escrivint als inputs NO es dispara l'efecte**, ja que només actualitza `formData`. L'efecte només es dispara quan **`profileData`** (que és l'origen de les *props*) és modificat.

### 2. Array de Dependències Clau (`UserProfile.jsx`)

El component fill utilitza les *props* que li interessen per a l'efecte, el qual fa dues accions (fer un `console.log` i canviar el títol de la pàgina):

```javascript
// A UserProfile.jsx
useEffect(() => {
    // Aquest codi s'executa només si...
    console.log(`[LOG] Dades del perfil actualitzades: ${nom}, ${edat} anys.`);
    document.title = `Perfil: ${nom} (${edat})`;
    
}, [nom, edat]); // ...'nom' o 'edat' han canviat.
```

#### Comportament Observat

1. **Muntatge Inicial**: L'efecte s'executa una vegada amb les dades inicials (`Marc`, `30`).

2. **Tecleig**: El tecleig actualitza `formData` i fa re-renderitzar `App` i `UserProfile`, però **l'efecte NO s'executa**, ja que `profileData` (`nom` i `edat`) no ha canviat.

3. **Clic a "Actualitzar"**: En aquest moment, `setProfileData(formData)` canvia el valor de les *props* `nom` i/o `edat`. React detecta el canvi en l'array de dependències i **re-executa l'efecte**.

Això demostra com `useEffect` permet controlar amb precisió quan s'han d'executar els efectes secundaris complexos.