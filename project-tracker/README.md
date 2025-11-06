# 🎯 Project Tracker: Aplicació React Avançada

Aquest projecte és una aplicació de gestió de tasques (CRUD) construïda amb React i Vite. La implementació se centra en patrons de **gestió d'estat avançada**, gestió de dades asíncrones i qualitat del codi (testing).

## ⚙️ Configuració i Execució

Aquest projecte utilitza **Vite** com a *bundler* i **npm** com a gestor de paquets.

### Prerequisits

* Node.js (LTS recomanat)
* npm

### Instal·lació

1.  Clona el repositori.
2.  Instal·la les dependències:
    ```bash
    npm install
    ```

### Comandes Disponibles

| Comanda | Descripció |
| :--- | :--- |
| `npm run dev` | Inicia el servidor de desenvolupament local amb Hot Module Replacement (HMR). |
| `npm run build` | Construeix el projecte per a producció a la carpeta `dist`. |
| `npm run test` | **Executa els tests unitaris i d'integració amb Vitest.** |

***

## 📁 Estructura i Responsabilitats

El projecte segueix una estructura basada en la responsabilitat dels fitxers:

| Directori | Fitxer Clau | Responsabilitat |
| :--- | :--- | :--- |
| `src/api` | `projectApi.js` | **Capa de Simulació de l'API.** Conté les funcions bàsiques (CRUD) que simulen les peticions HTTP GET, POST, PUT, DELETE, introduint retards artificials. |
| `src/context` | `ProjectContext.jsx` | **Estat Global del Client.** Defineix el Context, el Reducer (`projectReducer`) i proveeix els hooks `useProjectState` i `useProjectDispatch`. |
| `src/hooks` | `useFetchProject.js`, etc. | **Hooks de React Query.** Conté la lògica per interactuar amb la capa d'API, gestionant *caching*, estat de càrrega (`isLoading`) i errors del servidor. |
| `src/pages` | `ProjectList.jsx`, etc. | **Components de Pàgina.** Contenen la lògica de composició de la UI i la interacció amb els hooks de dades/estat. |
| `src/components` | `ProjectCard.jsx`, etc. | **Components de Presentació.** Components *dumb* (sense lògica d'estat ni efectes) que reben dades per `props`. |

***

## 🧠 Arquitectura de Gestió de l'Estat

El projecte utilitza una separació clara de responsabilitats d'estat: **React Query** per a dades de servidor i **Context/Reducer** per a l'estat global del client.

### 1. Context API (`ProjectContext.jsx`)

Defineix l'estructura del `state` global i el `projectReducer`:

| Hook | Retorna | Funció |
| :--- | :--- | :--- |
| **`useProjectState()`** | `state` | Accés a l'estat (llista de projectes, errors inicials, etc.). |
| **`useProjectDispatch()`** | `dispatch` | Permet executar accions com `ADD_PROJECT`, `UPDATE_PROJECT`, `DELETE_PROJECT` directament a l'estat client. |

### 2. Capa d'API (`projectApi.js`)

Aquesta capa és crucial per als tests, ja que simula una font de dades externa. Totes les funcions aquí retornen Promeses per reflectir el comportament asíncron de les APIs reals.

### 3. Hooks de Dades (`src/hooks`)

Aquests hooks embolcallen les funcions de l'API amb React Query:

| Hook | Funció | Mètode de React Query |
| :--- | :--- | :--- |
| `useFetchProject` | Obtenir un projecte o tots. | `useQuery` |
| `useCreateProject` | Crear un projecte. | `useMutation` (crida `dispatch` en cas d'èxit) |
| `useUpdateProject` | Actualitzar un projecte. | `useMutation` (crida `dispatch` en cas d'èxit) |
| `useDeleteProject` | Eliminar un projecte. | `useMutation` (crida `dispatch` en cas d'èxit) |

***

## ✨ Millores Avançades

* **React Concurrency (`useTransition`)**: Implementat a **`ProjectList.jsx`** per embolcallar l'acció `dispatch` d'eliminació. Això assegura que el *render* posterior de la llista es gestioni com a una transició no urgent, mantenint la UI responsiva.

***

## 🧪 Qualitat del Codi i Testing

Tots els components essencials estan coberts per tests robustos (10/10 tests passen).

* **Frameworks:** Vitest, React Testing Library (RTL).
* **Estratègia de Mocks:** Ús de mocks de Context, `useNavigate`, i un mock controlat per a **`useTransition`** per provar la concurrència.

***

## 🛠️ Configuració de Vite

* **`@vitejs/plugin-react`**: Utilitza Babel per a Fast Refresh.

**NOTA:** Si es desenvolupa una aplicació de producció, es recomana l'ús de TypeScript amb *type-aware lint rules*.