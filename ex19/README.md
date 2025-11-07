# ❤️ Exercici 19: Interacció amb una Publicació (Gestió d'Estats Complexos)

Aquest projecte implementa un component de publicació social amb les funcions bàsiques: fer *Like* i afegir *Comentaris*. Aquest exercici consolida l'ús de `useState` per a estats simples (comptador i booleà) i estats complexos (arrays).

## 🎯 Objectius Clau

1.  **Gestió de Múltiples Estats:** Controlar el comptador de **`likes`**, l'estat booleà **`isLiked`** i l'array de **`comentaris`** des d'un sol component pare (`Post.jsx`).
2.  **Toggle de Botó:** Implementar la lògica de **Toggle** per al botó de Like (incrementar/decrement el comptador i canviar el seu aspecte).
3.  **Formulari Controlat:** Utilitzar l'estat `nouComentari` per controlar l'input de text i la funció `addComment` per actualitzar l'array amb immutabilitat.
4.  **Components "Presents":** Els components fills (`PostActions`, `PostComments`, etc.) són components "presents" (o purament de vista) que reben dades i *callbacks* com a *props*.

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

## 🧠 Lògica i Estructura

### 1. Lògica del Botó "Like" (`Post.jsx` & `PostActions.jsx`)

Per implementar el *toggle* correcte del Like, es necessiten dos estats al component `Post`:

| Estat | Propòsit |
| :--- | :--- |
| `likes` | El nombre total de "m'agrades" (valor numèric). |
| `isLiked` | Indica si l'usuari actual ha donat "m'agrada" (valor booleà). |

La funció **`handleLike`** utilitza `isLiked` per decidir si suma o resta al comptador `likes`:

```javascript
// A Post.jsx
const handleLike = () => {
    if (isLiked) {
        setLikes(prevLikes => prevLikes - 1); 
        setIsLiked(false);
    } else {
        setLikes(prevLikes => prevLikes + 1); 
        setIsLiked(true);
    }
};
```

El component `PostActions` utilitza la prop isLiked per canviar dinàmicament el text i l'estil del botó.

### 2. Afegir Comentaris (Array Immutabilitat)

La funció `addComment` demostra la forma correcta d'actualitzar un array d'estat a React: creant un nou array i afegint-hi el nou ítem, respectant la immutabilitat.

```javascript
// A Post.jsx
setComentaris(prevComentaris => [...prevComentaris, newComment]);
```

A més, el formulari (`CommentForm`) es mostra amb **Renderitzat Condicional** basat en l'estat `isCommenting`.

### 3. Components del Formulari

El component `CommentForm` és un exemple clàssic de **Lifting State Up**: rep el valor (`nouComentari`) i tots els *handlers* (`onCommentChange`, `onCommentSubmit`, `onCommentCancel`) com a *props* des del component pare (`Post.jsx`).