# ⚡ React Optimization Hooks: Aïllament de Components Fills

Aquest projecte demostra l'ús combinat i estratègic de **`useMemo`**, **`useCallback`**, i **`React.memo`** per aconseguir la màxima optimització del rendiment. L'objectiu és assegurar que un component fill (`OptimizedList`) només es re-renderitzi quan les dades que realment necessita (la llista i la funció d'eliminació) canvien, ignorant les actualitzacions de l'estat no relacionat del component pare.

## ⚙️ Configuració i Execució

### Instal·lació

1.  Instal·la les dependències:
    ```bash
    npm install
    ```

### Comandes Disponibles

| Comanda | Descripció |
| :--- | :--- |
| `npm run dev` | Inicia el servidor de desenvolupament local (Obre la **Consola** per veure els logs de memoïtzació i càlcul). |
| `npm run build` | Construeix el projecte per a producció. |

***

## 🧠 Arquitectura d'Optimització Combinada

L'arquitectura se centra a crear un "escut" al voltant del component fill (`OptimizedList`) mitjançant la memoïtzació dels seus *props* al component pare (`ListManager`).

### 1. 📁 Fitxers i Responsabilitats

| Fitxer | Element Clau | Responsabilitat |
| :--- | :--- | :--- |
| **`components/ListManager.jsx`** | `useMemo`, `useCallback` | **Pare (Lògica):** Conté l'estat de control (`count`) i l'estat de les dades (`items`). Memoïtza les dades i la funció abans de passar-les al fill. |
| **`components/OptimizedList.jsx`** | `React.memo` | **Fill (Presentació):** Aquest component està embolicat amb `React.memo` per aïllar-se de les re-renderitzacions del pare, a menys que les seves *props* (memoïtzades) canviïn. |

### 2. Mecanismes de Memoïtzació Clau

#### A. Protecció de Dades: `useMemo`

```javascript
// ListManager.jsx
const listToDisplay = useMemo(() => {
    // ... càlcul o filtratge costós ...
    return items.filter(...);
}, [items]); // Depèn només de 'items'
```

- **Propòsit**: Assegurar que el *prop* `list` passat al fill **només canvia (la referència)** si l'estat real de les dades (`items`) ha canviat. Si el comptador (`count`) canvia, `listToDisplay` manté la mateixa referència de l'array, i `React.memo` ho ignora.

#### B. Protecció de Funcions: `useCallback`

```javascript
// ListManager.jsx
const handleDelete = useCallback((id) => {
    // Actualitza l'estat amb la forma funcional (prevItems)
    setItems(prevItems => prevItems.filter(item => item.id !== id));
}, []); // Array buit = Referència estable
```

- **Propòsit**: En cada re-renderització del pare (`ListManager`), la funció `handleDelete` genera una **referència de funció idèntica** (gràcies a `useCallback` amb dependències buides). Això és crucial, ja que si fos una funció normal, `React.memo` veuria una referència de funció nova en cada cicle i forçaria el re-renderitzat innecessari del fill.

#### C. L'Escut: `React.memo`

```javascript
// OptimizedList.jsx
export default React.memo(OptimizedList);
```

- **Propòsit**: Actua com la barrera final. Compara les props rebudes (`list` i `handleDelete`). Atès que el pare les memoïtza, `React.memo` determina que **no han canviat de referència** quan el comptador es mou, i per tant, el component fill s'omet, evitant que es torni a executar el càlcul lent que conté.

## 📝 Resultats de l'Optimització

- **Clic al Comptador** (`count`): El component pare es re-renderitza, però el component fill **NO es torna a renderitzar** (gràcies a `React.memo` + `useMemo` / `useCallback`), evitant la re-execució del càlcul lent.

- **Clic a Eliminar**: L'estat `items` canvia, forçant el re-renderitzat del pare. Com que items canvia, `useMemo` retorna una **nova referència** per a `listToDisplay`. React.memo detecta el canvi en el prop list i **SÍ re-renderitza el component fill**, reflectint la llista actualitzada.