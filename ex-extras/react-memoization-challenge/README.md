# 🧠 React Memoization Challenge: Rendiment i Optimització

Aquest projecte demostra l'ús combinat dels tres mecanismes de memoïtzació de React (**`useMemo`**, **`useCallback`**, i **`React.memo`**) per optimitzar el rendiment d'una aplicació amb càlculs costosos i components que reben funcions com a *props*.

L'objectiu és aconseguir que el component principal (`App`) es pugui re-renderitzar sense tornar a executar:
1.  El càlcul pesat.
2.  El re-renderitzat d'un component fill que només canvia algunes de les seves dades.

## ⚙️ Configuració i Execució

### Instal·lació

1.  Instal·la les dependències:
    ```bash
    npm install
    ```

### Comandes Disponibles

| Comanda | Descripció |
| :--- | :--- |
| `npm run dev` | Inicia el servidor de desenvolupament local (Obre la **Consola** per veure els logs de memoïtzació). |
| `npm run build` | Construeix el projecte per a producció. |

***

## 🚀 Arquitectura: Els Tres Pilars de la Memoïtzació

Aquest projecte implementa un patró d'optimització complet, separant el component principal (`App.jsx`) i els seus elements.

### 1. ⚛️ `useMemo`: Memoïtzació de Valors (Càlculs)

| Fitxer Clau | Lògica | Objectiu |
| :--- | :--- | :--- |
| **`App.jsx`** | **`calculatedResult = useMemo(() => heavyCalculation(baseNumber), [baseNumber])`** | **Evitar Repetició de Càlculs Costosos.** La funció `heavyCalculation` (que simula un bloqueig de 2 segons) només s'executa si la seva dependència (`baseNumber`) canvia. Si l'estat `simpleCount` canvia (que no és una dependència), el valor anterior es reutilitza sense recàlcul. |

### 2. ⚛️ `useCallback`: Memoïtzació de Funcions

| Fitxer Clau | Lògica | Objectiu |
| :--- | :--- | :--- |
| **`App.jsx`** | **`incrementCountCallback = useCallback(() => setSimpleCount(prev => prev + 1), [])`** | **Mantenir la Identitat de la Funció.** Aquest hook retorna la mateixa instància de la funció `incrementCountCallback` en cada re-renderització del component `App`. Això és vital per al seu ús amb `React.memo`. |

### 3. ⚛️ `React.memo`: Memoïtzació de Components

| Fitxer Clau | Lògica | Objectiu |
| :--- | :--- | :--- |
| **`components/MemoizedButton.jsx`** | **`const MemoizedButton = React.memo(function Button...)`** | **Evitar Re-renderitzacions Innecessàries de Fills.** Aquest component només es torna a renderitzar si les seves *props* (`onClick` o `count`) han canviat superficialment (comparació superficial de *props*). |

***

## 📝 Resultats de l'Optimització

El repte demostra l'efecte combinat d'aquestes tres tècniques:

1.  **Fer clic a `MemoizedButton` (Control Simple):**
    * L'estat `simpleCount` canvia, forçant el re-renderitzat d'`App`.
    * **El Càlcul Pesat NO es torna a executar** (gràcies a `useMemo`).
    * **`MemoizedButton` SÍ es re-renderitza** perquè la *prop* `count` ha canviat (comparació de *props* feta per `React.memo`).
    * **L'instància `onClick` es manté** (gràcies a `useCallback` amb `[]`).

2.  **Canviar `input` i fer clic a `Executar Càlcul Pesat`:**
    * L'estat `baseNumber` canvia.
    * **El Càlcul Pesat SÍ s'executa** (perquè `baseNumber` és una dependència de `useMemo`).
    * **Tots els components es re-renderitzen** (inclòs `MemoizedButton`) perquè l'arbre sencer d'`App` es re-renderitza, però el rendiment no es veu afectat perquè el `MemoizedButton` processa el canvi en el seu *prop* `count`.

Aquesta combinació de tècniques és el pilar de l'optimització de rendiment en React per a aplicacions de gran escala.