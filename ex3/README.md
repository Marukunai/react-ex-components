# 🗺️ Exercici 3: Mapeig de Llistes i Components Reutilitzables

Aquest projecte demostra com gestionar i renderitzar una **llista de components dinàmica** a partir d'un array de dades. És un patró essencial en React per generar taules, llistes, targetes de productes o, en aquest cas, testimonis.

## ⚙️ Configuració i Execució

### Instal·lació

1.  Instal·la les dependències:
    ```bash
    npm install
    ```

### Requisits d'Imatges (Important)

Perquè el projecte mostri les imatges correctament, has de crear la següent estructura de carpetes i afegir les imatges amb els noms especificats:

1.  Crea la carpeta: `public/assets/testimonis/`
2.  Afegeix les imatges:
    * `laia-palau.jpg`
    * `alexia-putellas.jpg`
    * `yuji-nishida.jpg`
    * `rafael-nadal.jpg`

| Comanda | Descripció |
| :--- | :--- |
| `npm run dev` | Inicia el servidor de desenvolupament local. |
| `npm run build` | Construeix el projecte per a producció. |

***

## 🧠 Conceptes Clau

Aquest exercici se centra en tres tècniques fonamentals per treballar amb llistes i dades:

### 1. Mapatge d'Arrays (`.map()`)

El component pare (`App.jsx`) utilitza la funció `.map()` de JavaScript sobre l'array `testimonisData` per transformar cada objecte de dades en un component React:

```jsx
// A App.jsx
const testimonisList = testimonisData.map((t) => (
    <Testimoni 
        key={t.nom} // Clau única obligatòria
        {...t}      // Spread Operator!
    />
));
```

El resultat és un **array de components React** (`testimonisList`) que es renderitza directament dins del JSX de `App`.

### 2. Spread Operator en Props (`{...t}`)

En lloc de passar cada *prop* individualment (e.g., `<Testimoni nom={t.nom} esport={t.esport} ... />`), s'utilitza l'`spread operator` (`{...t}`) per desempaquetar totes les propietats de l'objecte `t` i passar-les directament com a *props* al component `Testimoni`.

Això simplifica la crida del component i el fa més flexible.

### 3. Gestió de la key (Clau Única)

Quan es renderitza una llista d'elements, React requereix una *prop* `key` única per a cada element.

- **Propòsit**: React utilitza la clau per identificar quins elements de la llista han canviat, s'han afegit o s'han eliminat de manera eficient.

- **Implementació**: En aquest cas, s'utilitza el nom (`key={t.nom}`) com a clau única. En aplicacions reals, es recomana utilitzar un ID real (e.g., `t.id`).

### 4. Construcció Dinàmica de Rutes

El component fill (`Testimoni.jsx`) construeix la ruta final de la imatge combinant una constant (`IMAGE_DIR`) amb la *prop* rebuda (`imatge`):

```javascript
// A Testimoni.jsx
const imagePath = `${IMAGE_DIR}${imatge}.jpg`;
// e.g., /assets/testimonis/laia-palau.jpg
``` 

Això demostra com es pot utilitzar la lògica del component per manipular les *props* abans de renderitzar-les al DOM.