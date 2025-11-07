# 📡 Exercici 18: Indicador de Connexió (`useEffect` i Subscripcions)

Aquest projecte implementa un indicador de l'estat de la connexió a Internet en temps real. Il·lustra com utilitzar el hook **`useEffect`** per afegir i eliminar **EventListeners** a l'objecte global `window`, un patró estàndard per sincronitzar components de React amb APIs externes al navegador.

L'objectiu principal és:
1.  Utilitzar `navigator.onLine` per obtenir l'estat inicial.
2.  Subscriure's als esdeveniments `online` i `offline` de l'objecte `window`.
3.  Implementar la funció de **neteja (`cleanup`)** per treure els `EventListeners` en el desmuntatge.

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

## 🧠 Subscripció a Esdeveniments del Navegador

El component `ConnectionStatus` basa el seu funcionament en la interacció amb l'API del navegador.

### 1. Estat Inicial

L'estat s'inicialitza directament utilitzant l'API **`navigator.onLine`**, assegurant que la UI reflecteixi l'estat actual tan bon punt es carrega el component:

```javascript
const [isOnline, setIsOnline] = useState(navigator.onLine);
```

### 2. El Cicle de l'Efecte

El hook `useEffect` s'utilitza amb un array de dependències buit (`[]`), cosa que garanteix que la subscripció (l'efecte) i la desubscripció (la neteja) només es produeixin una vegada, durant el cicle de vida del component.

- **Subscripció** (`Mount`): Afegim els `EventListeners` a l'objecte global `window`:

```javascript
window.addEventListener('online', handleStatusChange);
window.addEventListener('offline', handleStatusChange);
```

- **Neteja** (`Unmount`): La funció de retorn (`cleanup`) assegura que els *listeners* s'eliminen quan el component desapareix, evitant que el codi s'intenti executar en components que ja no existeixen (fuita de memòria).

```javascript
return () => {
    window.removeEventListener('online', handleStatusChange);
    window.removeEventListener('offline', handleStatusChange);
};
```

### 3. Funció Callback

La funció `handleStatusChange` és el *callback* que s'executa quan el navegador detecta un canvi en la connexió. L'única cosa que fa és actualitzar l'estat `isOnline` de React amb el nou valor de `navigator.onLine`, forçant una re-renderització:

```javascript
const handleStatusChange = () => {
    setIsOnline(navigator.onLine); 
};
```

Quan l'estat canvia, la UI es re-renderitza per mostrar el nou text i color d'indicador.