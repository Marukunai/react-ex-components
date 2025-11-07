# 🌐 Exercici 12: Càrrega de Dades de l'API (`useEffect` per Data Fetching)

Aquest projecte demostra el patró essencial per fer peticions de dades asíncrones a React utilitzant el hook **`useEffect`** i les funcions **`async/await`** amb `fetch`.

L'objectiu principal és veure com es gestiona el cicle de vida d'una petició API i com es controlen els tres estats possibles de la UI: **Carregant**, **Error** i **Dades (Èxit)**.

## ⚙️ Configuració i Execució

### API Utilitzada

* **URL:** `https://jsonplaceholder.typicode.com/users`
* **Propòsit:** És una API de prova gratuïta que retorna una llista d'objectes d'usuari (JSON).

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

## 🧠 El Patró de Càrrega de Dades

El component `APIDataFetcher` fa servir tres estats per cobrir tots els escenaris possibles de la petició.

### 1. Estats i Inicialització

El component declara tres estats, que controlen el flux de renderització:

```javascript
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(true); // Inicialment true
const [error, setError] = useState(null);
```

### 2. La Petició Asíncrona (`useEffect`)

La funció de càrrega de dades s'executa només una vegada quan el component es munta (gràcies a l'array de dependències buit `[]`):

```javascript
useEffect(() => {
    const fetchData = async () => {
        setLoading(true); // Iniciem la càrrega

        try {
            // ... lògica de fetch i processament
            const response = await fetch(API_URL);

            if (!response.ok) {
                // Llança un error si l'estat HTTP és 4xx o 5xx
                throw new Error(`Error HTTP: ${response.status}`); 
            }
            
            setUsers(data); // Èxit
        } catch (err) {
            setError(...); // Fallada
        } finally {
            setLoading(false); // S'acaba la càrrega (tant en èxit com en fallada)
        }
    };
    fetchData();
}, []);
```

L'ús del bloc `try...catch...finally` és essencial per gestionar amb gràcia els possibles errors de xarxa o de servidor.

### 3. Renderitzat Condicional (Estat de la UI)

El component utilitza el flux de control (els `if`) per determinar quina interfície mostrar en cada moment. El codi només arribarà al renderitzat final de la llista d'usuaris si `loading` és `false` i `error` és `null`.

```javascript
// 1. Prioritat: Loading (mentre s'espera)
if (loading) {
    return <div className="loading-message">Carregant dades...</div>;
}

// 2. Prioritat: Error (si la petició ha fallat)
if (error) {
    return <div className="error-message">Error: {error}</div>;
}

// 3. Renderitzat final (èxit)
return (
    <ul className="user-list">
        {/* ... map de users ... */}
    </ul>
);
```

Aquest patró garanteix que l'usuari sempre rebi una retroalimentació adequada sobre l'estat de les dades.