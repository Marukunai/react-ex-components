# ❤️ Exercici 8: Comptador de Likes (`useState`)

Aquest projecte il·lustra l'ús del hook **`useState`** per a crear un component interactiu clàssic: un botó "M'agrada" que gestiona un estat *toggle* (activat/desactivat) i actualitza un comptador numèric.

L'objectiu principal és mostrar com la modificació de l'estat amb la funció `set...` provoca una **re-renderització automàtica** del component amb els nous valors.

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

## 🧠 Lògica de l'Estat Amb `useState`

El component `LikeCounter` utilitza **dos estats independents** per controlar tota la seva lògica i aparença.

### 1. Declaració de l'Estat

```javascript
// 1. Estat numèric (el comptador)
const [likes, setLikes] = useState(0);

// 2. Estat booleà (l'estat del botó: activat o desactivat)
const [isLiked, setIsLiked] = useState(false);
```

### 2. Funció de Gestió del Clic (`handleLikeClick`)

La lògica central resideix en aquesta funció, que utilitza l'estat booleà actual (`isLiked`) per decidir com actualitzar els dos estats:

| Estat Actual (`isLiked`) | Acció Sol·licitada | Funció d'Estat Cridada |
| :--- | :--- | :--- |
| `true` (Ja li agrada) | Desactivar "M'agrada" | `setLikes(likes - 1)` i `setIsLiked(false)` |
| `false` (No li agrada) | Activar "M'agrada" | `setLikes(likes + 1)` i `setIsLiked(true)` |

**Nota important**: Cada crida a `setLikes` o `setIsLiked` activa un nou cicle de re-renderització, on el component es torna a executar amb els nous valors de `likes` i `isLiked`.

### 3. Renderitzat Condicional de la UI

La interfície d'usuari es basa completament en el valor de l'estat `isLiked`:

- **Classes CSS**: La classe del botó (`buttonClass`) es determina dinàmicament per canviar l'estil (color, fons):

```javascript
const buttonClass = isLiked ? 'btn-like btn-liked' : 'btn-like btn-not-liked';
```

- **Text del Botó**: El text i l'emoji del botó també canvien de manera condicional:

```javascript
const buttonText = isLiked ? '❤️ M\'agrada (Desactivar)' : '🤍 M\'agrada (Activar)';
```

Aquesta interacció demostra el cicle clàssic de React: **Estat** $\rightarrow$ **Renderització** $\rightarrow$ **Interacció** $\rightarrow$ **Nou Estat**.