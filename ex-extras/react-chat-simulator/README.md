# 💬 React Chat Simulator (Projecte d'Hooks Fonamentals)

Aquest projecte és un simulador de finestres de xat minimalista construït amb React. L'objectiu principal és demostrar l'ús eficaç i combinat dels hooks de React (`useReducer`, `useState`, `useRef`, `useEffect`) per gestionar llistes dinàmiques i interaccions d'usuari complexes com l'autodesplaçament.

## ⚙️ Configuració i Execució

Aquest projecte utilitza **Vite** com a *bundler* i **npm** com a gestor de paquets.

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

## 🧠 Arquitectura de Gestió de l'Estat

El projecte utilitza un patró d'estat aïllat, ideal per gestionar la llista de missatges i garantir l'**immutabilitat**.

### 1. Estat Central: `useReducer`

La llista completa de missatges es gestiona mitjançant `useReducer`, que centralitza la lògica de modificació d'estat.

* **Fitxer Clau:** El `chatReducer` es defineix a **`src/reducer/chatReducer.js`** (o inlínea si és un fitxer petit).
* **Estat (`messages`):** Un array d'objectes de missatge, cadascun amb `id`, `text`, `user` i `timestamp`.
* **Accions Suportades:**
    * `ADD_MESSAGE`: Afegeix un nou missatge a la llista, assegurant-se que es retorna un nou array (immutabilitat).

### 2. Estructura de Fitxers

| Fitxer/Directori | Hooks/Mètodes | Responsabilitat |
| :--- | :--- | :--- |
| `src/components/ChatSimulator.jsx` | `useReducer`, `useState`, `useRef`, `useEffect` | **Lògica del Xat (Container):** Manté l'estat dels missatges, gestiona l'input, i coordina l'autodesplaçament. |
| `src/reducer/chatReducer.js` | `chatReducer` | Defineix les regles de transició d'estat dels missatges (p. ex., com s'afegeix un missatge). |
| `src/App.jsx` | - | Component de *layout* que carrega el `ChatSimulator`. |

***

## ✨ Funcionalitat i Hooks Específics

El projecte fa un ús avançat dels hooks per simular una experiència de xat fluida:

### A. Autodesplaçament Automàtic (`useRef` & `useEffect`)

Aquesta és la funcionalitat clau que garanteix la UX:

* **`useRef` (`messagesEndRef`):** S'utilitza per crear una referència directa a un element **`<div>` buit** al final de la llista de missatges.
* **`useEffect`:** S'activa cada vegada que l'array de `messages` canvia. Dins d'aquest hook, s'executa **`messagesEndRef.current.scrollIntoView({ behavior: "smooth" })`** per desplaçar la vista al missatge més recent.

### B. Control d'Input i Focus

* **`useState` (`input`):** Controla el valor actual de l'àrea de text.
* **`useRef` (`inputRef`):** S'utilitza per donar **focus automàtic** a l'input al carregar l'aplicació i després de cada missatge enviat, millorant l'accessibilitat i el flux de treball de l'usuari.

### C. Missatges i Immutabilitat

* **Missatges:** Es renderitzen utilitzant un `map()` sobre l'estat `messages`. Cada missatge utilitza el seu `id` únic com a `key`, que és una pràctica fonamental de React per garantir l'eficiència dels *renders* i la persistència dels estats dels elements de la llista.

***

## 🛠️ Configuració de Vite

* **`@vitejs/plugin-react`**: Utilitza Babel per a Fast Refresh.

**NOTA:** El projecte està molt ben dissenyat per a l'aprenentatge dels hooks de gestió d'estat i interacció DOM. Per a un xat de producció, aquesta base s'ampliaria amb **WebSockets** (per al temps real) i la **Virtualització de Llistes** (per a un rendiment òptim amb milers de missatges).