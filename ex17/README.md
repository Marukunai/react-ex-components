# 🛍️ Exercici 17: Detalls d'Ítems de Llista (Estat Local Independent)

Aquest projecte crea una llista de productes on cada ítem actua com un panell desplegable (o **Acordió**). Demostra com utilitzar l'**estat local (`useState`)** dins d'un component que es renderitza dins d'un bucle (`map`) per gestionar el comportament individual de cada ítem de la llista.

L'objectiu principal és:
1.  Comprovar que l'estat d'un component fill és **independent** de la resta d'instàncies.
2.  Utilitzar l'estat local (`isDetailsVisible`) per gestionar el *toggle* d'una secció de la UI.

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

## 🧠 Lògica de l'Estat Independent

La clau d'aquest exercici és que la lògica de desplegament no resideix al component pare (`ProductList`), sinó al component fill (`Product`), que és el que es repeteix.

### 1. Estat Local del Producte (`Product.jsx`)

Cada instància del component `Product` té el seu propi estat `isDetailsVisible`, inicialitzat a `false`.

```javascript
// A Product.jsx
const [isDetailsVisible, setIsDetailsVisible] = useState(false);

const handleToggleDetails = () => {
    // Només canvia la visibilitat d'AQUEST producte
    setIsDetailsVisible(!isDetailsVisible);
};
```

Quan es fa clic en un producte, **només el seu estat local canvia**, provocant que només la seva pròpia instància es re-renderitzi amb els detalls visibles, mentre que la resta d'ítems romanen inalterats.

### 2. Renderitzat de la Llista (`ProductList.jsx`)

El component pare s'encarrega únicament de:

1. Importar les dades (`initialProducts`).

2. Recórrer l'array amb `map()`.

3. Passar les dades de cada producte com a prop a cada instància del component `Product`.

```javascript
// A ProductList.jsx
{initialProducts.map(product => (
    <Product 
        key={product.id} 
        product={product} 
    />
))}
```

### 3. Renderitzat Condicional Local

Dins del component `Product`, s'utilitza l'operador lògic `&&` per muntar o desmuntar la secció de detalls en funció de l'estat local:

```javascript
// A Product.jsx
{isDetailsVisible && (
    <div className="product-details-content">
        {/* ... detalls del producte ... */}
    </div>
)}
```

Aquest patró és l'estàndard de la indústria per construir llistes interactives on els ítems necessiten controlar el seu propi estat visual.