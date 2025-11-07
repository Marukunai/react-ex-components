# 👁️ Exercici 14: Toggle de Visibilitat (Renderitzat Condicional)

Aquest projecte demostra la forma més senzilla de controlar la visibilitat de parts de la interfície d'usuari a React utilitzant el **Renderitzat Condicional**.

L'objectiu principal és utilitzar un estat booleà per fer un *toggle* (alternar) i després emprar l'operador lògic **`&&`** per decidir si un element es munta o es desmunta del DOM.

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

## 🧠 Lògica del Renderitzat Condicional

El component `ToggleMessage` gestiona un sol estat booleà i utilitza la lògica del *toggle* per controlar la UI.

### 1. Estat Booleà (`useState`)

L'estat inicialitza la visibilitat a `false` (ocult):

```javascript
const [isVisible, setIsVisible] = useState(false);
```

### 2. Funció Toggle

La funció `handleToggle` és la clau de la interactivitat, ja que inverteix l'estat actual:

```javascript
const handleToggle = () => {
    // Si era true, ara és false; si era false, ara és true.
    setIsVisible(!isVisible); 
};
```

### 3. Operador Lògic `&&`

El mètode més comú per al Renderitzat Condicional en línia a React és l'operador lògic `&&`:

```javascript
{isVisible && (
    <div className="message-box">
        {/* Aquest contingut només es renderitza si isVisible és TRUE */}
    </div>
)}
```

- **Si `isVisible` és `true`**: React avalua el codi JSX a la dreta (`<div className="message-box">...</div>`) i el munta al DOM.

- **Si `isVisible` és `false`**: React s'atura a l'avaluació de l'operador `&&` i no renderitza res a la dreta, desmuntant l'element del DOM.

### 4. UI Condicional

El botó canvia el seu text i estil dinàmicament utilitzant l'estat `isVisible` i l'operador ternari:

```javascript
const buttonText = isVisible ? 'Ocultar missatge' : 'Mostrar missatge';
const buttonClass = isVisible ? 'btn-toggle btn-hide' : 'btn-toggle btn-show';
```

Això assegura que el botó sempre informa l'usuari de l'acció que es realitzarà en el següent clic.