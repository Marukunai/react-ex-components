# 🚀 React Fundamentals & Advanced Patterns

Aquest repositori és un curs pràctic i complet dissenyat per portar-te des dels fonaments de React (Hooks i Components) fins a l'aplicació de patrons avançats i d'optimització. Conté més de **30 exercicis i projectes** que cobreixen l'Estat, l'Immutabilitat, la Gestió de Formularis, els Efectes Secundaris, l'Optimització i el Routing.

---

## 🏗️ Estructura del Repositori

El contingut s'organitza en tres seccions principals per a un aprenentatge progressiu:

| Secció | Contingut | Objectiu |
| :--- | :--- | :--- |
| **REACT-EX-COMPONENTS** | Exercicis seqüencials: `ex1` a `ex21`. | Domini dels Hooks essencials (`useState`, `useEffect`, `useReducer`). |
| **project-tracker** | Aplicació de gestió de tasques (Projecte Final Bàsic). | Consolidació de l'Immutabilitat i Gestió d'Arrays complexos. |
| **ex-extras** | Mòduls avançats i optimització. | Ús de `useContext`, Custom Hooks, `useMemo`, `useCallback` i Routing. |
| **propostes.MD** | Exercicis de proposta per a l'usuari. | Enunciats de nous exercicis plantejats per a l'usuari per a practicar l'ús de React. |

---

## 🛠️ Instal·lació i Execució

Per iniciar qualsevol dels exercicis o projectes:

### 1. Clonar el Repositori

```bash
git clone <URL_del_teu_repositori>
cd REACT-EX-COMPONENTS
```

### 2. Instal·lar Dependències

```bash
npm install
```

### 3. Executar l'Aplicació

```bash
npm run dev
```

Això iniciarà el servidor de desenvolupament local (normalment a `http://localhost:5173`).

---

## 📚 Contingut Detallat dels Mòduls

### I. Fonaments Essencials (`ex1` a `ex21`)

Aquesta progressió cobreix la base de la construcció de la interfície d'usuari a React.

| Exercici | Títol | Conceptes Clau |
| :--- | :--- | :--- |
| **ex4, ex16** | Formularis & Validació | Inputs Controlats, gestió de l'estat del formulari, validació bàsica. |
| **ex8, ex17** | Llistes Interactives | Renderitzat de Llistes (`map`), estat local independent per a ítems (Acordió). |
| **ex13, ex18** | Cicle de Vida & Efectes | Dependències de `useEffect`, `cleanup`, subscripció a esdeveniments de `window`. |
| **ex19** | Gestió d'Estat Complexa | **Immutabilitat** d'Arrays i Objectes, **Lifting State Up** (publicació social). |
| **ex20** | Tres en Ratlla 🎮 | Projecte que consolida tot l'Estat per crear **lògica de joc**. |
| **ex21** | Comptador `useReducer` | Separació de la lògica (`reducer`) de la UI, ús d'Accions amb **Payload**. |

### II. Projecte Clau: Project Tracker (Gestió de Tasques)

Aquesta aplicació simula un tauler de tipus Kanban. És la prova de foc per a la gestió de dades complexes:

- **Manipulació d'Arrays Anidats**: Afegir, eliminar i actualitzar tasques dins de categories (immutabilitat avançada).

- **Gestió de Formularis Múltiples**: Inputs complexos per crear noves tasques i projectes.

- **Patró de Dades Centralitzades**: Mantenir l'arbre de dades a un component pare.ç

### III. Patrons Avançats i Optimització (`ex-extras`)

Aquesta carpeta explora mètodes per millorar el rendiment, la reusabilitat de la lògica i la navegació d'aplicacions a gran escala:

| Mòdul | Hook / Concepte | Descripció |
| :--- | :--- | :--- |
| **react-context-theming** | `useContext` | Ús del **Context API** per evitar el **Prop Drilling** (Exemple: canvi de tema). |
| **react-custom-fetch-hook** | Custom Hooks | Extracció de la lògica de **Fetching de dades** en un hook reutilitzable. |
| **react-custom-hook-online** | Custom Hooks | Reutilització de la lògica de l'Estat de Connexió (`useIsOnline`). |
| **react-optimization-hooks** | `useMemo`, `useCallback` | **Optimització del rendiment** per evitar re-càlculs i re-renderitzacions innecessàries. |
| **react-memoization-challenge** | `React.memo` | Aplicació de **memorització** per a components funcionals. |
| **react-routing-spa** | `react-router-dom` | Implementació de la **Navegació** i les **rutes dinàmiques** en una Single Page Application (SPA). |
| **react-todo-reducer** | `useReducer` Avançat | Aplicació de `useReducer` a un To-Do List complet per gestionar **accions complexes**. |
| **react-use-ref-dom-focus** | `useRef` | Ús de `useRef` per accedir directament a **elements del DOM** (Exemple: enfocar un input). |

---

## 🎯 Recomanacions d'Estudi

1. **Seguiu la Seqüència**: Comenceu pels exercicis ex1 a ex21 per establir una base sòlida.

2. **Experimenta**: El codi de cada exercici està fortament comentat amb explicacions. Intenta trencar la solució per entendre per què React funciona d'una determinada manera (Ex: no utilitzar la clau a les llistes).

3. **Afronta els Projectes**: Un cop dominats els fonaments, l'exercici project-tracker i els mòduls ex-extras són essencials per a un nivell professional.