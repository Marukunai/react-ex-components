# 🌐 React Router: Single Page Application (SPA) Routing

Aquest projecte demostra la implementació del sistema de rutes en una **Single Page Application (SPA)** utilitzant la llibreria **React Router**. L'objectiu és permetre la navegació entre diferents "pàgines" sense causar una recàrrega completa del navegador i mostrar com es gestionen les rutes estàtiques i dinàmiques.

## ⚙️ Configuració i Execució

### Instal·lació

1.  Aquest projecte requereix la instal·lació de `react-router-dom`:
    ```bash
    npm install react-router-dom
    ```
2.  Instal·la les dependències generals:
    ```bash
    npm install
    ```

### Comandes Disponibles

| Comanda | Descripció |
| :--- | :--- |
| `npm run dev` | Inicia el servidor de desenvolupament local. |
| `npm run build` | Construeix el projecte per a producció. |

***

## 🧠 Arquitectura de Routing amb React Router

El projecte es basa en quatre components clau de React Router per gestionar la navegació:

### 1. Components d'Estructura (`App.jsx`)

| Component | Propòsit |
| :--- | :--- |
| **`<BrowserRouter>`** | L'embolcall (wrapper) principal. Utilitza la History API del navegador per mantenir la URL sincronitzada amb la UI sense recarregar la pàgina. |
| **`<Routes>`** | El contenidor principal on es defineixen totes les rutes. S'encarrega de fer la lògica de coincidència de rutes. |
| **`<Route>`** | Defineix una ruta individual. Requereix l'atribut `path` (la URL) i `element` (el component a renderitzar). |
| **`<Link>`** | S'utilitza en lloc de l'etiqueta HTML `<a>` per a la navegació interna de la SPA. Prevé la recàrrega completa de la pàgina. |

### 2. Definició de Rutes

El projecte defineix tres tipus de rutes clares dins de `<Routes>`:

| Tipus de Ruta | Path | Component | Propòsit |
| :--- | :--- | :--- | :--- |
| **Estàtica** | `/` | `Home` | Pàgina principal. |
| **Estàtica** | `/about` | `About` | Pàgina d'informació estàtica. |
| **Dinàmica** | `/user/:id` | `UserDetail` | Ruta variable. El segment `:id` es llegeix com a paràmetre. |
| **Contingència** | `*` | Missatge 404 | Captura qualsevol URL que no coincideixi amb les anteriors. |

### 3. Lectura de Paràmetres Dinàmics

El component **`UserDetail.jsx`** demostra com llegir valors directament des de la URL utilitzant el hook **`useParams`**:

```javascript
// A UserDetail.jsx
import { useParams } from 'react-router-dom';

const { id } = useParams(); 
// Si la URL és /user/7, 'id' contindrà "7".
```

Aquesta tècnica és fonamental per construir vistes de detall on la lògica (com la càrrega de dades) depèn d'un identificador present a la URL.