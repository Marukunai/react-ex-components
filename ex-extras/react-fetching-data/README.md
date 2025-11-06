# 📡 React Fetching Data: Càrrega Asíncrona amb `useEffect`

Aquest projecte demostra el patró canònic per a la càrrega de dades asíncrones (`fetch` / `async-await`) dins d'un component de React utilitzant el hook **`useEffect`**. L'exercici se centra en la correcta gestió de la **màquina d'estat asíncrona** (carregant, dades, error) i la implementació de la **funció de neteja (*cleanup*)** per evitar problemes de rendiment.

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

## 🧠 Arquitectura: Cicle de Vida de la Petició

El component **`UserListFetcher.jsx`** concentra tota la lògica d'obtenció de dades, seguint un model d'estat de tres vies.

### 1. Màquina d'Estat Asíncrona

El component utilitza tres estats independents per reflectir l'estat actual de la petició HTTP:

| Estat | Hook | Propòsit |
| :--- | :--- | :--- |
| `users` | `useState([])` | Emmagatzema les dades (la llista d'usuaris). |
| `isLoading` | `useState(true)` | Indica si la petició està activa (`true` mentre s'espera la resposta). |
| `error` | `useState(null)` | Conté un missatge si la petició falla (error de xarxa o de resposta HTTP). |

Aquesta separació permet un **Renderitzat Condicional** molt clar i lògic a la part de `return` del component.

### 2. Implementació de la Lògica Asíncrona

Tota la lògica de `fetch` està continguda dins d'una funció asíncrona (`fetchUsers`) cridada des de **`useEffect`**.

* **Dependències:** L'array de dependències del `useEffect` és **buit** (`[]`), garantint que la funció `fetchUsers` s'executa **només un cop**, al muntatge inicial del component.

### 3. Funció de Neteja i Cancel·lació (Pràctica Avançada)

Aquesta és la part més important per a la robustesa de l'aplicació:

* **Problema a Resoldre:** Si l'usuari navega a una altra pàgina i el component es desmunta abans que la petició `fetch` hagi acabat, el codi intentaria cridar `setUsers` (o `setIsLoading`) en un component que ja no existeix, causant una **fuita de memòria (*memory leak*)**.
* **Solució Implementada:**
    1.  Es declara una bandera **`let isCancelled = false;`**.
    2.  La funció de neteja de `useEffect` (`return () => { isCancelled = true; }`) s'executa al desmuntar el component.
    3.  Totes les crides a `set*State` estan protegides amb un condicional: `if (!isCancelled) { setUsers(data); }`.

Aquesta estratègia garanteix que el codi segueix sent segur fins i tot sota condicions de navegació ràpida.

***

## 🚀 Flux del Component (`UserListFetcher.jsx`)

1.  **Muntatge:** S'inicialitza `isLoading` a `true`. S'inicia `fetchUsers` mitjançant `useEffect`.
2.  **Renderitzat Inicial:** El component mostra el missatge de **Càrrega** (`isLoading` és `true`).
3.  **Dades Receptades:** Si la petició té èxit, `setUsers(data)` i `setIsLoading(false)` s'executen. El component es torna a renderitzar per mostrar la **Llista d'Usuaris**.
4.  **Error:** Si hi ha un error HTTP o de xarxa, `setError(err)` i `setIsLoading(false)` s'executen. El component mostra el missatge d'**Error**.