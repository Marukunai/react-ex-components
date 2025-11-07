# 🔑 Exercici 15: Panell d'Inici de Sessió (Renderitzat Ternari)

Aquest projecte demostra una aplicació complexa i habitual del Renderitzat Condicional: canviar completament la interfície d'usuari (UI) en funció d'un estat booleà, utilitzant l'operador ternari (`? :`).

L'objectiu principal és:
1.  Controlar els inputs del formulari.
2.  Utilitzar l'estat booleà `isLoggedIn` per alternar entre dues vistes completes: **Formulari de Login** i **Panell de Benvinguda**.

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

## 🧠 Lògica de Login i Renderitzat

El component `LoginPanel` utilitza dos estats per gestionar la seva lògica interna.

### 1. Estats Clau

* **`isLoggedIn` (Booleà):** Controla l'estat de la sessió i el canvi de UI.
* **`credentials` (Objecte):** Emmagatzema les dades del formulari (`username`, `password`) de manera centralitzada (Formulari Controlat).

### 2. Lògica del `handleLoginToggle`

Aquesta funció és polivalent, ja que s'utilitza tant per **iniciar sessió** (a través de `form onSubmit`) com per **tancar sessió** (a través de `button onClick`).

* **Login (Quan `isLoggedIn` és `false`):**
    * Comprova si els camps estan plens (simulació de validació).
    * Si estan plens, crida **`setIsLoggedIn(true)`**.
* **Logout (Quan `isLoggedIn` és `true`):**
    * Crida **`setIsLoggedIn(false)`**.
    * Neteja les dades del formulari amb `setCredentials`.

### 3. Renderitzat A/B amb l'Operador Ternari

El nucli d'aquest exercici és la utilització del ternari per escollir entre el bloc de **Benvinguda** o el bloc de **Formulari**:

```jsx
{isLoggedIn ? (
    // 🅰️ VISTA DE BENINGUDA (Si isLogggedIn és true)
    <div className="welcome-area">...</div>
) : (
    // 🅱️ VISTA DE FORMULARI (Si isLogggedIn és false)
    <form onSubmit={handleLoginToggle} className="login-form">...</form>
)}
```

Això garanteix que només una de les dues seccions principals és visible al DOM en qualsevol moment, creant una experiència d'usuari coherent amb l'estat de la sessió.

### 4. Inputs Controlats

Els camps d'usuari i contrasenya estan controlats per la funció `handleInputChange`, que actualitza l'objecte `credentials` mantenint el component com a única font de veritat de les dades.