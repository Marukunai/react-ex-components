# 🛡️ Exercici 16: Validació de Formulari Simple (Estat Múltiple)

Aquest projecte il·lustra el maneig d'un estat amb múltiples resultats (èxit, error, inicial) per controlar la retroalimentació visual d'un formulari simple.

L'objectiu principal és:
1.  Utilitzar constants per fer més llegible l'estat de validació.
2.  Implementar la lògica de validació en el *submit*.
3.  Utilitzar una funció de suport (`renderValidationMessage`) amb instruccions **`if/else if`** per al **Renderitzat Condicional Múltiple**.

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

## 🧠 Lògica de Validació i Estats

El component `FormValidation` utilitza dos estats, un per a les dades i un per al resultat de la validació.

### 1. Constants d'Estat

S'utilitzen constants fora del component per donar noms significatius als valors numèrics de l'estat de validació, millorant la claredat del codi:

```javascript
const STATUS_INITIAL = 0;
const STATUS_SUCCESS = 1;
const STATUS_ERROR = 2;
```

### 2. Lògica de `handleSubmit`

La funció `handleSubmit` és on es realitza la validació. S'utilitza el mètode `.trim()` per assegurar que els camps no estiguin buits o només continguin espais en blanc.

```javascript
// A FormValidation.jsx
if (!nom.trim() || !correu.trim()) {
    setValidationStatus(STATUS_ERROR);
} else {
    setValidationStatus(STATUS_SUCCESS);
    // ...enviament de dades real...
}
```

A més, la funció `handleChange` neteja l'estat de validació a `STATUS_INITIAL` cada vegada que l'usuari torna a escriure, ocultant el missatge anterior.

### 3. Renderitzat Múltiple amb `if/else if`

En lloc d'un ternari simple, s'utilitza una funció de suport amb `if` i `else if` per manejar els tres estats diferents de la validació:

```javascript
// A FormValidation.jsx
const renderValidationMessage = () => {
    if (validationStatus === STATUS_SUCCESS) {
        return <p className="message-success">...</p>;
    } else if (validationStatus === STATUS_ERROR) {
        return <p className="message-error">...</p>;
    }
    return null; // Si és STATUS_INITIAL, no retorna res
};
```

Aquesta tècnica és ideal per a escenaris on hi ha més de dos possibles estats de la UI a gestionar. La crida a la funció dins del JSX és senzilla:

```javascript
<div className="validation-message-box">
    {renderValidationMessage()}
</div>
```