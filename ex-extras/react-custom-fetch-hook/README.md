# 🛠️ React Custom Fetch Hook (`useFetch`)

Aquest projecte demostra l'ús i la implementació d'un **Custom Hook** anomenat **`useFetch`**. L'objectiu és extreure i reutilitzar tota la lògica d'obtenció de dades, gestió d'estats (carregant, error, èxit) i neteja (*cleanup*) de peticions asíncrones fora dels components de la UI.

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

## 🧠 Arquitectura: Custom Hook `useFetch`

El patró de Custom Hook és la manera preferida en React per compartir lògica d'estat entre components sense recórrer al Context o a llibreries de gestió d'estat.

### 1. 📁 Fitxers i Responsabilitats

| Fitxer | Element Clau | Responsabilitat |
| :--- | :--- | :--- |
| **`hooks/useFetch.js`** | `useFetch(url)` | Conté la lògica completa per realitzar la petició `fetch`, gestionar els tres estats asíncrons (`isLoading`, `error`, `data`) i la funció de neteja. |
| **`components/PostViewer.jsx`** | `PostViewer` | **Consumidor:** Només crida `useFetch` i s'encarrega exclusivament de renderitzar la UI basant-se en els tres estats retornats pel hook. |

### 2. Implementació del Custom Hook (`useFetch.js`)

El `useFetch` implementa una lògica de màquina d'estat per gestionar el cicle de vida d'una petició asíncrona:

| Estat | Hook | Propòsit |
| :--- | :--- | :--- |
| **Dades** | `useState(null)` | Emmagatzema el resultat de la petició amb èxit. |
| **Càrrega** | `useState(true)` | Estat booleà que indica si la petició està en curs. |
| **Error** | `useState(null)` | Emmagatzema missatges d'error (`HTTP Error`, error de xarxa, etc.). |

### 3. Funció de Neteja i Cancel·lació (Pràctica Avançada)

L'ús més destacat d'aquest hook és la prevenció de *memory leaks* (fuites de memòria):

* **Mecanisme:** S'utilitza la variable booleana **`isCancelled`** dins de l'efecte.
* **Funció de Neteja:** La funció retornada per `useEffect` s'executa quan el component es desmunta. Aquesta funció estableix `isCancelled = true`.
* **Protecció:** Això evita que l'estat es pugui actualitzar (`setData`, `setError`, `setIsLoading`) en un component que ja no forma part de l'arbre DOM, prenent la decisió d'establir l'estat només si `!isCancelled`.

### 4. Reutilització

El hook s'executa sempre que la **`url`** passada com a paràmetre canvia (`[url]` com a dependència de `useEffect`). Això fa que el hook sigui completament reutilitzable per a qualsevol altre component que necessiti fer una petició *GET*.

## 🚀 Consum del Hook (`PostViewer.jsx`)

El component `PostViewer` es beneficia enormement d'aquesta arquitectura, aconseguint un codi molt net i declaratiu:

1.  **Obtenció de Dades:** Tota la lògica es redueix a una línia:
    ```jsx
    const { data: post, isLoading, error } = useFetch(POST_API_URL);
    ```
2.  **Renderitzat Condicional:** El component només es preocupa de l'estat que ha de mostrar (Càrrega, Error, Dades), sense tenir la complexitat de l'asincronia interna.