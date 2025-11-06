# 📌 React useRef: Interacció amb el DOM i Valors Mutables

Aquest projecte demostra les dues utilitzacions fonamentals del hook **`useRef`**: obtenir una referència directa a un **element del DOM** (per manipular-lo, per exemple, amb `focus()`) i emmagatzemar un **valor mutable** que ha de persistir entre re-renderitzacions sense provocar-les.

## ⚙️ Configuració i Execució

### Instal·lació

1.  Instal·la les dependències:
    ```bash
    npm install
    ```

### Comandes Disponibles

| Comanda | Descripció |
| :--- | :--- |
| `npm run dev` | Inicia el servidor de desenvolupament local (Obre la **Consola** per veure el comptador intern). |
| `npm run build` | Construeix el projecte per a producció. |

***

## 🧠 Arquitectura: El Doble Ús de `useRef`

El component **`AutoFocusInput.jsx`** il·lustra perfectament per què `useRef` és diferent de `useState`.

### 1. 🎯 Referència a Elements del DOM (`inputRef`)

* **Creació:** Es declara `const inputRef = useRef(null);`.
* **Connexió:** Es connecta a l'element d'entrada amb l'atribut **`ref={inputRef}`**.
* **Accés:** Es crida al mètode **`inputRef.current.focus()`** dins de `useEffect` per donar focus automàtic al muntatge, i dins de `handleFocusClick` per enfocar manualment.
* **Lectura Directa:** La funció `handleReadValue` demostra com llegir el valor actual de l'input amb **`inputRef.current.value`** sense haver de mantenir l'estat sincronitzat amb `useState`.

### 2. ⏳ Valor Mutable i Persistent (`focusCountRef`)

* **Creació:** Es declara `const focusCountRef = useRef(0);`.
* **Mutació:** El valor es canvia directament amb **`focusCountRef.current = ...`** a la funció `handleFocusClick`.
* **Diferència Clau amb `useState`:**
    * Quan `focusCountRef.current` es modifica, **el component NO es re-renderitza**.
    * Si s'utilitza la funció `handleForceRender` (que crida `setRenderCount`), el component es re-renderitza, però el valor de `focusCountRef.current` **es manté persistent** des de l'última modificació, a diferència d'una variable normal que es reiniciaria.

| Característica | `useState` | `useRef` |
| :--- | :--- | :--- |
| **Persistència** | Sí | Sí |
| **Notifica Canvis (Re-render)** | Sí | **No** |
| **Lectura/Escriptura** | Amb `set...` | Directament amb `.current` |
| **Ús Típic** | Dades mostrades a la UI | Referència al DOM, temporitzadors, comptadors interns. |

***

## 📝 Demostració de Cicle de Vida

1.  **Muntatge:** S'executa `useEffect`, el `input` rep el **focus automàtic**.
2.  **Clic a "Enfocar l'Input":** S'executa `handleFocusClick`. El comptador intern de `focusCountRef` s'incrementa, però el text al DOM (el valor de `focusCountRef.current`) **NO s'actualitza** fins que el component es re-renderitza per un altre motiu.
3.  **Clic a "Forçar Render":** `setRenderCount` s'activa. El component es re-renderitza, i ara el DOM mostra el valor actualitzat de `focusCountRef.current`.